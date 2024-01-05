import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setPageState } from "../../redux/pageState/pageStateActions";
import Collections from "./CollectionButtons";

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

export default function IndividualsContentNav({ individual }) {

    /* 
        Description:   
            Creates the content nav containing the sheets, videos, and images buttons
            to swtich the individualsPageState and the individual's collections.
        Unique Properties:
            N/A
    */

    const dispatch = useDispatch();
    const individualsPageState = useSelector((state) => state.page.individuals.pagePayload.pageState);
    
    const deactiveStyles = {};
    const activeStyles = {
        textDecorationColor: "#F56114",
    };
    const individualsPageStyles = {
        sheets: deactiveStyles,
        videos: deactiveStyles,
        images: deactiveStyles,
    };

    individualsPageStyles[individualsPageState] = { ...activeStyles };

    function swapPageState(newState) {
        dispatch(setPageState('individuals', newState));
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
                        <button style={individualsPageStyles["sheets"]} className="underline decoration-2 underline-offset-8 decoration-transparent">Sheets</button>
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
                        <button style={individualsPageStyles["videos"]} className="underline decoration-2 underline-offset-8 decoration-transparent">Videos</button>
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
                        <button style={individualsPageStyles["images"]} className="underline decoration-2 underline-offset-8 decoration-transparent">Images</button>
                    </motion.div>
                </div>
            </div>
            <div className="h-0.5 w-full bg-fg-black-25 rounded-full"></div>
            {individual[0] && (
                <Collections individual_id={individual[0].individual_id} />
            )}
        </>
    )
}
