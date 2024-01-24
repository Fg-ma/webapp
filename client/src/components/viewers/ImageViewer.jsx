import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function ImageViewer({ image_id }) {
    
    const [imageData, setImageData] = useState({
        image_url: null,
        image_title: null,
        image_description: null,
        image_author: null,
    });

    useEffect(() => {
        Axios.get(`http://localhost:5042/images/get_full_image/${image_id}`).then((response) => {
            if (response.data[0]) {
                const blobData = new Uint8Array(response.data[0].image_data.data);
                const extension = response.data[0].image_filename.slice(-3).toLowerCase();
                const mimeType = getMimeType(extension);

                if (mimeType) {
                    const url = URL.createObjectURL(new Blob([blobData], { type: mimeType }));

                    setImageData({
                        image_url: url,
                        image_title: response.data[0].image_title,
                        image_description: response.data[0].image_description,
                        image_author: response.data[0].individual_name,
                    });
                }
            }
        });
    }, [image_id]);

    const getMimeType = (extension) => {
        switch (extension) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'gif':
                return 'image/gif';
            default:
                return null;
        }
    };

    return (
        <div className='w-full rounded-md overflow-hidden'>
            {imageData.image_url && 
                <img src={imageData.image_url} alt={imageData.image_description} width="100%" height="auto" />
            }
        </div>
    );
};