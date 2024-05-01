import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import config from "@config";
import { v4 as uuid } from "uuid";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function TablesLiveVideoChatOverlay({
  table_id,
  tableSocket,
}: {
  table_id: string;
  tableSocket: Socket;
}) {
  const userVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = stream;

            const videoTrack = stream.getVideoTracks()[0];
            const sender = tableSocket.id;
            tableSocket.emit("user-connected", table_id, stream, sender);
          }
        })
        .catch((error) => console.error("Error accessing the webcam: ", error));
    }

    tableSocket.on(
      "incoming-new-user",
      (tableId: string, stream: MediaStream, member_table_id: string) => {
        console.log("weasd");
        if (tableId === table_id) {
          console.log(tableId, stream, member_table_id);
          const remoteVideo = document.createElement("video");
          remoteVideo.srcObject = stream;
          remoteVideo.autoplay = true;
          remoteVideo.playsInline = true;
          console.log(remoteVideo);
          document.getElementById("remoteVideos")?.appendChild(remoteVideo);
        }
      },
    );
  }, [table_id]);

  return (
    <div>
      <h2>Webcam Component</h2>
      <video
        ref={userVideoRef}
        autoPlay
        playsInline
        muted
        style={{ maxWidth: "100%" }}
      />
      <div id="remoteVideos"></div>
    </div>
  );
}
