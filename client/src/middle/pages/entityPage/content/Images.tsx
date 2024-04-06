import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { ImagesProps, ImagesData } from "@FgTypes/middleTypes";
import ImageCard from "./ImageCard";
import { usePinned } from "@context/PinnedContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Images({
  entity_username,
  isEditablePage,
}: ImagesProps) {
  /* 
    Description:   
      Queries the database to get the images that the passed in entity is related 
      to then sends the appropriate data to the image card component.
    Unique Properties:
      N/A
  */

  const { pinnedState } = usePinned();
  const [imagesData, setImagesData] = useState<ImagesData[]>([]);

  // Sorts the image data first by whether it is pinned or not then sorts by either the date_pinned or the date_added
  const sortData = (data: ImagesData[]) => {
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

  // Gets image data
  useEffect(() => {
    const fetchImagesData = async () => {
      try {
        const response = await Axios.get(
          `${serverUrl}/entities/entity_images/${entity_username}`,
        );
        setImagesData(sortData(response.data));
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchImagesData();
  }, [entity_username]);

  // Handle when a image is pinned
  useEffect(() => {
    const fetchNewPinnedData = async (filteredSheetData: ImagesData[]) => {
      try {
        const response = await Axios.get(
          `${serverUrl}/entities/entity_image_by_entities_content_id/${pinnedState.relation_id}`,
        );

        if (response.data.pinned === true) {
          setImagesData([response.data, ...filteredSheetData]);
        } else if (response.data.pinned === false) {
          setImagesData(sortData([response.data, ...filteredSheetData]));
        }
      } catch (error) {
        console.error("Error fetching individual data:", error);
      }
    };

    if (pinnedState.type === "image" && pinnedState.relation_id) {
      const filteredImageData = imagesData.filter(
        (image) => image.entities_content_id !== pinnedState.relation_id,
      );

      fetchNewPinnedData(filteredImageData);
    }
  }, [pinnedState]);

  const images = imagesData.map((image) => {
    return (
      <ImageCard
        key={`image_${image.image_id}`}
        type={"entity"}
        image_id={image.image_id}
        pinned={image.pinned}
        relation_id={image.entities_content_id}
        isEditablePage={isEditablePage}
      />
    );
  });

  return <div className="mt-4 grid grid-cols-3 gap-x-1 gap-y-2">{images}</div>;
}
