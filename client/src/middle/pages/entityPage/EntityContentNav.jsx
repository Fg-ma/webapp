import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setPageState, setIds } from "../../../redux/pageState/pageStateActions";
import CollectionButtons from "./CollectionButtons";

const indNavButtonsVar = {
    init: {
        fontSize: "1.5rem",
        lineHeight: "2rem",
        textDecorationLine: "underline",
        textDecorationColor: "rgba(44, 146, 245, 0)",
        textDecorationThickness: "2px",
        textUnderlineOffset: "8px",
    },
    hover: {
        textDecorationColor: "rgba(44, 146, 245, 1)",
        fontSize: "1.375rem",
        lineHeight: "1.875rem",
        paddingLeft: "0.25rem",
        paddingRight: "0.25rem",
    },
    transition: { 
        ease: "easeOut", 
        duration: 0.1,
    },
};

export default function EntityContentNav({ entityType, entity }) {

    /* 
        Description:   
            Creates the content nav containing the sheets, videos, and images buttons
            to swtich the entities's pageState and the entity's collections.
        Unique Properties:
            N/A
    */

    const dispatch = useDispatch();
    const pageState = useSelector((state) => state.page[entityType].pagePayload.pageState);
    
    const deactiveStyles = {};
    const activeStyles = {
        textDecorationColor: "#F56114",
    };
    const pageStyles = {
        sheets: deactiveStyles,
        videos: deactiveStyles,
        images: deactiveStyles,
    };

    pageStyles[pageState] = { ...activeStyles };

    function swapPageState(newState) {
        dispatch(setPageState(entityType, newState));
        dispatch(setIds(entityType, 'collection_id', null));
    };

    return (
        <>
            <div className="mt-6 mb-1 flex items-center justify-center">
                <div className="w-1/3 flex items-center justify-center font-bold">
                    <motion.div 
                        className="h-8 flex cursor-pointer"
                        variants={indNavButtonsVar}
                        initial="init"
                        whileHover="hover"
                        transition={indNavButtonsVar.transition}
                        onClick={() => swapPageState('sheets')}
                    >
                        <button style={pageStyles["sheets"]} className="underline decoration-2 underline-offset-8 decoration-transparent">Sheets</button>
                    </motion.div>
                </div>
                <div className="w-1/3 flex items-center justify-center font-bold">
                    <motion.div 
                        className="h-8 flex cursor-pointer"
                        variants={indNavButtonsVar}
                        initial="init"
                        whileHover="hover"
                        transition={indNavButtonsVar.transition}
                        onClick={() => swapPageState('videos')}
                    >
                        <button style={pageStyles["videos"]} className="underline decoration-2 underline-offset-8 decoration-transparent">Videos</button>
                    </motion.div>
                </div>
                <div className="w-1/3 flex items-center justify-center font-bold">
                    <motion.div 
                        className="h-8 flex cursor-pointer"
                        variants={indNavButtonsVar}
                        initial="init"
                        whileHover="hover"
                        transition={indNavButtonsVar.transition}
                        onClick={() => swapPageState('images')}
                    >
                        <button style={pageStyles["images"]} className="underline decoration-2 underline-offset-8 decoration-transparent">Images</button>
                    </motion.div>
                </div>
            </div>
            <div className="h-0.5 w-full bg-fg-black-25 rounded-full mb-2"></div>
            {entity && (
                <CollectionButtons entityType={entityType} entity_id={entity[`${entityType.slice(0, -1)}_id`]} />
            )}
        </>
    )
}
