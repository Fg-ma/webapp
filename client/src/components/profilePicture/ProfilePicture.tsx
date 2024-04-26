import React, { useState, useEffect, useRef, ReactNode } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { Transition, Variants, motion } from "framer-motion";
import config from "@config";
import { setIds, setPageState } from "@redux/pageState/pageStateActions";
import {
  ProfilePictureProps,
  ProfilePictureEntity,
} from "@FgTypes/componentTypes";
import { useIndexedDBContext } from "@context/IDBContext";

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

const Popup = ({ children }: { children: ReactNode }) => {
  return ReactDOM.createPortal(children, document.body);
};

export default function ProfilePicture({
  size,
  entity_username = "",
  entity_type = 0,
  styles,
  entity,
  clickable = false,
  conversations_pictures_id,
  contacts_pictures_id,
  tables_pictures_id,
}: ProfilePictureProps) {
  const dispatch = useDispatch();

  const { getStoredProfilePicture, storeProfilePicture } =
    useIndexedDBContext();
  const [profilePictureData, setProfilePictureData] = useState({
    profilePictureUrl: "",
  });
  const [popupContent, setPopupContent] = useState<JSX.Element | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const mousePosition = useRef<{ x: string; y: string } | null>(null);
  const profilePictureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfilePictureData = async () => {
      const storedProfilePicture = await getStoredProfilePicture(
        conversations_pictures_id
          ? "convo_id_" + conversations_pictures_id
          : contacts_pictures_id
            ? "cont_id_" + contacts_pictures_id
            : tables_pictures_id
              ? "tlb_id_" + tables_pictures_id
              : entity_username,
      );

      if (storedProfilePicture) {
        const url = URL.createObjectURL(storedProfilePicture);

        setProfilePictureData({
          profilePictureUrl: url,
        });
        return;
      }

      try {
        if (conversations_pictures_id) {
          const response = await Axios.get(
            `${serverUrl}/conversations/get_conversation_picture`,
            {
              params: {
                conversations_pictures_id: conversations_pictures_id,
              },
            },
          );

          if (response.data !== "default") {
            const blobData = new Uint8Array(
              response.data.conversation_picture_data.data,
            );

            const extension = response.data.conversation_picture_filename
              .slice(-3)
              .toLowerCase();

            const mimeType = getMimeType(extension);

            if (mimeType) {
              const blob = new Blob([blobData], { type: mimeType });
              const url = URL.createObjectURL(blob);

              setProfilePictureData({
                profilePictureUrl: url,
              });

              await storeProfilePicture(
                "convo_id_" + conversations_pictures_id,
                blob,
              );
            }
          } else {
            setProfilePictureData({
              profilePictureUrl: "",
            });
          }
        } else if (contacts_pictures_id) {
          const response = await Axios.get(
            `${serverUrl}/contacts/get_contact_picture`,
            {
              params: {
                contacts_pictures_id: contacts_pictures_id,
              },
            },
          );

          if (response.data !== "default") {
            const blobData = new Uint8Array(
              response.data.contact_picture_data.data,
            );

            const extension = response.data.contact_picture_filename
              .slice(-3)
              .toLowerCase();

            const mimeType = getMimeType(extension);

            if (mimeType) {
              const blob = new Blob([blobData], { type: mimeType });
              const url = URL.createObjectURL(blob);

              setProfilePictureData({
                profilePictureUrl: url,
              });

              await storeProfilePicture(
                "cont_id_" + contacts_pictures_id,
                blob,
              );
            }
          } else {
            setProfilePictureData({
              profilePictureUrl: "",
            });
          }
        } else if (tables_pictures_id) {
          const response = await Axios.get(
            `${serverUrl}/tables/get_table_picture`,
            {
              params: {
                tables_pictures_id: tables_pictures_id,
              },
            },
          );

          if (response.data !== "default") {
            const blobData = new Uint8Array(
              response.data.table_picture_data.data,
            );

            const extension = response.data.table_picture_filename
              .slice(-3)
              .toLowerCase();

            const mimeType = getMimeType(extension);

            if (mimeType) {
              const blob = new Blob([blobData], { type: mimeType });
              const url = URL.createObjectURL(blob);

              setProfilePictureData({
                profilePictureUrl: url,
              });

              await storeProfilePicture("tbl_id_" + tables_pictures_id, blob);
            }
          } else {
            setProfilePictureData({
              profilePictureUrl: "",
            });
          }
        } else {
          const response = await Axios.get(
            `${serverUrl}/images/get_user_profile_picture`,
            {
              params: {
                entity_username: entity_username,
                entity_type: entity_type,
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
              const blob = new Blob([blobData], { type: mimeType });
              const url = URL.createObjectURL(blob);

              setProfilePictureData({
                profilePictureUrl: url,
              });

              await storeProfilePicture(entity_username, blob);
            }
          } else {
            setProfilePictureData({
              profilePictureUrl: "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching profile picture data:", error);
      }
    };

    fetchProfilePictureData();
  }, [entity_username]);

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

  const showPopup = (entity: ProfilePictureEntity) => {
    setPopupContent(
      <div
        className="p-4 absolute bg-white drop-shadow-md rounded w-max max-w-md"
        style={{ zIndex: 9999 }}
      >
        {entity.entity_name && (
          <p className="text-xl font-bold">{entity.entity_name}</p>
        )}
        <p className="text-base font-K2D">{entity.entity_username}</p>
        {entity.entity_current_Issue && (
          <p className="text-base font-K2D overflow-hidden overflow-ellipsis line-clamp-2">
            {entity.entity_current_Issue}
          </p>
        )}
      </div>,
    );
  };

  const startHoverTimer = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    entity?: ProfilePictureEntity,
  ) => {
    if (entity) {
      mousePosition.current = {
        x: `${event.clientX + 12}px`,
        y: `${event.clientY + 4}px`,
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
      x: `${event.clientX + 12}px`,
      y: `${event.clientY + 4}px`,
    };
  };

  const updatePopupPosition = () => {
    setPopupContent((prevPopupContent) => {
      if (prevPopupContent) {
        return (
          <div
            className="p-4 absolute bg-white drop-shadow-md rounded w-max max-w-md"
            style={{
              top: mousePosition.current?.y,
              left: mousePosition.current?.x,
              zIndex: 9999,
            }}
          >
            {prevPopupContent.props.children}
          </div>
        );
      }
      return null;
    });
  };

  const handleClick = () => {
    if (clickable) {
      if (entity_type === 1) {
        dispatch(setPageState("main", "individuals"));
        dispatch(setPageState("individuals", "sheets"));
        dispatch(setIds("main", "individual_id", entity_username));
        dispatch(setIds("individuals", "collection_id", null));
      } else if (entity_type === 2) {
        dispatch(setPageState("main", "groups"));
        dispatch(setPageState("groups", "sheets"));
        dispatch(setIds("main", "group_id", entity_username));
        dispatch(setIds("groups", "collection_id", null));
      } else if (entity_type === 3) {
        dispatch(setPageState("main", "organizations"));
        dispatch(setPageState("organizations", "sheets"));
        dispatch(setIds("main", "organization_id", entity_username));
        dispatch(setIds("organizations", "collection_id", null));
      }
    }
  };

  return (
    <div className="relative">
      <div
        ref={profilePictureRef}
        className={`${styles} overflow-hidden ${clickable && "cursor-pointer"}`}
        style={{
          height: `${size?.h}rem`,
          minHeight: `${size?.h}rem`,
          width: `${size?.w}rem`,
          minWidth: `${size?.w}rem`,
        }}
        onMouseEnter={(event) => startHoverTimer(event, entity)}
        onMouseLeave={() => cancelHoverTimer()}
        onMouseMove={(event) => {
          updateMousePosition(event);
          updatePopupPosition();
        }}
        onClick={handleClick}
      >
        <img
          className="h-full w-full object-cover"
          src={
            profilePictureData.profilePictureUrl ||
            "/assets/pictures/DefaultProfilePicture.png"
          }
          alt={
            profilePictureData.profilePictureUrl
              ? "Profile Picture"
              : "Default Profile Picture"
          }
        />
      </div>
      {popupContent && (
        <motion.div
          variants={popupContentVar}
          initial="init"
          animate="animate"
          transition={transition}
        >
          <Popup>{popupContent}</Popup>
        </motion.div>
      )}
    </div>
  );
}
