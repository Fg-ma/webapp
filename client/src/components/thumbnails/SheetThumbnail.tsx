import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import config from "@config";
import { SheetThumbnailProps } from "@FgTypes/componentTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function SheetThumbnail({
  sheet_id,
  size,
  styles,
}: SheetThumbnailProps) {
  const dispatch = useDispatch();

  const [sheetThumbnailData, setSheetThumbnailData] = useState({
    sheetThumbnailUrl: "",
  });

  useEffect(() => {
    const fetchSheetThumbnailData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/sheets/get_sheet_thumbnail`,
          {
            params: {
              sheet_id: sheet_id,
            },
          },
        );

        if (response.data !== "default") {
          const blobData = new Uint8Array(
            response.data.sheet_thumbnail_data.data,
          );

          const extension = response.data.sheet_thumbnail_filename
            .slice(-3)
            .toLowerCase();

          const mimeType = getMimeType(extension);

          if (mimeType) {
            const url = URL.createObjectURL(
              new Blob([blobData], { type: mimeType }),
            );

            setSheetThumbnailData({
              sheetThumbnailUrl: url,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching sheet thumbnail data:", error);
      }
    };

    fetchSheetThumbnailData();
  }, [sheet_id]);

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
    <div
      className={`${styles} overflow-hidden`}
      style={{
        height: `${size.h}rem`,
        minHeight: `${size.h}rem`,
        width: `${size.w}rem`,
        minWidth: `${size.w}rem`,
      }}
    >
      <img
        className="h-full w-full object-cover"
        src={
          sheetThumbnailData.sheetThumbnailUrl ||
          "/assets/pictures/DefaultProfilePicture.png"
        }
        alt={
          sheetThumbnailData.sheetThumbnailUrl
            ? "Sheet Thumbnail"
            : "Default Profile Picture"
        }
      />
    </div>
  );
}
