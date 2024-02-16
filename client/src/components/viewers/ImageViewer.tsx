import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

interface ImageViewerProps {
  image_id: number;
}

interface ImageData {
  image_url: string;
  image_title: string;
  image_description: string;
  entity_type: number;
  image_creator: any;
}

export default function ImageViewer({ image_id }: ImageViewerProps) {
  const [imageData, setImageData] = useState<ImageData>({
    image_url: "",
    image_title: "",
    image_description: "",
    entity_type: 0,
    image_creator: null,
  });

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await Axios.get(
          `${serverUrl}/images/get_full_image/${image_id}`,
        );

        if (response.data) {
          const blobData = new Uint8Array(
            response.data.fullImage.images_data.image_data.data,
          );

          const extension = response.data.fullImage.image_filename
            .slice(-3)
            .toLowerCase();

          const mimeType = getMimeType(extension);

          if (mimeType) {
            const url = URL.createObjectURL(
              new Blob([blobData], { type: mimeType }),
            );

            setImageData({
              image_url: url,
              image_title: response.data.fullImage.image_title,
              image_description: response.data.fullImage.image_description,
              entity_type: response.data.fullImage.entities.entity_type,
              image_creator: response.data.imageCreator,
            });
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

  let creatorElement = null;
  if (imageData.image_creator) {
    if (imageData.entity_type === 1) {
      creatorElement = (
        <p className="text-lg">{imageData.image_creator.individual_name}</p>
      );
    } else if (imageData.entity_type === 2) {
      creatorElement = (
        <p className="text-lg">{imageData.image_creator.group_name}</p>
      );
    } else if (imageData.entity_type === 3) {
      creatorElement = (
        <p className="text-lg">{imageData.image_creator.organization_name}</p>
      );
    }
  }

  return (
    <div className="w-full">
      {imageData.image_url && (
        <div className="rounded-md overflow-hidden">
          <img
            src={imageData.image_url}
            alt={imageData.image_description}
            width="100%"
            height="auto"
          />
        </div>
      )}
      {imageData.image_title &&
        imageData.image_creator &&
        imageData.image_description && (
          <div className="flex flex-col mt-4 items-start justify-center">
            <p className="text-xl mb-2">{imageData.image_title}</p>
            <div className="flex items-center justify-start mb-2">
              <div className="bg-fg-white-85 rounded-full h-10 aspect-square"></div>
              <div className="flex flex-col items-start justify-center ml-4">
                {creatorElement}
              </div>
            </div>
            <p className="font-K2D text-base">{imageData.image_description}</p>
          </div>
        )}
    </div>
  );
}
