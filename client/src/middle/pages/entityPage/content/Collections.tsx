import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";
import { CollectionsProps, CollectionItem } from "@FgTypes/middleTypes";
import SheetCard from "./SheetCard";
import VideoCard from "./VideoCard";
import ImageCard from "./ImageCard";
import { usePinned } from "@context/PinnedContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Collections({
  entity_username,
  collection_id,
  isEditablePage,
}: CollectionsProps) {
  /* 
    Description:   
      Queries the database to get the collection data which is then processed 
      into sheets, images, and videos depending on what is in each collection.
    Unique Properties:
      N/A
  */

  const { pinnedState } = usePinned();
  const [collectionData, setCollectionData] = useState<CollectionItem[]>([]);

  // Sorts the collection data first by whether it is pinned or not then sorts by either the date_pinned or the date_added
  const sortData = (data: CollectionItem[]) => {
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

  // Gets collection data
  useEffect(() => {
    const fetchCollectionsData = async () => {
      try {
        const response = await Axios.get(
          `${serverUrl}/collections/${collection_id}`,
        );

        setCollectionData(sortData(response.data));
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchCollectionsData();
  }, [collection_id]);

  // Handle when content is pinned
  useEffect(() => {
    const fetchNewPinnedData = async (filteredSheetData: CollectionItem[]) => {
      try {
        const response = await Axios.get(
          `${serverUrl}/collections/collection_${pinnedState.type}_by_collections_content_id/${pinnedState.relation_id}`,
        );

        if (response.data.pinned === true) {
          setCollectionData([response.data, ...filteredSheetData]);
        } else if (response.data.pinned === false) {
          setCollectionData(sortData([response.data, ...filteredSheetData]));
        }
      } catch (error) {
        console.error("Error fetching individual data:", error);
      }
    };

    if (pinnedState.relation_id) {
      const filteredData = collectionData.filter(
        (content) => content.collections_content_id !== pinnedState.relation_id,
      );

      fetchNewPinnedData(filteredData);
    }
  }, [pinnedState]);

  // Maps the collection data into the appropriate places
  const collection = collectionData.map((item) => {
    if (
      item.content.content_type === 1 &&
      item.content_data.sheet_id &&
      item.content_data.sheet_author_username &&
      item.collections_content_id
    ) {
      return (
        <SheetCard
          key={`collectionSheet_${item.content_data.sheet_id}`}
          type={"collection"}
          sheet_id={item.content_data.sheet_id}
          author_username={entity_username}
          pinned={item.pinned}
          relation_id={item.collections_content_id}
          isEditablePage={isEditablePage}
        />
      );
    } else if (
      item.content.content_type === 2 &&
      item.content_data.image_id &&
      item.collections_content_id
    ) {
      return (
        <ImageCard
          key={`collectionImage_${item.content_data.image_id}`}
          type={"collection"}
          image_id={item.content_data.image_id}
          pinned={item.pinned}
          relation_id={item.collections_content_id}
          isEditablePage={isEditablePage}
        />
      );
    } else if (
      item.content.content_type === 3 &&
      item.content_data.video_id &&
      item.collections_content_id
    ) {
      return (
        <VideoCard
          key={`collectionVideo_${item.content_data.video_id}`}
          type={"collection"}
          video_id={item.content_data.video_id}
          pinned={item.pinned}
          relation_id={item.collections_content_id}
          isEditablePage={isEditablePage}
        />
      );
    }
  });

  return <div className="mt-4 grid grid-cols-3 gap-6">{collection}</div>;
}
