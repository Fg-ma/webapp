import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { io, Socket } from "socket.io-client";
import config from "@config";
import { Image } from "./Cards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

interface ImagesProps {
  entity_id: number;
}

interface ImageData {
  image_id: number;
  entity_id: number;
  entities_images_id: number;
  date_added: string;
  pinned: boolean;
  date_pinned: string | null;
  images: {
    image_id: number;
    image_data_id: number;
    image_creator_id: number;
    image_title: string;
    image_description: string;
    image_filename: string;
  };
}

export default function Images({ entity_id }: ImagesProps) {
  /* 
    Description:   
      Queries the database to get the images that the passed in entity is related 
      to then sends the appropriate data to the image card component.
    Unique Properties:
      N/A
  */

  const [imagesData, setImagesData] = useState<ImageData[]>([]);
  const imageSocketRef = useRef<Socket | null>(null);

  // Connect socket
  useEffect(() => {
    const socket = io as any;
    imageSocketRef.current = socket.connect(serverUrl);

    return () => {
      imageSocketRef.current?.disconnect();
    };
  }, []);

  // Sorts the image data first by whether it is pinned or not then sorts by either the date_pinned or the date_added
  const sortData = (data: ImageData[]) => {
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

  // Gets image data and connects to socket
  useEffect(() => {
    // Connects to the socket to get the new data when pinned is updated
    imageSocketRef.current?.on(
      "pinnedUpdated",
      ({ relation, relation_id, pinned, date_pinned }) => {
        setImagesData((prevData) => {
          const updatedData = prevData.map((image) => {
            if (image.entities_images_id === relation_id) {
              return {
                ...image,
                pinned: pinned,
                date_pinned: date_pinned,
              };
            }
            return image;
          });

          const sortedData = sortData(updatedData);

          return sortedData;
        });
      },
    );

    // Gets original image data
    const fetchImagesData = async () => {
      try {
        const response = await Axios.get(
          `${serverUrl}/entities/entity_images/${entity_id}`,
        );
        setImagesData(sortData(response.data));
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchImagesData();
  }, [entity_id]);

  const images = imagesData.map((image) => {
    return (
      <Image
        key={`image_${image.image_id}`}
        type={"entity"}
        image_id={image.image_id}
        pinned={image.pinned}
        relation_id={image.entities_images_id}
        socket={imageSocketRef.current}
      />
    );
  });

  return <div className="mt-4 grid grid-cols-3 gap-x-1 gap-y-2">{images}</div>;
}
