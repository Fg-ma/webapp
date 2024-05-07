import React, { useEffect, useRef } from "react";
import SimplePeer from "simple-peer";
import { useTableSocketContext } from "@context/TableSocketContext";

interface BroadcasterProps {
  table_id: string;
}

const Broadcaster: React.FC<BroadcasterProps> = ({ table_id }) => {
  const { tableSocket } = useTableSocketContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  let peer: SimplePeer.Instance | null = null;

  useEffect(() => {
    const addVideo = (stream: MediaStream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        addVideo(stream);
        peer = new SimplePeer({ initiator: true, stream: stream });

        peer.on("signal", (data) => {
          tableSocket.emit("broadcasterOffer", {
            table_id: table_id,
            offer: data,
          });
        });
      })
      .catch((error) => console.error("getUserMedia error:", error));

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [table_id]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  );
};

export default Broadcaster;
