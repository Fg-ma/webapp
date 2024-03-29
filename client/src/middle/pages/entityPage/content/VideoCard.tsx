import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import config from "@config";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";
import { usePinned } from "@context/PinnedContext";
import { VideoProps, VideoData } from "@FgTypes/middleTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function VideoCard({
  type,
  video_id,
  pinned = false,
  relation_id,
  isEditablePage,
}: VideoProps) {
  const dispatch = useDispatch();

  const { setPinnedState } = usePinned();
  const [videoData, setVideoData] = useState<VideoData>();
  const [hover, setHover] = useState(false);

  // Gets video data from a given video_id
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await Axios.get(`${serverUrl}/videos/${video_id}`);
        setVideoData(response.data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [video_id]);

  // Toggles if a video is pinned by updating the db and then emitting togglePinned to the socket
  const togglePinned = async () => {
    let newPinned;
    let date_pinned;

    if (pinned) {
      newPinned = false;
      date_pinned = null;
    } else {
      newPinned = true;
      const currentDate = new Date();
      date_pinned = currentDate.toISOString();
    }

    try {
      if (type === "collection") {
        await Axios.put(`${serverUrl}/collections/collections_content_pinned`, {
          relation_id: relation_id,
          pinned: newPinned,
          date_pinned: date_pinned,
        });
      } else if (type === "entity") {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        await Axios.put(
          `${serverUrl}/entities/entity_content_pinned`,
          {
            relation_id: relation_id,
            pinned: newPinned,
            date_pinned: date_pinned,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
    } catch (error) {
      console.error("Error toggling pinned:", error);
    }

    try {
      setPinnedState({ relation_id: relation_id, type: "video" });
    } catch (error) {
      console.error("Error with socket:", error);
    }
  };

  const handleClick = () => {
    dispatch(setPageState("main", "videos"));
    dispatch(setIds("main", "video_id", video_id));
  };

  return (
    <div className="flex flex-col justify-center" onClick={handleClick}>
      <div className="bg-fg-white-85 w-full aspect-video rounded mx-auto mb-3 relative">
        {isEditablePage.current ? (
          <button
            className="w-8 aspect-square absolute -top-2.5 -right-2.5 bg-cover bg-no-repeat rotate-45 focus:outline-none"
            style={{
              backgroundImage:
                pinned || hover ? 'url("/assets/icons/pin.svg")' : "none",
            }}
            onClick={(e) => {
              e.stopPropagation();
              togglePinned();
            }}
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
          ></button>
        ) : (
          <div
            className={`aspect-square absolute -top-2.5 -right-2.5 bg-cover bg-no-repeat rotate-45 focus:outline-none ${
              pinned ? "w-8" : "w-0"
            }`}
            style={{
              backgroundImage: pinned ? 'url("/assets/icons/pin.svg")' : "none",
            }}
          ></div>
        )}
      </div>
      <div className="flex justify-start items-center mb-2">
        <div className="bg-fg-white-85 w-8 aspect-square rounded-full"></div>
        {videoData && (
          <p
            className="text-sm font-bold leading-4 text-left h-[2] line-clamp-2 ml-2"
            style={{ width: "calc(100% - 2.5rem)" }}
          >
            {videoData.video_title}
          </p>
        )}
      </div>
    </div>
  );
}
