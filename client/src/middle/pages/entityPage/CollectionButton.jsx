import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setPageState,
    setIds,
} from "../../../redux/pageState/pageStateActions";

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

export default function CollectionButton({
    entityType,
    collection_id,
    collection_name,
}) {
    /* 
        Description:   
            Creates each collection button which can be clicked inorder to switch the page state 
            to the clicked collection.
        Unique Properties:
            N/A
    */

    const dispatch = useDispatch();
    const collectionID = useSelector(
        (state) => state.page[entityType].pagePayload.ids.collection_id
    );
    const [isHovered, setIsHovered] = useState(false);

    function swapPageState(newState) {
        dispatch(setPageState(entityType, newState));
        dispatch(setIds(entityType, "collection_id", collection_id));
    }

    return (
        <button
            className='font-K2D text-lg underline decoration-2 min-w-max bg-fg-white-95 rounded px-5 pb-2'
            style={
                collectionID === collection_id
                    ? collectionsStyles.selected
                    : isHovered
                      ? collectionsStyles.hover
                      : collectionsStyles.init
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => swapPageState("collections")}
        >
            {collection_name}
        </button>
    );
}
