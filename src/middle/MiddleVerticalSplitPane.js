import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import RelatedIssuesHeader from "./content/RelatedIssuesHeader";
import RelatedIssues from "./content/RelatedIssues";
import { toggleDrop } from "../redux/filters/filterActions";

export default function MiddleVerticalSplitPane() {
    
    /* 
        Description:   
            Creates 3 panes of which the top and bottom are used to display context
            (articles/news issues(most of the time) and recommendations respectively).
            The middle panel is a dragable panel that resizes the top and bottom panes,
            importantly this middle pane can be any div(the contents of which dont matter).
        Unique Properties:
            Depending on the height that the middle pane is dragged to the bg-color changes
            from regular lightness fg-primary at the bottom to a lighter fg-primary at the top.
    */

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

    useEffect(() => {
        const initialHeight = parseFloat(paneHeight) || 0;
    
        let initialLightness = getLightness(initialHeight)
    
        setHeaderLightness(initialLightness);
    }, []);

    const togglePaneHeight = () => {
        const newHeight = parseFloat(paneHeight) < 100 ? '100%' : '79%';
        
        setPaneHeight(newHeight);
    
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