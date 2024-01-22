import React, {useState, useEffect } from 'react';
import Axios from "axios";

export default function VideoViewer({ video_id }) {

    const [videoData, setVideoData] = useState({
        video_url: null,
        video_title: null,
        video_description: null,
        video_author: null,
    });

    useEffect(() => {
        Axios.get(`http://localhost:5042/get_video/${video_id}`).then((response) => {
            if (response.data[0]) {
                const blobData = new Uint8Array(response.data[0].video_data.data);
                const extension = response.data[0].video_filename.slice(-3).toLowerCase();
                const mimeType = getMimeType(extension);

                if (mimeType) {
                    const url = URL.createObjectURL(new Blob([blobData], { type: mimeType }));
                    
                    setVideoData({
                        video_url: url,
                        video_title: response.data[0].video_title,
                        video_description: response.data[0].video_description,
                        video_author: response.data[0].individual_name,
                    });
                }
            }
        });
    }, [video_id]);

    const getMimeType = (extension) => {
        switch (extension) {
            case 'mp4':
                return 'video/mp4';
            case 'mkv':
                return 'video/x-matroska';
            case 'avi':
                return 'video/x-msvideo';
            default:
                return null;
        }
    };

    return (
        <div className='w-full rounded-md overflow-hidden'>
            {videoData.video_url && 
                <video controls width="100%" height="auto">
                    <source src={videoData.video_url} type={getMimeType(videoData.video_extension)} />
                    Your browser does not support the video tag.
                </video>
            }
        </div>
    );
}
