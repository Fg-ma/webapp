import React, { useState } from "react";
import io from "socket.io-client";
import config from "@config";
import { v4 as uuid } from "uuid";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function TablesLiveVideoChatOverlay({
  table_id,
}: {
  table_id: string;
}) {
  const tableSocket = io(serverUrl, {
    path: "/table-socket",
  });
  const [videos, setVideos] = useState<any[]>([]);

  const user_table_id = uuid();
  tableSocket.emit("join-room", table_id, user_table_id);

  const myVideo = document.createElement("video");
  myVideo.muted = true;

  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      addVideoStream(myVideo, stream, user_table_id);

      tableSocket.on("user-connected", (member_table_id) => {
        connectToNewUser(member_table_id, stream);
      });
    });

  tableSocket.on("user-disconnected", (member_table_id) => {
    setVideos((prev) =>
      prev.filter((video) => {
        if (video.member_table_id !== member_table_id) {
          return video;
        }
      }),
    );
    const videoElement = document.getElementById(member_table_id);
    if (videoElement) {
      videoElement.remove();
    }
  });

  function connectToNewUser(member_table_id, stream) {
    const call = stream;
    const video = document.createElement("video");
    addVideoStream(video, call, member_table_id);
  }

  function addVideoStream(video, stream, member_table_id) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    setVideos((prev) => [
      ...prev,
      { member_table_id: member_table_id, video: video },
    ]);
  }
  console.log(videos);
  return <div>hia</div>;
}
