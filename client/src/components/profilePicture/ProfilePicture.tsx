import React, { useEffect, useState } from "react";
import Axios from "axios";
import config from "@config";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

interface ProfilePictureProps {
  size: {
    w: number;
    h: number;
  };
  entity_id: string;
  type: string;
}

export default function ProfilePicture({
  size,
  entity_id,
  type,
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
  console.log(size);
  return (
    <>
      <div
        className={`h-${size.h} w-${size.w} ${
          type === "rounded-full" ? "rounded-full" : "none"
        } ${type === "rounded-md" ? "rounded-md" : "none"} overflow-hidden`}
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
      </div>
    </>
  );
}
