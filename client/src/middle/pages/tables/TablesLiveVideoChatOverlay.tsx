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
  const remoteVideosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = stream;

            const sender = tableSocket.id;

            tableSocket.emit("userConnected", table_id, sender);

            // Listen for incoming stream from server
            tableSocket.on("incomingStream", (incomingStream: MediaStream) => {
              console.log("Received incoming stream");
              displayRemoteStream(incomingStream);
            });
          }
        })
        .catch((error) =>
          console.error("Error accessing the webcam or streaming: ", error),
        );
    }

    return () => {
      tableSocket.off("incomingStream");
    };
  }, [table_id]);

  // Function to display remote stream in a video element
  const displayRemoteStream = (stream: MediaStream) => {
    const remoteVideo = document.createElement("video");
    remoteVideo.srcObject = stream;
    remoteVideo.autoplay = true;
    remoteVideo.playsInline = true;

    // Append the video element to the remoteVideos div
    if (remoteVideosRef.current) {
      remoteVideosRef.current.appendChild(remoteVideo);
    }
  };

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
