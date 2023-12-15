import React, { useState, useEffect } from "react";
import RelatedIssuesHeader from "./content/RelatedIssuesHeader";
import RelatedIssues from "./content/RelatedIssues";

export default function MiddleVerticalSplitPane() {
    const [isResizing, setIsResizing] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState(0);
    const [initialPaneHeight, setInitialPaneHeight] = useState(0);
    const [paneHeight, setPaneHeight] = useState('79%');
    const [headerLightness, setHeaderLightness] = useState(80)

    const handleMove = (clientY) => {
        if (isResizing) {
            const containerHeight = document.getElementById("leftSpaceContentContainer").offsetHeight;
            const mouseYDelta = clientY - initialMousePosition;
            
            // Adjust the speed by fiddling with the sensitivity factor
            const sensitivityFactor = 1;
            let newPaneHeight = initialPaneHeight + (mouseYDelta / containerHeight) * 100 * sensitivityFactor;
            
            // Cap the newPaneHeight to a maximum value
            const maxPaneHeight = 100;
            newPaneHeight = Math.min(newPaneHeight, maxPaneHeight);
            
            const minPaneHeight = 15;
            newPaneHeight = Math.max(newPaneHeight, minPaneHeight);
            
            // Calculate lightness based on the percentage of newPaneHeight
            let lightness = getLightness(newPaneHeight);
            
            setPaneHeight(`${newPaneHeight}%`);
            setHeaderLightness(lightness);
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
    
    const handleMouseDown = (event) => {
        handleStart(event.clientY);
    };
    
    const handleTouchStart = (event) => {
        handleStart(event.touches[0].clientY);
    };
    
    const handleMouseMove = (event) => {
        handleMove(event.clientY);
    };
    
    const handleTouchMove = (event) => {
        handleMove(event.touches[0].clientY);
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

    // Gets initial conditions
    useEffect(() => {
        // Get the initial height of the leftPane when the component mounts
        const initialHeight = parseFloat(paneHeight) || 0;
    
        // Set the initial lightness based on the initial height
        let initialLightness = getLightness(initialHeight)
    
        setHeaderLightness(initialLightness);
    }, []);

    const togglePaneHeight = () => {
        // Check if the current pane height is greater than 0
        console.log(parseFloat(paneHeight))
        const newHeight = parseFloat(paneHeight) < 100 ? '100%' : '79%';
        
        // Set the new pane height
        setPaneHeight(newHeight);
    
        // Update lightness based on the new pane height
        let newLightness = getLightness(parseFloat(newHeight))
        setHeaderLightness(newLightness);
    };

    const getLightness = (height) => {
        let lightness = Math.max(52, 100 - (height*.75));
        lightness = Math.min(60, lightness);
        return lightness
    }

    return (
        <div className="middleVerticalSplitPane">
            <div className="middlePane" style={{ height: paneHeight }}>
                hi
            </div>
            <div className="middleResizer" onMouseDown={handleMouseDown} onTouchStart={(e) => handleTouchStart(e)}>
                <RelatedIssuesHeader  lightness={headerLightness} togglePaneHeight={togglePaneHeight} />
            </div>
            <div id="middleBottomPane" className="middlePane" style={{ height: `calc(100% - ${paneHeight} - 2.25rem)` }}>
                <RelatedIssues />
            </div>
        </div>
  );
};