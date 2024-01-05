import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Image } from "./Cards";

export default function Images({ id }) {

    /* 
        Description:   
            Queries the database to get the images that the passed in entity is related 
            to then sends the appropriate data to the Image card component.
        Unique Properties:
            N/A
    */

    const [imagesData, setImagesData] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5042/individuals_images/${id}`).then((response) => {
            setImagesData(response.data);
        });
    }, [id]);
    
    const images = imagesData.map(image => {
        return <Image 
                    key={image.individuals_images_id} 
                    image_id={image.image_id}
                />
    });

    return (
        <div className="grid grid-cols-3 gap-x-1 gap-y-2">
            {images}
        </div>
    );
};