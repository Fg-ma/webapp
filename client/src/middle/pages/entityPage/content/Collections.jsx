import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import io from "socket.io-client";
import config from "@config";
import { Sheet, Video, Image } from "./Cards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment ? config.development.serverUrl : config.production.serverUrl;

export default function Collections({ entity_id, collection_id }) {

    /* 
        Description:   
            Queries the database to get the collection data which is then processed 
            into sheets, images, and videos depending on what is in each collection.
        Unique Properties:
            Uses sockets to live update the pinned itmes in a collection
    */
    
    const [collectionData, setCollectionData] = useState([]);
    const socketRef = useRef(null);

    // Connect socket
    useEffect(() => {
        socketRef.current = io.connect("http://localhost:5042");

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    // Sorts the collection data first by whether it is pinned or not then sorts by either the date_pinned or the date_added
    const sortData = (data) => {
        const pinnedRows = data.filter((item) => item.pinned === 1);
        const notPinnedRows = data.filter((item) => item.pinned === 0);
    
        const parseDate = (dateString) => new Date(dateString);
    
        pinnedRows.sort((a, b) => parseDate(b.date_pinned) - parseDate(a.date_pinned));
        notPinnedRows.sort((a, b) => parseDate(b.date_added) - parseDate(a.date_added));
    
        return [...pinnedRows, ...notPinnedRows];
    };

    // Gets collection data and connects to socket
    useEffect(() => {   
        // Connects to the socket to get the new data when pinned is updated
        socketRef.current.on("pinnedUpdated", ({ relation, relation_id, pinned, date_pinned }) => {
            setCollectionData((prevData) => {
                const updatedData = prevData.map((item) => {
                    if (relation === "sheet" && item.collections_sheets_id === relation_id) {
                        return { ...item, pinned: pinned, date_pinned: date_pinned };
                    } else if (relation === "video" && item.collections_videos_id === relation_id) {
                        return { ...item, pinned: pinned, date_pinned: date_pinned };
                    } else if (relation === "image" && item.collections_images_id === relation_id) {
                        return { ...item, pinned: pinned, date_pinned: date_pinned };
                    };
                    return item;
                });
    
                const sortedData = sortData(updatedData);
    
                return sortedData;
            });
        });

        // Gets original collection data
        Axios.get(`${serverUrl}/collections/${collection_id}`).then((response) => {
            setCollectionData(sortData(response.data));
        });
    }, [collection_id]);

    // Maps the collection data into the appropriate places
    const collection = collectionData.map(item => {
        if (socketRef.current && item.sheet_id) {
            return <Sheet 
                key={`collectionSheet_${item.sheet_id}`}  
                type={"collection"}
                sheet_id={item.sheet_id} 
                author_id={entity_id}
                pinned={item.pinned}
                relation_id={item.collections_sheets_id}
                socket={socketRef.current}
            />
        } else if (socketRef.current && item.image_id) {
            return <Image 
                key={`collectionImage_${item.image_id}`}  
                type={"collection"}
                image_id={item.image_id}
                pinned={item.pinned}
                relation_id={item.collections_images_id}
                socket={socketRef.current}
            />
        } else if (socketRef.current && item.video_id) {
            return <Video 
                key={`collectionVideo_${item.video_id}`} 
                type={"collection"}
                video_id={item.video_id}
                pinned={item.pinned}
                relation_id={item.collections_videos_id}
                socket={socketRef.current}
            />
        }
    });

    return (
        <div className="mt-4 grid grid-cols-3 gap-6">
            {collection}
        </div>
    );
};