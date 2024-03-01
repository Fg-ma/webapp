import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Transition, Variants, motion } from "framer-motion";
import config from "@config";
import { ProfilePictureProps, Entity } from "@FgTypes/componentTypes";

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

const transition: Transition = {
  transition: {
    duration: 0.25,
    ease: "easeOut",
  },
};

export default function ProfilePicture({
  size,
  entity_id,
  styles,
  entity,
}: ProfilePictureProps) {
  const [profilePictureData, setProfilePictureData] = useState({
    profile_picture_url: "",
  });

  useEffect(() => {
    const fetchProfilePictureData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/images/get_user_profile_picture`,
          {
            params: {
              entity_id: entity_id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data !== "default") {
          const blobData = new Uint8Array(
            response.data.profile_picture_data.data,
          );

          const extension = response.data.profile_picture_filename
            .slice(-3)
            .toLowerCase();

          const mimeType = getMimeType(extension);

          if (mimeType) {
            const url = URL.createObjectURL(
              new Blob([blobData], { type: mimeType }),
            );

            setProfilePictureData({
              profile_picture_url: url,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching profile picture data:", error);
      }
    };

    fetchProfilePictureData();
  }, [entity_id]);

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

  const [popupContent, setPopupContent] = useState<JSX.Element | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const mousePosition = useRef<{ x: string; y: string } | null>(null);

  const showPopup = (entity: Entity) => {
    setPopupContent(
      <div className="p-4 absolute bg-white drop-shadow-md rounded w-max max-w-md z-50">
        <p className="text-xl font-bold">{entity.entity_name}</p>
        <p className="text-base font-K2D">{entity.entity_username}</p>
        <p className="text-base font-K2D overflow-hidden overflow-ellipsis line-clamp-2">
          {entity.entity_current_Issue}
        </p>
      </div>,
    );
  };

  const startHoverTimer = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    entity?: Entity,
  ) => {
    if (entity) {
      mousePosition.current = {
        x: `${event.clientX - 535}px`,
        y: `${event.clientY - 50}px`,
      };
      hoverTimeout.current = setTimeout(() => {
        showPopup(entity);
        updatePopupPosition();
      }, 1500);
    }
  };

  const cancelHoverTimer = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setPopupContent(null);
  };

  const updateMousePosition = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    mousePosition.current = {
      x: `${event.clientX - 535}px`,
      y: `${event.clientY - 50}px`,
    };
  };

  const updatePopupPosition = () => {
    setPopupContent((prevPopupContent) => {
      if (prevPopupContent) {
        return (
          <div
            className="p-4 absolute bg-white drop-shadow-md rounded w-max max-w-md z-50"
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

  return (
    <div
      className={`${styles} overflow-hidden cursor-pointer`}
      style={{
        height: `${size.h}rem`,
        minHeight: `${size.h}rem`,
        width: `${size.w}rem`,
        minWidth: `${size.w}rem`,
      }}
      onMouseEnter={(event) => startHoverTimer(event, entity)}
      onMouseLeave={() => cancelHoverTimer()}
      onMouseMove={(event) => {
        updateMousePosition(event);
        updatePopupPosition();
      }}
    >
      <img
        className="h-full w-full object-cover"
        src={
          profilePictureData.profile_picture_url ||
          "/assets/pictures/DefaultProfilePicture.png"
        }
        alt={
          profilePictureData.profile_picture_url
            ? "Profile Picture"
            : "Default Profile Picture"
        }
      />
      {popupContent && (
        <motion.div
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
