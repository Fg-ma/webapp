import React, { useState, useEffect } from "react";
import RelatedIssuesHeader from "./content/RelatedIssuesHeader";
import RelatedIssues from "./content/RelatedIssues";
import SheetViewer from "../components/viewers/SheetViewer";
import Axios from "axios";

export default function MiddleVerticalSplitPane() {
    const [isResizing, setIsResizing] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState(0);
    const [initialPaneHeight, setInitialPaneHeight] = useState(0);
    const [paneHeight, setPaneHeight] = useState("79%");
    const [headerLightness, setHeaderLightness] = useState(80);

    // Handles softly lowering and raising the pane height when togglePaneHeight is called 
    const animateTogglePaneHeight = (targetHeight, duration = 500) => {
        const start = Date.now();
        const initialHeight = parseFloat(paneHeight) || 0;
        
        const animate = () => {
            const now = Date.now();
            const progress = Math.min(1, (now - start) / duration);
            
            const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
            
            const newPaneHeight = initialHeight + (targetHeight - initialHeight) * easedProgress;
            
            setPaneHeight(`${newPaneHeight}%`);
            setHeaderLightness(getLightness(newPaneHeight));
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
      
        requestAnimationFrame(animate);
    };

    const handleMove = (clientY) => {
        if (isResizing) {
            const containerHeight = document.getElementById("leftSpaceContentContainer").offsetHeight;
            const mouseYDelta = clientY - initialMousePosition;
            
            // Adjust the speed by fiddling with the sensitivity factor
            const sensitivityFactor = 1;
            let newPaneHeight = initialPaneHeight + (mouseYDelta / containerHeight) * 100 * sensitivityFactor;
            
            // Cap the newPaneHeight to a max and min value
            const maxPaneHeight = 100;
            newPaneHeight = Math.min(newPaneHeight, maxPaneHeight);
            
            const minPaneHeight = 15;
            newPaneHeight = Math.max(newPaneHeight, minPaneHeight);
            
            setPaneHeight(`${newPaneHeight}%`);
            setHeaderLightness(getLightness(newPaneHeight));
        }
    };

    const handleEnd = () => {
        setIsResizing(false);
    };

    const handleStart = (clientY) => {
        setIsResizing(true);
        setInitialMousePosition(clientY);
        setInitialPaneHeight(parseFloat(paneHeight) || 0);
    };

    const handleMouseMove = (event) => {
        requestAnimationFrame(() => handleMove(event.clientY));
    };

    const handleTouchMove = (event) => {
        requestAnimationFrame(() => handleMove(event.touches[0].clientY));
    };

    const handleMouseUp = () => {
        handleEnd();
    };

    const handleTouchEnd = () => {
         handleEnd();
    };

    // Handles resizing event listeners
    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("touchend", handleTouchEnd);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isResizing]);

    useEffect(() => {
        const initialHeight = parseFloat(paneHeight) || 0;

        let initialLightness = getLightness(initialHeight);

        setHeaderLightness(initialLightness);
    }, []);

    // Controls the toggle pane height controlled by the button in RelatedIssuesHeader
    const togglePaneHeight = () => {
        const newHeight = parseFloat(paneHeight) < 100 ? "100%" : "79%";
        animateTogglePaneHeight(parseFloat(newHeight));
    };

    const getLightness = (height) => {
        let lightness = Math.max(52, 100 - height * 0.75);
        lightness = Math.min(60, lightness);
        return lightness;
    };

    const fileToBlobFunc = (event) => {
        const selectedFile = event.target.files[0];
      
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            
            Axios.put(
                `http://localhost:5042/videos_updating`,
                formData,
                {
                    headers: {
                        'Content-Type': 'image/png',
                    },
                }
            ).then((response) => {}).catch((error) => {
                console.error('Error uploading file:', error);
            });
        };
    };
    
    return (
        <div className="flex flex-col w-full h-full relative">
            <div className="mr-3 overflow-auto box-border" style={{ height: paneHeight }}>
                <div className="ml-8 mr-5 my-8">
                    <SheetViewer sheet_id={Math.floor(Math.random() * 20) + 1} />
                    <input type="file" onChange={fileToBlobFunc} />
                </div>
            </div>
            <div
                className="cursor-ns-resize select-none"
                onMouseDown={(e) => {
                    handleStart(e.clientY);
                }}
                onTouchStart={(e) => {
                    handleStart(e.touches[0].clientY);
                }}
                onMouseUp={handleMouseUp}
                onTouchEnd={handleTouchEnd}
            >
                <RelatedIssuesHeader lightness={headerLightness} togglePaneHeight={togglePaneHeight} />
            </div>
            <div className="overflow-auto box-border bg-fg-white-95" style={{ height: `calc(100% - ${paneHeight} - 2.25rem)` }}>
                <RelatedIssues />
            </div>
        </div>
    );
}