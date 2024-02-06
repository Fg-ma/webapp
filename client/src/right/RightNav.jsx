import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setPageState } from "../redux/pageState/pageStateActions";
import { closeDrop } from "../redux/filters/filterActions";

const navButtonsVar = {
    init: {
        fontSize: "1.125rem",
        lineHeight: "1.75rem",
        paddingTop: "0.25rem",
        textDecorationLine: "underline",
        textDecorationColor: "rgba(44, 146, 245, 0)",
        textDecorationThickness: "2px",
        textUnderlineOffset: "8px",
    },
    hover: {
        textDecorationColor: "rgba(44, 146, 245, 1)",
        fontSize: "1rem",
        lineHeight: "1.5rem",
        paddingTop: "0rem",
    },
    transition: {
        ease: "easeOut",
        duration: 0.1,
    },
};

export default function RightNav() {
    /* 
        Description:   
            A navbar that cycles between news, explore, messages, and dog ears. The currently 
            selected item is underlined in fg-primary. It also sets the state in redux to 
            determine what should be displayed in the rightSpaceContentContainer.
        Unique Properties:
            framer-motion used to control hover styles.
    */

    const dispatch = useDispatch();
    const rightPage = useSelector(
        (state) => state.page.right.pagePayload.pageState
    );

    const deactiveStyles = {};
    const activeStyles = {
        textDecorationLine: "underline",
        textDecorationColor: "#F56114",
        textUnderlineOffset: "8px",
        textDecorationThickness: "2px",
        paddingBottom: "0.25rem",
    };
    const rightStyles = {
        papers: deactiveStyles,
        news: deactiveStyles,
        explore: deactiveStyles,
        messages: deactiveStyles,
        dogEars: deactiveStyles,
    };

    rightStyles[rightPage] = { ...activeStyles };

    function swapRightState(state) {
        dispatch(closeDrop(state, "isDropFilter"));
        dispatch(setPageState("right", state));
    }

    return (
        <nav
            id='rightNavbarBarSpace'
            className='block w-full rounded-t-xl h-12 bg-fg-white-90 drop-shadow-md'
        >
            <div className='flex divide-x-2 divide-fg-white-70 h-full'>
                <motion.div
                    className='h-8 w-1/3 my-auto flex justify-center items-center cursor-pointer'
                    variants={navButtonsVar}
                    initial='init'
                    whileHover='hover'
                    transition={navButtonsVar.transition}
                    onClick={() => swapRightState("papers")}
                >
                    <button className='w-full' style={rightStyles["papers"]}>
                        Papers
                    </button>
                </motion.div>
                <motion.div
                    className='h-8 w-1/3 my-auto flex justify-center items-center cursor-pointer'
                    variants={navButtonsVar}
                    initial='init'
                    whileHover='hover'
                    transition={navButtonsVar.transition}
                    onClick={() => swapRightState("news")}
                >
                    <button className='w-full' style={rightStyles["news"]}>
                        News
                    </button>
                </motion.div>
                <motion.div
                    className='h-8 w-1/3 my-auto flex justify-center items-center cursor-pointer'
                    variants={navButtonsVar}
                    initial='init'
                    whileHover='hover'
                    transition={navButtonsVar.transition}
                    onClick={() => swapRightState("explore")}
                >
                    <button className='w-full' style={rightStyles["explore"]}>
                        Explore
                    </button>
                </motion.div>
                <motion.div
                    className='h-8 w-1/3 my-auto flex justify-center items-center cursor-pointer'
                    variants={navButtonsVar}
                    initial='init'
                    whileHover='hover'
                    transition={navButtonsVar.transition}
                    onClick={() => swapRightState("dogEars")}
                >
                    <button className='w-full' style={rightStyles["dogEars"]}>
                        Dog-Ears
                    </button>
                </motion.div>
            </div>
        </nav>
    );
}

//<motion.div
//    className="h-8 w-1/3 my-auto flex justify-center items-center cursor-pointer"
//    variants={navButtonsVar}
//    initial="init"
//    whileHover="hover"
//    transition={navButtonsVar.transition}
//    onClick={() => swapRightState('messages')}
//>
//    <button className="w-full" style={rightStyles["messages"]}>Messages</button>
//</motion.div>
