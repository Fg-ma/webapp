import { useTableSocketContext } from "@context/TableSocketContext";
import React, { useEffect, useRef, useState } from "react";

interface RemoteStream {
  stream: MediaStream;
  id: string;
}

interface VideoChatProps {
  table_id: string;
}

let peerConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
    },
  ],
};

export default function VideoChat({ table_id }: VideoChatProps) {
  const { tableSocket } = useTableSocketContext();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<RemoteStream[]>([]);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        localStreamRef.current = stream;

        tableSocket.on("call-offer", handleCallOffer);
        tableSocket.on("call-answer", handleCallAnswer);
        tableSocket.on("ice-candidate", handleIceCandidate);
        tableSocket.on("call-initiated", handleCallInitiated);
        tableSocket.on("initiationAccepted", handleInitiationAccepted);

        tableSocket.emit("userJoined", token, table_id);
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    return () => {
      tableSocket.off("call-offer", handleCallOffer);
      tableSocket.off("call-answer", handleCallAnswer);
      tableSocket.off("ice-candidate", handleIceCandidate);
      tableSocket.off("call-initiated", handleCallInitiated);
      tableSocket.off("initiationAccepted", handleInitiationAccepted);
    };
  }, []);

  const handleInitiationAccepted = async (from: string) => {
    const peerConnection = new RTCPeerConnection(peerConfiguration);
    console.log(peerConnection);
    console.log("ICE connection state:", peerConnection.iceConnectionState);
    console.log("ICE gathering state:", peerConnection.iceGatheringState);
    peerConnection.onicecandidate = (event) => {
      console.log("offer1 ice");
      if (event.candidate) {
        tableSocket.emit("ice-candidate", token, table_id, {
          from,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event) => {
      setRemoteStreams((prevStreams) => [
        ...prevStreams,
        { stream: event.streams[0], id: from },
      ]);
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    tableSocket.emit("offering-call", token, table_id, from, offer);
    peerConnections.current[from] = peerConnection;
  };

  const handleCallInitiated = async (from: string) => {
    tableSocket.emit("acceptInitiation", token, table_id, from);
  };

  const handleCallOffer = async (offerData: any) => {
    const { from, offer } = offerData;
    const peerConnection = new RTCPeerConnection(peerConfiguration);

    peerConnection.onicecandidate = (event) => {
      console.log("offer ice");
      if (event.candidate) {
        tableSocket.emit("ice-candidate", token, table_id, {
          from,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event) => {
      setRemoteStreams((prevStreams) => [
        ...prevStreams,
        { stream: event.streams[0], id: from },
      ]);
    };

    if (isVideoOn && localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStreamRef.current!);
      });
    }

    try {
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      tableSocket.emit("answering-call", token, table_id, from, answer);

      peerConnections.current[from] = peerConnection;
    } catch (error) {
      console.error("Error handling call offer:", error);
    }
  };

  const handleCallAnswer = async (answerData: any) => {
    const { from, answer } = answerData;
    const peerConnection = peerConnections.current[from];
    if (!peerConnection) return;

    try {
      await peerConnection.setRemoteDescription(answer);
    } catch (error) {
      console.error("Error handling call answer:", error);
    }

    peerConnections.current[from] = peerConnection;
  };

  const handleIceCandidate = async (candidateData: any) => {
    console.log("ice");
    const { from, candidate } = candidateData;
    const peerConnection = peerConnections.current[from];
    if (peerConnection) {
      await peerConnection.addIceCandidate(candidate);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOn(!isVideoOn);
    }
  };

  return (
    <div>
      <h1>WebRTC Video Chat</h1>
      <div>
        {localStream && (
          <video
            autoPlay
            muted
            ref={(ref) => {
              if (ref) {
                ref.srcObject = localStream;
              }
            }}
            style={{ width: "200px", marginRight: "20px" }}
          />
        )}
        {remoteStreams.map((remoteStream) => (
          <video
            key={remoteStream.id}
            autoPlay
            ref={(ref) => {
              if (ref) {
                ref.srcObject = remoteStream.stream;
              }
            }}
            style={{ width: "200px", marginRight: "20px" }}
          />
        ))}
      </div>
      <button onClick={toggleVideo}>
        {isVideoOn ? "Turn Off Video" : "Turn On Video"}
      </button>
    </div>
  );
}
