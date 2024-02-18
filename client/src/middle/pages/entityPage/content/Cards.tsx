import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { Socket } from "socket.io-client";
import { motion, Variants, Transition } from "framer-motion";
import config from "@config";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";

/* 
  Description:   
    Creates all article, video, and image cards used on proile pages
  Unique Properties:
    N/A
*/

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

interface SheetProps {
  type: string;
  sheet_id: string;
  author_id: string;
  pinned: boolean;
  relation_id: string;
  socket: Socket | null;
  isEditablePage: MutableRefObject<boolean>;
}

interface SheetData {
  sheet_id: string;
  sheet_data_id: string;
  sheet_author_id: string;
  sheet_filename: string;
  sheet_title: string;
  sheet_subject: string;
}

export function Sheet({
  type,
  sheet_id,
  author_id,
  pinned = false,
  relation_id,
  socket,
  isEditablePage,
}: SheetProps) {
  const dispatch = useDispatch();

  const [sheetData, setSheetData] = useState<SheetData>();
  const [hover, setHover] = useState(false);
  const isAuthor = useRef<boolean | null>(null);

  // Gets sheet data from a given sheet_id
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await Axios.get(`${serverUrl}/sheets/${sheet_id}`);
        setSheetData(response.data);
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    fetchSheetData();
  }, [sheet_id]);

  // Checks if the entity is the author of the sheet
  if (sheetData && sheetData.sheet_author_id === author_id) {
    isAuthor.current = true;
  }

  // Toggles if a sheet is pinned by updating the db and then emitting togglePinned to the socket
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
        await Axios.put(`${serverUrl}/collections/collections_sheets_pinned`, {
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
          `${serverUrl}/entities/entity_sheets_pinned`,
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
      socket?.emit(
        "togglePinned",
        "sheet",
        relation_id,
        newPinned,
        date_pinned,
      );
    } catch (error) {
      console.error("Error with socket:", error);
    }
  };

  const handleClick = () => {
    dispatch(setPageState("main", "sheets"));
    dispatch(setIds("main", "sheet_id", sheet_id));
  };

  return (
    <div
      className="shadow-md rounded flex flex-col justify-center"
      onClick={handleClick}
    >
      <div className="bg-fg-white-85 w-3/4 aspect-square rounded-md mx-auto mt-5 mb-3 relative">
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
      {sheetData && (
        <p className="text-base font-bold leading-5 text-center mx-4 h-[3.75rem] line-clamp-3 mb-1">
          {sheetData.sheet_title}
        </p>
      )}
      <p className="text-sm font-K2D text-center mb-3">
        {isAuthor.current ? "Author" : "Responseded to"}
      </p>
    </div>
  );
}

interface VideoProps {
  type: string;
  video_id: string;
  pinned: boolean;
  relation_id: string;
  socket: Socket | null;
  isEditablePage: MutableRefObject<boolean>;
}

interface VideoData {
  video_id: string;
  video_data_id: string;
  video_creator_id: string;
  video_filename: string;
  video_title: string;
  video_description: string;
}

export function Video({
  type,
  video_id,
  pinned = false,
  relation_id,
  socket,
  isEditablePage,
}: VideoProps) {
  const dispatch = useDispatch();

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
        await Axios.put(`${serverUrl}/collections/collections_videos_pinned`, {
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
          `${serverUrl}/entities/entity_videos_pinned`,
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
      socket?.emit(
        "togglePinned",
        "video",
        relation_id,
        newPinned,
        date_pinned,
      );
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

interface ImageProps {
  type: string;
  image_id: string;
  pinned: boolean;
  relation_id: string;
  socket: Socket | null;
  isEditablePage: MutableRefObject<boolean>;
}

interface ImageData {
  image_id: string;
  image_data_id: string;
  image_creator_id: string;
  image_filename: string;
  image_title: string;
  image_description: string;
}

export function Image({
  type,
  image_id,
  pinned = false,
  relation_id,
  socket,
  isEditablePage,
}: ImageProps) {
  const dispatch = useDispatch();

  const [imageData, setImageData] = useState<ImageData>();
  const [popupContent, setPopupContent] = useState<JSX.Element | null>(null);
  const [showCreator, setShowCreator] = useState(false);
  const primaryHoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const secondaryHoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const mousePosition = useRef<{ x: string; y: string } | null>(null);
  const [pinHover, setPinHover] = useState(false);

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
        await Axios.put(`${serverUrl}/collections/collections_images_pinned`, {
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
          `${serverUrl}/entities/entity_images_pinned`,
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
      socket?.emit(
        "togglePinned",
        "image",
        relation_id,
        newPinned,
        date_pinned,
      );
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

  return (
    <div className="flex flex-col justify-center" onClick={handleClick}>
      <div
        className="bg-fg-white-85 w-full aspect-square rounded mb-3 relative"
        style={{ width: "calc(100% - 1rem)" }}
        onMouseEnter={(e) => startHoverTimer(e)}
        onMouseLeave={() => cancelHoverTimer()}
        onMouseMove={(e) => {
          updateMousePosition(e);
          updatePopupPosition(e);
        }}
      >
        {isEditablePage.current ? (
          <button
            className="w-8 aspect-square absolute -top-2.5 -right-2.5 bg-cover bg-no-repeat rotate-45 focus:outline-none"
            style={{
              backgroundImage:
                pinned || pinHover ? 'url("/assets/icons/pin.svg")' : "none",
            }}
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
            className={`aspect-square absolute -top-2.5 -right-2.5 bg-cover bg-no-repeat rotate-45 focus:outline-none ${
              pinned ? "w-8" : "w-0"
            }`}
            style={{
              backgroundImage: pinned ? 'url("/assets/icons/pin.svg")' : "none",
            }}
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
