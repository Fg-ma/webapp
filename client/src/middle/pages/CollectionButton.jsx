import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageState, setIds } from "../../redux/pageState/pageStateActions";

const collectionsStyles = {
    init: {
        textUnderlineOffset: "6px",
        textDecorationColor: "rgb(0, 0, 0)",
    },
    selected: {
        textUnderlineOffset: "6px",
        textDecorationColor: "#F56114",
    },
    hover: {
        textUnderlineOffset: "6px",
        textDecorationColor: "rgb(44, 146, 245)",
    },
};

export default function CollectionButton({ collection_id, collection_name }) {
    const dispatch = useDispatch();
    const collectionID = useSelector((state) => state.page.individuals.pagePayload.ids.collection_id);
    const [isHovered, setIsHovered] = useState(false);

    function swapPageState(newState) {
        dispatch(setPageState('individuals', newState));
        dispatch(setIds('individuals', 'collection_id', collection_id));
    };

    return (
        <button 
            className="font-K2D text-lg underline decoration-2 mb-2" 
            style={collectionID === collection_id ? (
                        collectionsStyles.selected 
                        ) : (
                        isHovered ? collectionsStyles.hover : collectionsStyles.init
                    )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => swapPageState('collections')}
        >
            {collection_name}
        </button>
    );
};
