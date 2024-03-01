import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { io, Socket } from "socket.io-client";
import config from "@config";
import { VideosProps, VideoData } from "@FgTypes/middleTypes";
import { Video } from "./Cards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Videos({ entity_id, isEditablePage }: VideosProps) {
  /* 
    Description:   
      Queries the database to get the videos that the passed in entity is related 
      to then sends the appropriate data to the video card component.
    Unique Properties:
      N/A
  */

  const [videosData, setVideosData] = useState<VideoData[]>([]);
  const videoSocketRef = useRef<Socket | null>(null);

  // Connect socket
  useEffect(() => {
    const socket = io as any;
    videoSocketRef.current = socket.connect(serverUrl);

    return () => {
      videoSocketRef.current?.disconnect();
    };
  }, []);

  // Sorts the video data first by whether it is pinned or not then sorts by either the date_pinned or the date_added
  const sortData = (data: VideoData[]) => {
    const pinnedRows = data.filter((item) => item.pinned === true);
    const notPinnedRows = data.filter((item) => item.pinned === false);

    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    pinnedRows.sort(
      (a, b) => parseDate(b.date_pinned) - parseDate(a.date_pinned),
    );
    notPinnedRows.sort(
      (a, b) => parseDate(b.date_added) - parseDate(a.date_added),
    );

    return [...pinnedRows, ...notPinnedRows];
  };

  // Gets video data and connects to socket
  useEffect(() => {
    // Connects to the socket to get the new data when pinned is updated
    videoSocketRef.current?.on(
      "pinnedUpdated",
      ({ relation_id, pinned, date_pinned }) => {
        setVideosData((prevData) => {
          const updatedData = prevData.map((video) => {
            if (video.entities_content_id === relation_id) {
              return {
                ...video,
                pinned: pinned,
                date_pinned: date_pinned,
              };
            }
            return video;
          });

          const sortedData = sortData(updatedData);

          return sortedData;
        });
      },
    );

    // Gets original video data
    const fetchVideosData = async () => {
      try {
        const response = await Axios.get(
          `${serverUrl}/entities/entity_videos/${entity_id}`,
        );
        setVideosData(sortData(response.data));
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchVideosData();
  }, [entity_id]);

  const videos = videosData.map((video) => {
    return (
      <Video
        key={`video_${video.video_id}`}
        type={"entity"}
        video_id={video.video_id}
        pinned={video.pinned}
        relation_id={video.entities_content_id}
        socket={videoSocketRef.current}
        isEditablePage={isEditablePage}
      />
    );
  });

  return <div className="mt-4 grid grid-cols-3 gap-6">{videos}</div>;
}
