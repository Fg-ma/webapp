import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setPageState } from "../../redux/pageState/pageStateActions";

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

const collectionsButtonsVar = {
    hover: {
        textDecorationColor: "rgba(44, 146, 245, 1)",
    },
    transition: { 
        ease: "easeOut", 
        duration: 0.1,
    },
};

export default function IndividualContentNav() {

    /* 
        Description:   
            Creates the content nav containing the articles, videos, and images buttons
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
        articles: deactiveStyles,
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
                        onClick={() => swapPageState('articles')}
                    >
                        <button style={individualsPageStyles["articles"]} className="underline decoration-2 underline-offset-8 decoration-transparent">Articles</button>
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
            <div className="h-10 mt-2 mb-4 space-x-6 flex items-center justify-start">
                <button className="h-7 aspect-square bg-fg-white-90 rounded bg-cover bg-no-repeat" style={{ backgroundImage: 'url("/assets/icons/plus.svg")' }}></button>
                <motion.button 
                    className="font-K2D text-lg underline decoration-2 mb-2" 
                    style={{ textUnderlineOffset: '6px' }}
                    variants={collectionsButtonsVar}
                    whileHover="hover"
                    transition={collectionsButtonsVar.transition}
                >
                    Proper Pet Care
                </motion.button>
                <motion.button 
                    className="font-K2D text-lg underline decoration-2 mb-2" 
                    style={{ textUnderlineOffset: '6px' }}
                    variants={collectionsButtonsVar}
                    whileHover="hover"
                    transition={collectionsButtonsVar.transition}
                >
                    Overflowing Pounds in San Fran
                </motion.button>
                <motion.button 
                    className="font-K2D text-lg underline decoration-2 mb-2" 
                    style={{ textUnderlineOffset: '6px' }}
                    variants={collectionsButtonsVar}
                    whileHover="hover"
                    transition={collectionsButtonsVar.transition}
                >
                    Puppy Pics
                </motion.button>
            </div>
        </>
    )
}
