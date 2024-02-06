import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "@config";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
    ? config.development.serverUrl
    : config.production.serverUrl;

export default function ImageViewer({ image_id }) {
    const [imageData, setImageData] = useState({
        image_url: null,
        image_title: null,
        image_description: null,
        image_author: null,
    });

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await Axios.get(
                    `${serverUrl}/images/get_full_image/${image_id}`
                );

                if (response.data) {
                    const blobData = new Uint8Array(
                        response.data.images_data.image_data.data
                    );

                    const extension = response.data.image_filename
                        .slice(-3)
                        .toLowerCase();

                    const mimeType = getMimeType(extension);

                    if (mimeType) {
                        const url = URL.createObjectURL(
                            new Blob([blobData], { type: mimeType })
                        );

                        setImageData({
                            image_url: url,
                            image_title: response.data.image_title,
                            image_description: response.data.image_description,
                            image_author: response.data.individuals,
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching sheet data:", error);
            }
        };

        if (image_id) {
            fetchImageData();
        }
    }, [image_id]);

    const getMimeType = (extension) => {
        switch (extension) {
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "gif":
                return "image/gif";
            default:
                return null;
        }
    };
    console.log(imageData);
    return (
        <div className='w-full'>
            {imageData.image_url && (
                <div className='rounded-md overflow-hidden'>
                    <img
                        src={imageData.image_url}
                        alt={imageData.image_description}
                        width='100%'
                        height='auto'
                    />
                </div>
            )}
            {imageData.image_title &&
                imageData.image_author.individual_name &&
                imageData.image_description && (
                    <div className='flex flex-col mt-4 items-start justify-center'>
                        <p className='text-xl mb-2'>{imageData.image_title}</p>
                        <div className='flex items-center justify-start mb-2'>
                            <div className='bg-fg-white-85 rounded-full h-10 aspect-square'></div>
                            <div className='flex flex-col items-start justify-center ml-4'>
                                <p className='text-lg'>
                                    {imageData.image_author.individual_name}
                                </p>
                            </div>
                        </div>
                        <p className='font-K2D text-base'>
                            {imageData.image_description}
                        </p>
                    </div>
                )}
        </div>
    );
}
