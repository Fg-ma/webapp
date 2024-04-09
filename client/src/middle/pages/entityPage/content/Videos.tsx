import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { VideosProps, VideosData } from "@FgTypes/middleTypes";
import VideoCard from "./VideoCard";
import usePinnedContext from "@context/PinnedContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Videos({
  entity_username,
  isEditablePage,
}: VideosProps) {
  /* 
    Description:   
      Queries the database to get the videos that the passed in entity is related 
      to then sends the appropriate data to the video card component.
    Unique Properties:
      N/A
  */

  const { pinnedState } = usePinnedContext();
  const [videosData, setVideosData] = useState<VideosData[]>([]);

  // Sorts the video data first by whether it is pinned or not then sorts by either the date_pinned or the date_added
  const sortData = (data: VideosData[]) => {
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

  // Gets video data
  useEffect(() => {
    const fetchVideosData = async () => {
      try {
        const response = await Axios.get(
          `${serverUrl}/entities/entity_videos/${entity_username}`,
        );
        setVideosData(sortData(response.data));
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchVideosData();
  }, [entity_username]);

  // Handle when a video is pinned
  useEffect(() => {
    const fetchNewPinnedData = async (filteredVideoData: VideosData[]) => {
      try {
        const response = await Axios.get(
          `${serverUrl}/entities/entity_video_by_entities_content_id/${pinnedState.relation_id}`,
        );

        if (response.data.pinned === true) {
          setVideosData([response.data, ...filteredVideoData]);
        } else if (response.data.pinned === false) {
          setVideosData(sortData([response.data, ...filteredVideoData]));
        }
      } catch (error) {
        console.error("Error fetching individual data:", error);
      }
    };

    if (pinnedState.type === "video" && pinnedState.relation_id) {
      const filteredVideoData = videosData.filter(
        (video) => video.entities_content_id !== pinnedState.relation_id,
      );

      fetchNewPinnedData(filteredVideoData);
    }
  }, [pinnedState]);

  const videos = videosData.map((video) => {
    return (
      <VideoCard
        key={`video_${video.video_id}`}
        type={"entity"}
        video_id={video.video_id}
        pinned={video.pinned}
        relation_id={video.entities_content_id}
        isEditablePage={isEditablePage}
      />
    );
  });

  return <div className="mt-4 grid grid-cols-3 gap-6">{videos}</div>;
}
