import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CollectionButton from './CollectionButton';

export default function CollectionButtons({ entityType, entity_id, entityPageRef }) {

    /* 
        Description:   
            Creates the collection buttons for swtiching between different collections 
            associated with an entity and also also for creating new collections.
        Unique Properties:
            N/A
    */

    const [collectionNames, setCollectionNames] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5042/collections/collections_names`, {
            params: {
                id: entity_id,
                type: entityType,
            }
        }).then((response) => {
            setCollectionNames(response.data);
        });
    }, [entity_id]);

    const collections = collectionNames.map(collection => {
        return <CollectionButton
                    key={collection.collection_id} 
                    entityType={entityType}
                    collection_id={collection.collection_id}
                    collection_name={collection.collection_name}
                />
    });

    return (
        <>
            {collectionNames.length > 0 && (
                <div className="h-11 mb-2 space-x-6 flex items-center justify-start overflow-x-auto w-full">
                    <button className="h-9 aspect-square bg-fg-white-90 rounded bg-cover bg-no-repeat" style={{ backgroundImage: 'url("/assets/icons/plus.svg")' }}></button>
                    {collections}
                </div>
            )}
        </>
    );
};
