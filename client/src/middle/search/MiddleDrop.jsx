import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toggleDrop } from "@redux/filters/filterActions";
import MiddleSearchBar from "./MiddleSearchBar";

const dropButtonVar = {
    init: {
        opacity: 0.9,
        rotateX: 0,
    },
    animate: {
        opacity: 1,
        rotateX: 180,
    },
    transition: {
        duration: 0.45,
        ease: "easeOut",
        opacity: { duration: 0.6, ease: [0.42, 0, 1, 1] },
    },
};

const middleSearchBarVar = {
    init: {
        opacity: 0,
        y: "-2vh",
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    transition: {
        duration: 0.25,
        ease: "easeOut",
        delay: 0.275,
    },
};

export default function MiddleDrop({
    middleSpaceContainerRef,
    middleSpaceRef,
}) {
    /* 
        Description:   
            Creates the arrow button for opening the MiddleSearchBar.
        Unique Properties:
            Fancy stuff done to the drop button and the reveal of the search bar, but done quickly.
    */

    const dispatch = useDispatch();
    const dropped = useSelector((state) => state.filters.middle.isDrop);

    const handleDrop = () => {
        dispatch(toggleDrop("middle", "isDrop"));
    };

    return (
        <div
            id='dropContainer'
            className='flex flex-col justify-center items-center'
        >
            <motion.button
                className='relative h-12 aspect-square bg-225 bg-no-repeat bg-center mb-2'
                style={{ backgroundImage: "url('assets/icons/dropDown.svg')" }}
                variants={dropButtonVar}
                initial='init'
                animate={dropped ? "animate" : "init"}
                transition='transition'
                onClick={handleDrop}
            ></motion.button>
            <AnimatePresence>
                {dropped && (
                    <motion.div
                        variants={middleSearchBarVar}
                        initial='init'
                        animate='animate'
                        exit='init'
                        transition='transition'
                    >
                        <MiddleSearchBar
                            middleSpaceContainerRef={middleSpaceContainerRef}
                            middleSpaceRef={middleSpaceRef}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
