import React, { useState, useEffect } from "react";
import { useTableSocketContext } from "@context/TableSocketContext";

interface ReceiverProps {
  table_id: string;
}

export default function Receiver({ table_id }: ReceiverProps) {
  const { tableSocket } = useTableSocketContext();
  const [streams, setStreams] = useState<MediaStream[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const pcMap: { [key: string]: RTCPeerConnection } = {};

    const handleOffer = async (
      offer: RTCSessionDescriptionInit,
      userOffering: string,
    ) => {
      let pc = pcMap[userOffering];
      if (!pc) {
        pc = new RTCPeerConnection();
        pcMap[userOffering] = pc;
        pc.ontrack = (event) => {
          setStreams((prevStreams) => [...prevStreams, event.streams[0]]);
        };
      }
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      tableSocket.emit("answering", token, table_id, answer, userOffering);
    };

    const handleAnswer = (
      answer: RTCSessionDescriptionInit,
      senderId: string,
    ) => {
      const pc = pcMap[senderId];
      if (pc) {
        pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    };

    const handleCandidate = (
      candidate: RTCIceCandidateInit,
      senderId: string,
    ) => {
      const pc = pcMap[senderId];
      if (pc) {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    };

    const handleBroadcast = (broadcaster: string) => {
      tableSocket.emit("receivedBroadcast", token, table_id, broadcaster);
    };

    tableSocket.on("offer", handleOffer);
    tableSocket.on("answer", handleAnswer);
    tableSocket.on("candidate", handleCandidate);
    tableSocket.on("broadcast", handleBroadcast);

    return () => {
      Object.values(pcMap).forEach((pc) => pc.close());
      tableSocket.off("offer", handleOffer);
      tableSocket.off("answer", handleAnswer);
      tableSocket.off("candidate", handleCandidate);
      tableSocket.off("broadcast", handleBroadcast);
    };
  }, [table_id]);

  return (
    <div>
      <h2>Receiver</h2>
      {streams.map((stream, index) => (
        <div key={index}>
          <video
            ref={(video) => {
              if (video) video.srcObject = stream;
            }}
            autoPlay
          />
        </div>
      ))}
    </div>
  );
}
