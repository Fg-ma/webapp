import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { io, Socket } from "socket.io-client";
import config from "@config";
import { Sheet, Video, Image } from "./Cards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
    ? config.development.serverUrl
    : config.production.serverUrl;

interface CollectionsProps {
    entity_id: number;
    collection_id: number;
}

interface CollectionItem {
    collection_id: number;
    collections_images_id: number | null;
    collections_sheets_id: number | null;
    collections_videos_id: number | null;
    date_added: string;
    pinned: boolean;
    date_pinned: string | null;
    image_creator_id?: number;
    sheet_author_id?: number;
    video_creator_id?: number;
    image_data_id?: number;
    sheet_data_id?: number;
    video_data_id?: number;
    image_description?: string;
    sheet_subject?: string;
    video_description?: string;
    image_filename?: string;
    sheet_filename?: string;
    video_filename?: string;
    image_id?: number;
    sheet_id?: number;
    video_id?: number;
    image_title?: string;
    sheet_title?: string;
    video_title?: string;
}

export default function Collections({
    entity_id,
    collection_id,
}: CollectionsProps) {
    /* 
        Description:   
            Queries the database to get the collection data which is then processed 
            into sheets, images, and videos depending on what is in each collection.
        Unique Properties:
            Uses sockets to live update the pinned itmes in a collection
    */

    const [collectionData, setCollectionData] = useState<CollectionItem[]>([]);
    const socketRef = useRef<Socket | null>(null);

    // Connect socket
    useEffect(() => {
        const socket = io as any;
        socketRef.current = socket.connect(serverUrl);

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    // Sorts the collection data first by whether it is pinned or not then sorts by either the date_pinned or the date_added
    const sortData = (data: CollectionItem[]) => {
        const pinnedRows = data.filter((item) => item.pinned === true);
        const notPinnedRows = data.filter((item) => item.pinned === false);

        const parseDate = (dateString: string | null) =>
            dateString
                ? new Date(dateString).getTime()
                : new Date("2000-01-01T01:01:01.000Z").getTime();

        pinnedRows.sort(
            (a, b) => parseDate(b.date_pinned) - parseDate(a.date_pinned)
        );
        notPinnedRows.sort(
            (a, b) => parseDate(b.date_added) - parseDate(a.date_added)
        );

        return [...pinnedRows, ...notPinnedRows];
    };

    // Gets collection data and connects to socket
    useEffect(() => {
        // Connects to the socket to get the new data when pinned is updated
        socketRef.current?.on(
            "pinnedUpdated",
            ({ relation, relation_id, pinned, date_pinned }) => {
                setCollectionData((prevData) => {
                    const updatedData = prevData.map((item) => {
                        if (
                            relation === "sheet" &&
                            item.collections_sheets_id === relation_id
                        ) {
                            return {
                                ...item,
                                pinned: pinned,
                                date_pinned: date_pinned,
                            };
                        } else if (
                            relation === "video" &&
                            item.collections_videos_id === relation_id
                        ) {
                            return {
                                ...item,
                                pinned: pinned,
                                date_pinned: date_pinned,
                            };
                        } else if (
                            relation === "image" &&
                            item.collections_images_id === relation_id
                        ) {
                            return {
                                ...item,
                                pinned: pinned,
                                date_pinned: date_pinned,
                            };
                        }
                        return item;
                    });

                    const sortedData = sortData(updatedData);

                    return sortedData;
                });
            }
        );

        // Gets original collection data
        const fetchCollectionsData = async () => {
            try {
                const response = await Axios.get(
                    `${serverUrl}/collections/${collection_id}`
                );
                setCollectionData(sortData(response.data));
            } catch (error) {
                console.error("Error fetching image data:", error);
            }
        };

        fetchCollectionsData();
    }, [collection_id]);

    // Maps the collection data into the appropriate places
    const collection = collectionData.map((item) => {
        if (socketRef.current && item.sheet_id && item.collections_sheets_id) {
            return (
                <Sheet
                    key={`collectionSheet_${item.sheet_id}`}
                    type={"collection"}
                    sheet_id={item.sheet_id}
                    author_id={entity_id}
                    pinned={item.pinned}
                    relation_id={item.collections_sheets_id}
                    socket={socketRef.current}
                />
            );
        } else if (
            socketRef.current &&
            item.image_id &&
            item.collections_images_id
        ) {
            return (
                <Image
                    key={`collectionImage_${item.image_id}`}
                    type={"collection"}
                    image_id={item.image_id}
                    pinned={item.pinned}
                    relation_id={item.collections_images_id}
                    socket={socketRef.current}
                />
            );
        } else if (
            socketRef.current &&
            item.video_id &&
            item.collections_videos_id
        ) {
            return (
                <Video
                    key={`collectionVideo_${item.video_id}`}
                    type={"collection"}
                    video_id={item.video_id}
                    pinned={item.pinned}
                    relation_id={item.collections_videos_id}
                    socket={socketRef.current}
                />
            );
        }
    });

    return <div className='mt-4 grid grid-cols-3 gap-6'>{collection}</div>;
}
