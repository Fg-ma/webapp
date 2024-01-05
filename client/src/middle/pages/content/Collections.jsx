import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Sheet, Video, Image } from "./Cards";

export default function Sheets({ entity_id, collection_id }) {

    /* 
        Description:   
            Queries the database to get the sheets that the passed in entity is related 
            to then sends the appropriate data to the Sheet card component.
        Unique Properties:
            N/A
    */
    
    const [collectionData, setCollectionData] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5042/collections/${collection_id}`)
            .then((response) => {
                // Convert date strings to Date objects and sort the collectionData by date_added in descending order
                const sortedCollectionData = response.data.slice().sort((a, b) => {
                    const dateA = a.date_added.split('.').reverse().join('-'); // Convert "dd.mm.yyyy" to "yyyy-mm-dd"
                    const dateB = b.date_added.split('.').reverse().join('-');
    
                    return new Date(dateB) - new Date(dateA);
                });
    
                setCollectionData(sortedCollectionData);
            });
    }, [collection_id]);

    const collection = collectionData.map(item => {
        if (item.sheet_id) {
            return <Sheet 
                        key={`collectionSheet_${item.sheet_id}`}  
                        sheet_id={item.sheet_id} 
                        entity_id={item.individual_id}
                    />
        } else if (item.image_id) {
            return <Image 
                        key={`collectionImage_${item.image_id}`}  
                        image_id={item.image_id}
                    />
        } else if (item.video_id) {
            return <Video 
                        key={`collectionVideo_${item.video_id}`} 
                        video_id={item.video_id}
                    />
        }
    });

    return (
        <div className="grid grid-cols-3 gap-6">
            {collection}
        </div>
    );
};