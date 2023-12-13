import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RecHeader from "./content/RecHeader";
import IndividualCards from "./content/IndividualCards";
import GroupCards from "./content/GroupCards";
import OrganizationCards from "./content/OrganizationCards";
import IndividualRecs from "./content/IndividualRecs";
import GroupRecs from "./content/GroupRecs";
import OrganizationRecs from "./content/OrganizationRecs";


export default function LeftVerticalSplitPane() {
    const leftPage = useSelector(state => state.page.leftPagePayload.leftPageState);

    const [isResizing, setIsResizing] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState(0);
    const [initialPaneHeight, setInitialPaneHeight] = useState(0);
    const [paneHeight, setPaneHeight] = useState('60%');
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
        const newHeight = parseFloat(paneHeight) < 100 ? '100%' : '60%';
        
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

    const renderContent = () => {
        switch (leftPage) {
            case "individuals":
                return <IndividualCards />;
            case "groups":
                return <GroupCards />;
            case "organizations":
                return <OrganizationCards />;
            default:
                return <IndividualCards />;
        }
    };

    const renderRecs = () => {
        switch (leftPage) {
            case "individuals":
                return <IndividualRecs />;
            case "groups":
                return <GroupRecs />;
            case "organizations":
                return <OrganizationRecs />;
            default:
                return <IndividualRecs />;
        }
    };

    return (
        <div className="leftVerticalSplitPane">
            <div className="leftPane" style={{ height: paneHeight }}>
                {renderContent()}
            </div>
            <div className="leftResizer" onMouseDown={handleMouseDown} onTouchStart={(e) => handleTouchStart(e)}>
                <RecHeader lightness={headerLightness} togglePaneHeight={togglePaneHeight} />
            </div>
            <div id="leftBottomPane" className="leftPane" style={{ height: `calc(100% - ${paneHeight} - 2.25rem)` }}>
                {renderRecs()}
            </div>
        </div>
  );
};