import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import config from "@config";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";
import usePinnedContext from "@context/PinnedContext";
import {
  VideoProps,
  VideoData,
  VideoThumbnailData,
} from "@FgTypes/middleTypes";
import { useIndexedDBContext } from "@context/IDBContext";
import LoadingAnimation from "@components/loadingAnimation/LoadingAnimation";

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

  const { getStoredThumbnail, storeThumbnail } = useIndexedDBContext();
  const { setPinnedState } = usePinnedContext();
  const [videoData, setVideoData] = useState<VideoData>();
  const [videoThumbnailData, setVideoThumbnailData] =
    useState<VideoThumbnailData>({
      image_url: "",
      image_description: "",
    });
  const [loadingThumbnail, setLoadingThumbnail] = useState(true);
  const [hover, setHover] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const storedThumbnail = await getStoredThumbnail(video_id);

        if (storedThumbnail) {
          const url = URL.createObjectURL(storedThumbnail.blob);

          setVideoThumbnailData({
            image_url: url,
            image_description: storedThumbnail.description,
          });
          setLoadingThumbnail(false);
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/videos/get_video_thumbnail`,
          {
            params: {
              video_id: video_id,
            },
          },
        );

        if (response.data) {
          const blobData = new Uint8Array(
            response.data.video_thumbnail_data.data,
          );

          const extension = response.data.video_thumbnail_filename
            .slice(-3)
            .toLowerCase();

          const mimeType = getMimeType(extension);

          if (mimeType) {
            const blob = new Blob([blobData], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const description = response.data.video_thumbnail_description;

            setVideoThumbnailData({
              image_url: url,
              image_description: description,
            });

            await storeThumbnail(video_id, {
              blob: blob,
              description: description,
            });

            setLoadingThumbnail(false);
          }
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    if (video_id) {
      fetchVideoData();
    }
  }, [video_id]);

  const getMimeType = (extension: string) => {
    switch (extension) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center" onClick={handleClick}>
      <div
        ref={thumbnailRef}
        className="bg-fg-white-85 w-full aspect-video rounded mx-auto mb-3 relative"
      >
        {loadingThumbnail ? (
          <LoadingAnimation containerRef={thumbnailRef} />
        ) : (
          <img
            className="object-cover object-center w-full h-full rounded"
            src={videoThumbnailData.image_url}
            alt={videoThumbnailData.image_description}
          />
        )}
        {isEditablePage.current ? (
          <button
            className={`w-5 ${
              pinned || hover ? "bg-fg-primary" : "none"
            } rounded-full aspect-square absolute -top-1.5 -right-1.5 bg-cover bg-no-repeat focus:outline-none`}
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
            className={`w-5 ${
              pinned || hover ? "bg-fg-primary" : "none"
            } rounded-full aspect-square absolute -top-1.5 -right-1.5 bg-cover bg-no-repeat focus:outline-none`}
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
