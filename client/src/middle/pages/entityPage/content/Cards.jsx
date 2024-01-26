import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { motion } from "framer-motion";
import config from "@config";
import { setIds, setPageState } from "../../../../redux/pageState/pageStateActions";

const isDevelopment = process.env.NODE_ENV === "development";
const apiUrl = isDevelopment ? config.development.apiUrl : config.production.apiUrl;

/* 
    Description:   
        Creates all article, video, and image cards used on proile pages
    Unique Properties:
        N/A
*/

export function Sheet({ type, sheet_id, author_id, pinned = 0, relation_id, socket }) {

    const dispatch = useDispatch();

    const [sheetData, setSheetData] = useState([]);
    const [hover, setHover] = useState(false);
    const isAuthor = useRef(null);

    // Gets sheet data from a given sheet_id
    useEffect(() => {
        Axios.get(`${apiUrl}/sheets/${sheet_id}`).then((response) => {
            setSheetData(response.data);
        });
    }, [sheet_id]);

    // Checks if the entity is the author of the sheet
    if (sheetData[0] && sheetData[0].sheet_author_id === author_id) {
        isAuthor.current = true;
    };

    // Toggles if a sheet is pinned by updating the db and then emitting togglePinned to the socket
    const togglePinned = () => {
        let newPinned;
        let date_pinned;
        if (pinned) {
            newPinned = 0;
            date_pinned = null;
        } else {
            newPinned = 1;
            const currentDate = new Date();
            date_pinned = `${currentDate.toISOString().slice(0, 19).replace("T", " ")}`;
        }

        if (type === "collection") {
            Axios.put(
                `${apiUrl}/collections/collections_sheets_pinned`,
                {
                    relation_id: relation_id,
                    pinned: newPinned,
                    date_pinned: date_pinned,
                }
            );
        } else if (type === "entity") {
            Axios.put(
                `${apiUrl}/entities/entity_sheets_pinned`,
                {
                    relation_id: relation_id,
                    pinned: newPinned,
                    date_pinned: date_pinned,
                }
            );
        };

        socket.emit("togglePinned", "sheet", relation_id, newPinned, date_pinned);
    };

    const handleClick = () => {
        dispatch(setPageState('main', 'sheets'));
        dispatch(setIds('main', 'sheet_id', sheet_id));
    };

    return (
        <div className="shadow-md rounded flex flex-col justify-center" onClick={handleClick}>
            <div className="bg-fg-white-85 w-3/4 aspect-square rounded-md mx-auto mt-5 mb-3 relative">
                <button 
                    className="w-8 aspect-square absolute -top-2.5 -right-2.5 bg-cover bg-no-repeat rotate-45 focus:outline-none"
                    style={{
                        backgroundImage: pinned || hover ? 'url("/assets/icons/pin.svg")' : 'none',
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePinned();
                    }}
                    onMouseEnter={() => {setHover(true)}}
                    onMouseLeave={() => {setHover(false)}}
                >
                </button>
            </div>
            {sheetData[0] && 
                <p className="text-base font-bold leading-5 text-center mx-4 h-[3.75rem] line-clamp-3 mb-1">
                    {sheetData[0].sheet_title}
                </p>
            }
            <p className="text-sm font-K2D text-center mb-3">{isAuthor.current ? "Creator" : "Responseded to"}</p>
        </div>
    );
};

export function Video({ type, video_id, pinned = 0, relation_id, socket }) {

    const dispatch = useDispatch();

    const [videoData, setVideoData] = useState([]);
    const [hover, setHover] = useState(false);

    // Gets video data from a given video_id
    useEffect(() => {
        Axios.get(`${apiUrl}/videos/${video_id}`).then((response) => {
            setVideoData(response.data);
        });
    }, [video_id]);

    // Toggles if a video is pinned by updating the db and then emitting togglePinned to the socket
    const togglePinned = () => {
        let newPinned;
        let date_pinned;
        if (pinned) {
            newPinned = 0;
            date_pinned = null;
        } else {
            newPinned = 1;
            const currentDate = new Date();
            date_pinned = `${currentDate.toISOString().slice(0, 19).replace("T", " ")}`;
        }

        if (type === "collection") {
            Axios.put(
                `${apiUrl}/collections/collections_videos_pinned`,
                {
                    relation_id: relation_id,
                    pinned: newPinned,
                    date_pinned: date_pinned,
                }
            );
        } else if (type === "entity") {
            Axios.put(
                `${apiUrl}/entities/entity_videos_pinned`,
                {
                    relation_id: relation_id,
                    pinned: newPinned,
                    date_pinned: date_pinned,
                }
            );
        };

        socket.emit("togglePinned", "video", relation_id, newPinned, date_pinned);
    };

    const handleClick = () => {
        dispatch(setPageState('main', 'videos'));
        dispatch(setIds('main', 'video_id', video_id));
    };

    return (
        <div className="flex flex-col justify-center" onClick={handleClick}>
            <div className="bg-fg-white-85 w-full aspect-video rounded mx-auto mb-3 relative">
                <button 
                    className="w-8 aspect-square absolute -top-2.5 -right-2.5 bg-cover bg-no-repeat rotate-45 focus:outline-none"
                    style={{
                        backgroundImage: pinned || hover ? 'url("/assets/icons/pin.svg")' : 'none',
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePinned();
                    }}
                    onMouseEnter={() => {setHover(true)}}
                    onMouseLeave={() => {setHover(false)}}
                >
                </button>
            </div>
            <div className="flex justify-start items-center mb-2">
                <div className="bg-fg-white-85 w-8 aspect-square rounded-full"></div>
                {videoData[0] && 
                    <p 
                        className="text-sm font-bold leading-4 text-left h-[2] line-clamp-2 ml-2" 
                        style={{ width: 'calc(100% - 2.5rem)' }}
                    >
                        {videoData[0].video_title}
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

export function Image({ type, image_id, pinned = 0, relation_id, socket }) {

    const dispatch = useDispatch();

    const [imageData, setImageData] = useState([]);
    const [popupContent, setPopupContent] = useState(null);
    const [showCreator, setShowCreator] = useState(false);
    const primaryHoverTimeout = useRef(null);
    const secondaryHoverTimeout = useRef(null);
    const mousePosition = useRef(null);
    const [pinHover, setPinHover] = useState(false);

    // Gets image data from a given image_id
    useEffect(() => {
        Axios.get(`${apiUrl}/images/${image_id}`).then((response) => {
            setImageData(response.data);
        });
    }, [image_id]);

    // Toggles if a image is pinned by updating the db and then emitting togglePinned to the socket
    const togglePinned = () => {
        let newPinned;
        let date_pinned;
        if (pinned) {
            newPinned = 0;
            date_pinned = null;
        } else {
            newPinned = 1;
            const currentDate = new Date();
            date_pinned = `${currentDate.toISOString().slice(0, 19).replace("T", " ")}`;
        }

        if (type === "collection") {
            Axios.put(
                `${apiUrl}/collections/collections_images_pinned`,
                {
                    relation_id: relation_id,
                    pinned: newPinned,
                    date_pinned: date_pinned,
                }
            );
        } else if (type === "entity") {
            Axios.put(
                `${apiUrl}/entities/entity_images_pinned`,
                {
                    relation_id: relation_id,
                    pinned: newPinned,
                    date_pinned: date_pinned,
                }
            );
        };

        socket.emit("togglePinned", "image", relation_id, newPinned, date_pinned);
    };

    const showPopup = () => {
        if (imageData[0]) {
            setPopupContent(
                <div className="p-3 absolute bg-white drop-shadow-md rounded w-max max-w-xs">
                    <p className="text-lg font-bold line-clamp-2">{imageData[0].image_title}</p> 
                    <p className="text-base font-K2D line-clamp-4">{imageData[0].image_description}</p>
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

    const handleClick = () => {
        dispatch(setPageState('main', 'images'));
        dispatch(setIds('main', 'image_id', image_id));
    };

    return (
        <div className="flex flex-col justify-center" onClick={handleClick}>
            <div 
                className="bg-fg-white-85 w-full aspect-square rounded mb-3 relative"
                style={{ width: 'calc(100% - 1rem)'}}
                onMouseEnter={(e) => startHoverTimer(e)} 
                onMouseLeave={() => cancelHoverTimer()} 
                onMouseMove={(e) => {updateMousePosition(e); updatePopupPosition(e)}}
            >
                <button 
                    className="w-8 aspect-square absolute -top-2.5 -right-2.5 bg-cover bg-no-repeat rotate-45 focus:outline-none"
                    style={{
                        backgroundImage: pinned || pinHover ? 'url("/assets/icons/pin.svg")' : 'none',
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePinned();
                    }}
                    onMouseEnter={() => {setPinHover(true)}}
                    onMouseLeave={() => {setPinHover(false)}}
                >
                </button>
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