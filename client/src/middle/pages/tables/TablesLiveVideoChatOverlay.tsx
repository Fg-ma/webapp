import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import Peer from "simple-peer";

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
  tableSocket,
}: {
  table_id: string;
  tableSocket: Socket;
}) {
  const [peers, setPeers] = useState<{ peerUsername: string; peer: any }[]>([]);
  const userVideo: any = useRef();
  const peersRef: any = useRef([]);
  const token = localStorage.getItem("token");
  console.log("peer", peers);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        tableSocket.emit("joinRoom", token, table_id);
        tableSocket.on("allLiveMembers", (members: string[], user: string) => {
          const initialPeers: any = [];
          members.forEach((member: any) => {
            const peer = createPeer(member, user, stream);
            if (peer) {
              peersRef.current.push({
                peerID: member,
                peer,
              });
              initialPeers.push({ peerUsername: member, peer: peer });
            }
          });

          console.log("setpeers initial", initialPeers);
          setPeers(initialPeers);
        });

        tableSocket.on("userJoined", (signal, callerID) => {
          const peer = addPeer(signal, callerID, stream);
          if (peer) {
            const duplicatePeer = peers.find((peer) => {
              console.log(peer.peerUsername, callerID);
              return peer.peerUsername === callerID;
            });

            console.log(duplicatePeer);
            if (!duplicatePeer) {
              peersRef.current.push({
                peerID: callerID,
                peer: peer,
              });

              console.log("setpeers userjoined", callerID);
              setPeers((peers) => [
                ...peers,
                { peerUsername: callerID, peer: peer },
              ]);
            }
          }
        });

        tableSocket.on("userDisconnected", (disconnectedUser) => {
          const updatedPeers = peersRef.current.filter(
            (peer: any) => peer.peerID !== disconnectedUser,
          );
          peersRef.current = updatedPeers;

          console.log(
            "setpeers disconnect",
            peers.filter((peer) => peer.peerUsername !== disconnectedUser),
          );
          setPeers((peers) =>
            peers.filter((peer) => peer.peerUsername !== disconnectedUser),
          );
        });

        tableSocket.on("receivingReturnedSignal", (signal, username) => {
          const item = peersRef.current.find((p: any) => p.peerID === username);
          if (item) {
            item.peer.signal(signal);
          }
        });
      });

    return () => {
      tableSocket.off("receivingReturnedSignal");
      tableSocket.off("userDisconnected");
      tableSocket.off("userJoined");
      tableSocket.off("allLiveMembers");
      tableSocket.emit("userDisconnect", token, table_id);
    };
  }, [table_id]);

  function createPeer(userToSignal: string, callerID: string, stream: any) {
    try {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal: any) => {
        tableSocket.emit(
          "sendingSignal",
          table_id,
          userToSignal,
          callerID,
          signal,
        );
      });

      return peer;
    } catch {
      return;
    }
  }

  function addPeer(incomingSignal: any, callerID: any, stream: any) {
    try {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal: any) => {
        tableSocket.emit("returningSignal", token, table_id, signal, callerID);
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
