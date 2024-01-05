import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CollectionButton from './CollectionButton';

export default function CollectionButtons({ individual_id }) {

    const [collectionNames, setCollectionNames] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5042/collections_names/${individual_id}`).then((response) => {
            setCollectionNames(response.data);
        });
    }, [individual_id]);

    const collections = collectionNames.map(collection => {
        return <CollectionButton
                    key={collection.collection_id} 
                    collection_id={collection.collection_id}
                    collection_name={collection.collection_name}
                />
    });

    return (
        <div className="h-10 mt-2 mb-4 space-x-6 flex items-center justify-start">
            <button className="h-7 aspect-square bg-fg-white-90 rounded bg-cover bg-no-repeat" style={{ backgroundImage: 'url("/assets/icons/plus.svg")' }}></button>
            {collections}
        </div>
    );
};
