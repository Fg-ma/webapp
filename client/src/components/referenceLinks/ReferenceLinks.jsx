import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

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

export default function ReferenceLinks({ references }) {
    /* 
        Description:   
            Creates a list of refernce links that can be clicked to get redirected to a 
            book or other reference.
        Unique Properties:
            When hovered over for 1.5 seconds it opens a popup that is stuck to the cursor that 
            displays the author, title, and url link.
    */

    const [referencesLinks, setReferencesLinks] = useState(null);
    const [popupContent, setPopupContent] = useState(null);
    const hoverTimeout = useRef(null);
    const mousePosition = useRef(null);

    // Get links for references
    useEffect(() => {
        setReferencesLinks(
            references.map((reference, index) => (
                <div key={reference.reference_id} className='flex'>
                    <a
                        href={reference.url}
                        className='text-fg-secondary underline decoration-2 underline-offset-2'
                        onMouseEnter={(e) => startHoverTimer(e, reference)}
                        onMouseLeave={() => cancelHoverTimer()}
                        onMouseMove={(e) => {
                            updateMousePosition(e);
                            updatePopupPosition(e);
                        }}
                    >
                        "{reference.title}"
                    </a>
                    {index < references.length - 1 && <p>,&nbsp;&nbsp;</p>}
                </div>
            ))
        );
    }, [references]);

    const showPopup = (reference) => {
        setPopupContent(
            <div className='p-3 absolute bg-white drop-shadow-md rounded w-max z-50'>
                <p className='text-lg font-bold'>Title: {reference.title}</p>
                <p className='text-base font-K2D'>Author: {reference.author}</p>
                <p className='text-base font-K2D'>URL: {reference.url}</p>
            </div>
        );
    };

    const startHoverTimer = (e, reference) => {
        mousePosition.current = {
            x: `${e.clientX - 535}px`,
            y: `${e.clientY - 50}px`,
        };
        hoverTimeout.current = setTimeout(() => {
            showPopup(reference);
            updatePopupPosition(e);
        }, 1500);
    };

    const cancelHoverTimer = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
        setPopupContent(null);
    };

    const updateMousePosition = (e) => {
        mousePosition.current = {
            x: `${e.clientX - 535}px`,
            y: `${e.clientY - 50}px`,
        };
    };

    const updatePopupPosition = (e) => {
        setPopupContent((prevPopupContent) => {
            if (prevPopupContent) {
                return (
                    <div
                        className='p-3 absolute bg-white drop-shadow-md rounded w-max z-50'
                        style={{
                            top: mousePosition.current.y,
                            left: mousePosition.current.x,
                        }}
                    >
                        {prevPopupContent.props.children}
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <div>
            {referencesLinks && (
                <div>
                    <div className='text-base font-K2D mt-4 italic flex flex-wrap line-clamp-2'>
                        {referencesLinks}
                    </div>
                    {popupContent && (
                        <motion.div
                            variants={popupContentVar}
                            initial='init'
                            animate='animate'
                            transition='transition'
                        >
                            {popupContent}
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
}
