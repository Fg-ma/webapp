import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import io from "socket.io-client";
import config from "@config";
import { Video } from "./Cards";

const isDevelopment = process.env.NODE_ENV === "development";
const apiUrl = isDevelopment ? config.development.apiUrl : config.production.apiUrl;

export default function Videos({ entity_id }) {

    /* 
        Description:   
            Queries the database to get the videos that the passed in entity is related 
            to then sends the appropriate data to the video card component.
        Unique Properties:
            N/A
    */

    const [videosData, setVideosData] = useState([]);
    const videoSocketRef = useRef(null);

    // Connect socket
    useEffect(() => {
        videoSocketRef.current = io.connect("http://localhost:5041");

        return () => {
            videoSocketRef.current.disconnect();
        };
    }, []);

    // Sorts the video data first by whether it is pinned or not then sorts by either the date_pinned or the date_added
    const sortData = (data) => {
        const pinnedRows = data.filter((item) => item.pinned === 1);
        const notPinnedRows = data.filter((item) => item.pinned === 0);
    
        const parseDate = (dateString) => new Date(dateString);
    
        pinnedRows.sort((a, b) => parseDate(b.date_pinned) - parseDate(a.date_pinned));
        notPinnedRows.sort((a, b) => parseDate(b.date_added) - parseDate(a.date_added));
    
        return [...pinnedRows, ...notPinnedRows];
    };

    // Gets video data and connects to socket
    useEffect(() => {   
        // Connects to the socket to get the new data when pinned is updated
        videoSocketRef.current.on("pinnedUpdated", ({ relation, relation_id, pinned, date_pinned }) => {
            setVideosData((prevData) => {
                const updatedData = prevData.map((video) => {
                    if (video.entities_videos_id === relation_id) {
                        return { ...video, pinned: pinned, date_pinned: date_pinned };
                    }
                    return video;
                });
    
                const sortedData = sortData(updatedData);
                
                return sortedData;
            });
        });

        // Gets original video data
        Axios.get(`${apiUrl}/entities/entity_videos/${entity_id}`).then((response) => {
            setVideosData(sortData(response.data));
        });
    }, [entity_id]);

    const videos = videosData.map(video => {
        return <Video 
            key={`video_${video.video_id}`} 
            type={"entity"} 
            video_id={video.video_id}
            pinned={video.pinned}
            relation_id={video.entities_videos_id}
            socket={videoSocketRef.current}
        />
    });
    
    return (
        <div className="mt-4 grid grid-cols-3 gap-6">
            {videos}
        </div>
    );
};