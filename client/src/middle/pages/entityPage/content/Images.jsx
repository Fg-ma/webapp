import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import io from "socket.io-client";
import config from "@config";
import { Image } from "./Cards";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
    ? config.development.serverUrl
    : config.production.serverUrl;

export default function Images({ entity_id }) {
    /* 
        Description:   
            Queries the database to get the images that the passed in entity is related 
            to then sends the appropriate data to the image card component.
        Unique Properties:
            N/A
    */

    const [imagesData, setImagesData] = useState([]);
    const imageSocketRef = useRef(null);

    // Connect socket
    useEffect(() => {
        imageSocketRef.current = io.connect("http://localhost:5042");

        return () => {
            imageSocketRef.current.disconnect();
        };
    }, []);

    // Sorts the image data first by whether it is pinned or not then sorts by either the date_pinned or the date_added
    const sortData = (data) => {
        const pinnedRows = data.filter((item) => item.pinned === true);
        const notPinnedRows = data.filter((item) => item.pinned === false);

        const parseDate = (dateString) => new Date(dateString);

        pinnedRows.sort(
            (a, b) => parseDate(b.date_pinned) - parseDate(a.date_pinned)
        );
        notPinnedRows.sort(
            (a, b) => parseDate(b.date_added) - parseDate(a.date_added)
        );

        return [...pinnedRows, ...notPinnedRows];
    };

    // Gets image data and connects to socket
    useEffect(() => {
        // Connects to the socket to get the new data when pinned is updated
        imageSocketRef.current.on(
            "pinnedUpdated",
            ({ relation, relation_id, pinned, date_pinned }) => {
                setImagesData((prevData) => {
                    const updatedData = prevData.map((image) => {
                        if (image.entities_images_id === relation_id) {
                            return {
                                ...image,
                                pinned: pinned,
                                date_pinned: date_pinned,
                            };
                        }
                        return image;
                    });

                    const sortedData = sortData(updatedData);

                    return sortedData;
                });
            }
        );

        // Gets original image data
        const fetchImagesData = async () => {
            try {
                const response = await Axios.get(
                    `${serverUrl}/entities/entity_images/${entity_id}`
                );
                setImagesData(sortData(response.data));
            } catch (error) {
                console.error("Error fetching image data:", error);
            }
        };

        fetchImagesData();
    }, [entity_id]);

    const images = imagesData.map((image) => {
        return (
            <Image
                key={`image_${image.image_id}`}
                type={"entity"}
                image_id={image.image_id}
                pinned={image.pinned}
                relation_id={image.entities_images_id}
                socket={imageSocketRef.current}
            />
        );
    });

    return (
        <div className='mt-4 grid grid-cols-3 gap-x-1 gap-y-2'>{images}</div>
    );
}
