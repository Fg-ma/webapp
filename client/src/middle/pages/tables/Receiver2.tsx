import React, { useEffect, useRef } from "react";
import SimplePeer from "simple-peer";
import { useTableSocketContext } from "@context/TableSocketContext";

interface ReceiverProps {
  table_id: string;
}

interface Stream {
  id: string;
  stream: MediaStream;
}

const Receiver: React.FC<ReceiverProps> = ({ table_id }) => {
  const { tableSocket } = useTableSocketContext();
  const streams: Stream[] = [];
  const videosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const addVideo = (stream: MediaStream, id: string) => {
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
      videoElement.setAttribute("data-id", id);
      videoElement.setAttribute("class", "video-grid-item");
      if (videosRef.current) {
        videosRef.current.appendChild(videoElement);
      }
    };

    tableSocket.on("broadcasterOffer", (offer: any) => {
      const peer = new SimplePeer();
      peer.on("signal", (data) => {
        tableSocket.emit("broadcasterOffer", {
          table_id: table_id,
          offer: data,
        });
      });
      peer.signal(offer);

      peer.on("stream", (stream) => {
        streams.push({ id: offer.table_id, stream });
        addVideo(stream, offer.table_id);
      });
    });

    return () => {
      tableSocket.disconnect();
    };
  }, [table_id]);

  return (
    <div ref={videosRef} className="video-grid-container">
      {/* Video elements will be dynamically added here */}
    </div>
  );
};

export default Receiver;
