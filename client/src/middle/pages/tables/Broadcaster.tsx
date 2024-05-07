import React, { useState, useEffect } from "react";
import { useTableSocketContext } from "@context/TableSocketContext";

interface BroadcasterProps {
  table_id: string;
}

export default function Broadcaster({ table_id }: BroadcasterProps) {
  const { tableSocket } = useTableSocketContext();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const peerConnections: { [key: string]: RTCPeerConnection } = {};
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Create a new RTCPeerConnection for each peer
    const createPeerConnection = (peerId: string) => {
      const pc = new RTCPeerConnection();
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          tableSocket.emit("candidate", event.candidate, peerId);
        }
      };
      stream &&
        stream.getTracks().forEach((track) => pc.addTrack(track, stream!));
      peerConnections[peerId] = pc;
    };

    // Handle incoming offer from a peer
    const handleOffer = async (
      offer: RTCSessionDescriptionInit,
      senderId: string,
    ) => {
      if (!peerConnections[senderId]) {
        createPeerConnection(senderId);
      }
      const pc = peerConnections[senderId];
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      tableSocket.emit("answering", answer, senderId);
    };

    // Handle incoming answer from a peer
    const handleAnswer = (
      answer: RTCSessionDescriptionInit,
      userAnswering: string,
    ) => {
      const pc = peerConnections[userAnswering];
      if (pc) {
        pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    };

    // Handle incoming ICE candidate from a peer
    const handleCandidate = (
      candidate: RTCIceCandidateInit,
      senderId: string,
    ) => {
      const pc = peerConnections[senderId];
      if (pc) {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    };

    const handleReceiverResponded = (receiver: string) => {
      console.log(receiver);
      const pc = new RTCPeerConnection();
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          tableSocket.emit("candidate", event.candidate, receiver);
        }
      };
      pc.createOffer()
        .then((offer) => {
          pc.setLocalDescription(offer)
            .then(() => {
              tableSocket.emit("offering", token, table_id, offer, receiver);
            })
            .catch((error) =>
              console.error("Error setting local description:", error),
            );
        })
        .catch((error) => console.error("Error creating offer:", error));
      peerConnections[receiver] = pc;
    };

    // Event listeners for signaling messages
    tableSocket.on("offer", handleOffer);
    tableSocket.on("answer", handleAnswer);
    tableSocket.on("candidate", handleCandidate);
    tableSocket.on("receivers", (user: string) => {
      console.log(user);
    });

    // Cleanup
    return () => {
      Object.values(peerConnections).forEach((pc) => pc.close());
      tableSocket.off("offer", handleOffer);
      tableSocket.off("answer", handleAnswer);
      tableSocket.off("candidate", handleCandidate);
    };
  }, [stream, tableSocket, table_id]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        tableSocket.emit("broadcasting", token, table_id);
      })
      .catch((error) => console.error("Error accessing media devices:", error));

    return () => {
      stream && stream.getTracks().forEach((track) => track.stop());
    };
  }, [table_id, tableSocket]);

  return (
    <div>
      <h2>Broadcaster</h2>
      {stream && (
        <video
          ref={(video) => {
            if (video) video.srcObject = stream;
          }}
          autoPlay
          muted
        />
      )}
    </div>
  );
}
