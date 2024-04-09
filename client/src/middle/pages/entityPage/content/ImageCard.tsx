import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { motion, Variants, Transition } from "framer-motion";
import config from "@config";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";
import { usePinned } from "@context/PinnedContext";
import {
  ImageProps,
  ImageData,
  ImageThumbnailData,
} from "@FgTypes/middleTypes";
import { useIndexedDBContext } from "@context/IDBContext";
import LoadingAnimation from "@components/loadingAnimation/LoadingAnimation";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

const popupContentVar: Variants = {
  init: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const profileVar: Variants = {
  init: {
    opacity: 0.6,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
};

const transition: Transition = {
  transition: {
    duration: 0.25,
    ease: "easeOut",
  },
};

export default function ImageCard({
  type,
  image_id,
  pinned = false,
  relation_id,
  isEditablePage,
}: ImageProps) {
  const dispatch = useDispatch();

  const { getStoredThumbnail, storeThumbnail } = useIndexedDBContext();
  const { setPinnedState } = usePinned();
  const [pinHover, setPinHover] = useState(false);
  const [imageData, setImageData] = useState<ImageData>();
  const [imageThumbnailData, setImageThumbnailData] =
    useState<ImageThumbnailData>({
      image_url: "",
      image_description: "",
    });
  const [loadingThumbnail, setLoadingThumbnail] = useState(true);
  const [popupContent, setPopupContent] = useState<JSX.Element | null>(null);
  const [showCreator, setShowCreator] = useState(false);
  const primaryHoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const secondaryHoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const mousePosition = useRef<{ x: string; y: string } | null>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  // Gets image data from a given image_id
  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await Axios.get(`${serverUrl}/images/${image_id}`);
        setImageData(response.data);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchImageData();
  }, [image_id]);

  // Toggles if a image is pinned by updating the db and then emitting togglePinned to the socket
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
      setPinnedState({ relation_id: relation_id, type: "image" });
    } catch (error) {
      console.error("Error with socket:", error);
    }
  };

  const showPopup = () => {
    if (imageData) {
      setPopupContent(
        <div className="p-3 absolute bg-white drop-shadow-md rounded w-max max-w-xs">
          <p className="text-lg font-bold line-clamp-2">
            {imageData.image_title}
          </p>
          <p className="text-base font-K2D line-clamp-4">
            {imageData.image_description}
          </p>
        </div>,
      );
    }
  };

  const startHoverTimer = (e: React.MouseEvent<HTMLDivElement>) => {
    mousePosition.current = {
      x: `${e.clientX - 535}px`,
      y: `${e.clientY - 50}px`,
    };
    primaryHoverTimeout.current = setTimeout(() => {
      showPopup();
      updatePopupPosition(e);
    }, 3000);
    secondaryHoverTimeout.current = setTimeout(() => {
      setShowCreator(true);
    }, 1000);
  };

  const updateMousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    mousePosition.current = {
      x: `${e.clientX - 535}px`,
      y: `${e.clientY - 50}px`,
    };
  };

  const updatePopupPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    setPopupContent((prevPopupContent) => {
      if (prevPopupContent) {
        return (
          <div
            className="p-3 absolute bg-white drop-shadow-md rounded w-max max-w-xs"
            style={{
              top: mousePosition.current?.y,
              left: mousePosition.current?.x,
            }}
          >
            {prevPopupContent.props.children}
          </div>
        );
      }
      return null;
    });
  };

  const cancelHoverTimer = () => {
    if (primaryHoverTimeout.current) {
      clearTimeout(primaryHoverTimeout.current);
    }
    if (secondaryHoverTimeout.current) {
      clearTimeout(secondaryHoverTimeout.current);
    }
    setShowCreator(false);
    setPopupContent(null);
  };

  const handleClick = () => {
    dispatch(setPageState("main", "images"));
    dispatch(setIds("main", "image_id", image_id));
  };

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const storedThumbnail = await getStoredThumbnail(image_id);

        if (storedThumbnail) {
          const url = URL.createObjectURL(storedThumbnail.blob);

          setImageThumbnailData({
            image_url: url,
            image_description: storedThumbnail.description,
          });
          setLoadingThumbnail(false);
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/images/get_full_image/${image_id}`,
        );

        if (response.data) {
          const blobData = new Uint8Array(
            response.data.images_data.image_data.data,
          );

          const extension = response.data.image_filename
            .slice(-3)
            .toLowerCase();

          const mimeType = getMimeType(extension);

          if (mimeType) {
            const blob = new Blob([blobData], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const description = response.data.image_description;

            setImageThumbnailData({
              image_url: url,
              image_description: description,
            });

            await storeThumbnail(image_id, {
              blob: blob,
              description: description,
            });

            setLoadingThumbnail(false);
          }
        }
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    if (image_id) {
      fetchImageData();
    }
  }, [image_id]);

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
        className="bg-fg-white-85 w-full aspect-square rounded mb-3 relative"
        style={{ width: "calc(100% - 1rem)" }}
        onMouseEnter={(e) => startHoverTimer(e)}
        onMouseLeave={() => cancelHoverTimer()}
        onMouseMove={(e) => {
          updateMousePosition(e);
          updatePopupPosition(e);
        }}
      >
        {loadingThumbnail ? (
          <LoadingAnimation containerRef={thumbnailRef} />
        ) : (
          <img
            className="object-cover object-center w-full h-full rounded"
            src={imageThumbnailData.image_url}
            alt={imageThumbnailData.image_description}
          />
        )}
        {isEditablePage.current ? (
          <button
            className={`w-5 ${
              pinned || pinHover ? "bg-fg-primary" : "none"
            } rounded-full aspect-square absolute -top-1.5 -right-1.5 bg-cover bg-no-repeat focus:outline-none`}
            onClick={(e) => {
              e.stopPropagation();
              togglePinned();
            }}
            onMouseEnter={() => {
              setPinHover(true);
            }}
            onMouseLeave={() => {
              setPinHover(false);
            }}
          ></button>
        ) : (
          <div
            className={`w-5 ${
              pinned ? "bg-fg-primary" : "none"
            } rounded-full aspect-square absolute -top-1.5 -right-1.5 bg-cover bg-no-repeat focus:outline-none`}
          ></div>
        )}
        {showCreator && (
          <motion.div
            className="bg-fg-white-95 w-10 aspect-square rounded-full absolute -top-3 -left-3"
            variants={profileVar}
            initial="init"
            animate="animate"
            transition={transition}
          ></motion.div>
        )}
      </div>
      {popupContent && (
        <motion.div
          className="z-50"
          variants={popupContentVar}
          initial="init"
          animate="animate"
          transition={transition}
        >
          {popupContent}
        </motion.div>
      )}
    </div>
  );
}
