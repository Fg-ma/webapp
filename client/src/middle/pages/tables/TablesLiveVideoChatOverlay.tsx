import React, { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";
import { TableTop } from "@FgTypes/middleTypes";
import { useTableSocketContext } from "@context/TableSocketContext";

const Video = (props: any) => {
  const ref: any = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream: any) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <video className="w-80 aspect-square" playsInline autoPlay ref={ref} />
  );
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

export default function TablesLiveVideoChatOverlay({
  table_id,
  liveTableTops,
}: {
  table_id: string;
  liveTableTops: TableTop[] | undefined;
}) {
  const { tableSocket } = useTableSocketContext();
  const [peers, setPeers] = useState<{ peerUsername: string; peer: any }[]>([]);
  const live = useRef(false);
  const userVideo: any = useRef();
  const peersRef = useRef<{ peerUsername: string; peer: any }[]>([]);
  const token = localStorage.getItem("token");
  const stream = useRef<MediaStream>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((userStream) => {
        stream.current = userStream;
        userVideo.current.srcObject = userStream;
      });
    const videoTrack = stream.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = false;
    }

    tableSocket.emit("initializeLiveChat", token, table_id);

    tableSocket.on("userWentLive", (tables_tabletops_id) => {
      live.current = true;
      userVideo.current.srcObject = stream.current;
    });

    tableSocket.on("peerWentLive", (member, targetUsername) => {
      const peer = createPeer(targetUsername, member, stream.current);
      peersRef.current.push({
        peerUsername: targetUsername,
        peer: peer,
      });
      console.log("peerwentlive", peer);
      setPeers((prev) => [
        ...prev,
        {
          peerUsername: targetUsername,
          peer: peer,
        },
      ]);
    });

    tableSocket.on("userEndedLive", (tables_tabletops_id) => {
      live.current = false;
      userVideo.current.srcObject = null;
    });

    tableSocket.on("peerIsLive", (targetUsername, callerUsername) => {
      const peer = createPeer(targetUsername, callerUsername, stream.current);
      peersRef.current.push({
        peerUsername: targetUsername,
        peer: peer,
      });

      setPeers((prev) => [
        ...prev,
        {
          peerUsername: targetUsername,
          peer: peer,
        },
      ]);
    });

    tableSocket.on("requestLive", (targetUsername, callerUsername) => {
      tableSocket.emit(
        "responseToLiveRequest",
        token,
        table_id,
        live.current,
        targetUsername,
        callerUsername,
      );
    });

    tableSocket.on("userJoined", (signal, callerUsername) => {
      const peer = addPeer(signal, callerUsername, stream.current);
      if (peer) {
        peersRef.current.push({
          peerUsername: callerUsername,
          peer: peer,
        });

        setPeers((peers) => [
          ...peers,
          { peerUsername: callerUsername, peer: peer },
        ]);
      }
    });

    tableSocket.on("userDisconnected", (disconnectedUser) => {
      const updatedPeers = peersRef.current.filter(
        (peer: any) => peer.peerUsername !== disconnectedUser,
      );
      peersRef.current = updatedPeers;

      setPeers((peers) =>
        peers.filter((peer) => peer.peerUsername !== disconnectedUser),
      );
    });

    tableSocket.on("receivingReturnedSignal", (signal, username) => {
      const item = peersRef.current.find(
        (p: any) => p.peerUsername === username,
      );
      if (item) {
        item.peer.signal(signal);
      }
    });

    return () => {
      tableSocket.off("receivingReturnedSignal");
      tableSocket.off("userDisconnected");
      tableSocket.off("userJoined");
      tableSocket.off("allLiveMembers");
      tableSocket.emit("userDisconnect", token, table_id);
      setPeers([]);
      peersRef.current = [];
    };
  }, [table_id]);

  function createPeer(
    userToSignal: string,
    callerUsername: string,
    stream: any,
  ) {
    try {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      });

      peer.on("signal", (signal: any) => {
        tableSocket.emit(
          "sendingSignal",
          token,
          table_id,
          userToSignal,
          callerUsername,
          signal,
        );
      });

      return peer;
    } catch {
      return;
    }
  }

  function addPeer(incomingSignal: any, callerUsername: any, stream: any) {
    try {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
      });

      peer.on("signal", (signal: any) => {
        tableSocket.emit(
          "returningSignal",
          token,
          table_id,
          signal,
          callerUsername,
        );
      });

      peer.signal(incomingSignal);

      return peer;
    } catch {
      return;
    }
  }

  return (
    <div className="overflow-hidden h-full w-full flex">
      <video
        className="w-80 aspect-square"
        muted
        ref={userVideo}
        autoPlay
        playsInline
      />
      {peers.map((peer, index: any) => {
        return <Video key={index} peer={peer.peer} />;
      })}
    </div>
  );
}
