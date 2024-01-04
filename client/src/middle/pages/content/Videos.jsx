import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Video } from "./Cards";

export default function Videos({ id }) {

    const [individualsVideos, setIndividualsVideos] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5042/individuals_videos/${id}`).then((response) => {
            setIndividualsVideos(response.data);
        });
    }, [id]);

    const videos = individualsVideos.map(video => {
        return <Video 
                    key={video.individuals_sheets_id} 
                    video_id={video.video_id}
                />
    });
    
    return (
        <div className="grid grid-cols-3 gap-6">
            {videos}
        </div>
    );
};