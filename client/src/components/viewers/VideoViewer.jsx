import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
    ? config.development.serverUrl
    : config.production.serverUrl;

export default function VideoViewer({ video_id }) {
    const [videoData, setVideoData] = useState({
        video_url: null,
        video_title: null,
        video_description: null,
        video_author: null,
    });

    useEffect(() => {
        const fetchVideoData = async () => {
            const response = await Axios.get(
                `${serverUrl}/videos/get_full_video/${video_id}`
            );

            if (response.data[0]) {
                const blobData = new Uint8Array(
                    response.data[0].videos_data.video_data.data
                );

                const extension = response.data[0].video_filename
                    .slice(-3)
                    .toLowerCase();

                const mimeType = getMimeType(extension);

                if (mimeType) {
                    const url = URL.createObjectURL(
                        new Blob([blobData], { type: mimeType })
                    );

                    setVideoData({
                        video_url: url,
                        video_title: response.data[0].video_title,
                        video_description: response.data[0].video_description,
                        video_author: response.data[0].individuals,
                    });
                }
            }
        };

        if (video_id) {
            fetchVideoData();
        }
    }, [video_id]);

    const getMimeType = (extension) => {
        switch (extension) {
            case "mp4":
                return "video/mp4";
            case "mkv":
                return "video/x-matroska";
            case "avi":
                return "video/x-msvideo";
            default:
                return null;
        }
    };

    return (
        <div className='w-full'>
            {videoData.video_url && (
                <div className='rounded-md overflow-hidden'>
                    <video controls width='100%' height='auto'>
                        <source
                            src={videoData.video_url}
                            type={getMimeType(videoData.video_extension)}
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
            {videoData.video_title &&
                videoData.video_author.individual_name &&
                videoData.video_description && (
                    <div className='flex flex-col mt-4 items-start justify-center'>
                        <p className='text-xl mb-2'>{videoData.video_title}</p>
                        <div className='flex items-center justify-start mb-2'>
                            <div className='bg-fg-white-85 rounded-full h-10 aspect-square'></div>
                            <div className='flex flex-col items-start justify-center ml-4'>
                                <p className='text-lg'>
                                    {videoData.video_author.individual_name}
                                </p>
                            </div>
                        </div>
                        <p className='font-K2D text-base'>
                            {videoData.video_description}
                        </p>
                    </div>
                )}
        </div>
    );
}
