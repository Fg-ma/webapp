import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Video } from "./Cards";

export default function Videos({ id }) {

    /* 
        Description:   
            Queries the database to get the videos that the passed in entity is related 
            to then sends the appropriate data to the Video card component.
        Unique Properties:
            N/A
    */

    const [videosData, setVideosData] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5042/individuals_videos/${id}`).then((response) => {
            setVideosData(response.data);
        });
    }, [id]);

    const videos = videosData.map(video => {
        return <Video 
                    key={video.individuals_videos_id} 
                    video_id={video.video_id}
                />
    });
    
    return (
        <div className="grid grid-cols-3 gap-6">
            {videos}
        </div>
    );
};