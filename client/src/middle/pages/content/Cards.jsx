import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

/* 
    Description:   
        Creates all article, video, and image cards used on proile pages
    Unique Properties:
        N/A
*/

export function Sheet({ sheet_id, entity_id}) {

    const [sheet, setSheet] = useState([]);
    const isAuthor = useRef(null);

    useEffect(() => {
        Axios.get(`http://localhost:5042/sheet/${sheet_id}`).then((response) => {
            setSheet(response.data);
        });
    }, [sheet_id]);

    if (sheet[0] && sheet[0].sheet_author_id === entity_id) {
        isAuthor.current = true;
    };

    return (
        <div className="shadow-md rounded flex flex-col justify-center">
            <div className="bg-fg-white-85 w-3/4 aspect-square rounded-md mx-auto mt-5 mb-3"></div>
            {sheet[0] && 
                <p className="text-base font-bold leading-5 text-center mx-4 h-[3.75rem] line-clamp-3 mb-1">
                    {sheet[0].sheet_title}
                </p>
            }
            <p className="text-sm font-K2D text-center mb-3">{isAuthor.current ? "Creator" : "Responseded to"}</p>
        </div>
    );
};

export function Video({ video_id }) {

    const [video, setVideo] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5042/video/${video_id}`).then((response) => {
            setVideo(response.data);
        });
    }, [video_id]);

    return (
        <div className="flex flex-col justify-center">
            <div className="bg-fg-white-85 w-full aspect-video rounded mx-auto mb-3"></div>
            <div className="flex justify-start items-center mb-2">
                <div className="bg-fg-white-85 w-8 aspect-square rounded-full"></div>
                {video[0] && 
                    <p 
                        className="text-sm font-bold leading-4 text-left h-[2] line-clamp-2 ml-2" 
                        style={{ width: 'calc(100% - 2.5rem)' }}
                    >
                        {video[0].video_title}
                    </p>
                }
            </div>
        </div>
    );
};

const popupContentVar = {
    init: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    transition: {
        duration: 0.25,
        ease: "easeOut",
    },
};

const profileVar = {
    init: {
        opacity: 0.6,
        scale: 0.9,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
    transition: {
        duration: 0.25,
        ease: "easeOut",
    },
};

export function Image({ image_id }) {

    const [image, setImage] = useState([]);
    const [popupContent, setPopupContent] = useState(null);
    const [showCreator, setShowCreator] = useState(false);
    const primaryHoverTimeout = useRef(null);
    const secondaryHoverTimeout = useRef(null);
    const mousePosition = useRef(null);

    useEffect(() => {
        Axios.get(`http://localhost:5042/image/${image_id}`).then((response) => {
            setImage(response.data);
        });
    }, [image_id]);

    const showPopup = () => {
        if (image[0]) {
            setPopupContent(
                <div className="p-3 absolute bg-white drop-shadow-md rounded w-max max-w-xs">
                    <p className="text-lg font-bold line-clamp-2">{image[0].image_title}</p> 
                    <p className="text-base font-K2D line-clamp-4">{image[0].image_description}</p>
                </div>
            );
        };
    };

    const startHoverTimer = (e) => {
        mousePosition.current = ({ x: `${e.clientX - 535}px`, y: `${e.clientY - 50}px` });
        primaryHoverTimeout.current = setTimeout(() => {
            showPopup(); updatePopupPosition(e);
        }, 3000);
        secondaryHoverTimeout.current = setTimeout(() => {
            setShowCreator(true);
        }, 1000)
    };

    const updateMousePosition = (e) => {
        mousePosition.current = ({ x: `${e.clientX - 535}px`, y: `${e.clientY - 50}px` });
    }

    const updatePopupPosition = (e) => {
        setPopupContent(prevPopupContent => {
            if (prevPopupContent) {
                return (
                    <div className="p-3 absolute bg-white drop-shadow-md rounded w-max max-w-xs" style={{ top: mousePosition.current.y, left: mousePosition.current.x }}>
                        {prevPopupContent.props.children}
                    </div>
                );
            }
            return null;
        });
    };

    const cancelHoverTimer = () => {
        if (primaryHoverTimeout.current) {
            clearTimeout(primaryHoverTimeout.current);
        };
        if (secondaryHoverTimeout.current) {
            clearTimeout(secondaryHoverTimeout.current);
        };
        setShowCreator(false);
        setPopupContent(null);
    };

    return (
        <div className="flex flex-col justify-center">
            <div 
                className="bg-fg-white-85 w-full aspect-square rounded mb-3 relative mx-2"
                style={{ width: 'calc(100% - 1rem)'}}
                onMouseEnter={(e) => startHoverTimer(e)} 
                onMouseLeave={() => cancelHoverTimer()} 
                onMouseMove={(e) => {updateMousePosition(e); updatePopupPosition(e)}}
            >
                {showCreator && 
                    <motion.div 
                        className="bg-fg-white-95 w-10 aspect-square rounded-full absolute -top-3 -left-3"
                        variants={profileVar}
                        initial="init"
                        animate="animate"
                        transition="transition"
                    >
                    </motion.div>
                }
            </div>
            {popupContent && (
                <motion.div
                    className="z-50"
                    variants={popupContentVar}
                    initial="init"
                    animate="animate"
                    transition="transition"
                >
                    {popupContent}
                </motion.div>
            )}
        </div>
    );
};