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
    const leftPage = useSelector(state => state.leftNav.leftPage);

    const [isResizing, setIsResizing] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState(0);
    const [initialPaneHeight, setInitialPaneHeight] = useState(0);
    const [paneHeight, setPaneHeight] = useState('60%');

    const handleMouseMove = (event) => {
        if (isResizing) {
            const containerHeight = document.getElementById("leftSpaceContentContainer").offsetHeight;
            const mouseY = event.clientY;
            const mouseYDelta = mouseY - initialMousePosition;

            // Adjust the speed by fiddling with the sensetivity factor
            const sensitivityFactor = 1;
            let newPaneHeight = initialPaneHeight + (mouseYDelta / containerHeight) * 100 * sensitivityFactor;

            // Cap the newPaneHeight to a maximum value
            const maxPaneHeight = 100;
            newPaneHeight = Math.min(newPaneHeight, maxPaneHeight);

            const minPaneHeight = 15;
            newPaneHeight = Math.max(newPaneHeight, minPaneHeight);

            setPaneHeight(`${newPaneHeight}%`);
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    const handleMouseDown = (event) => {
        setIsResizing(true);
        setInitialMousePosition(event.clientY);
        setInitialPaneHeight(parseFloat(paneHeight) || 0);
    };

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
        <div className="vertical-split-pane">
            <div className="pane" style={{ height: paneHeight }}>
                {renderContent()}
            </div>
            <div className="resizer" onMouseDown={handleMouseDown}>
                <RecHeader />
            </div>
            <div className="pane" style={{ height: `calc(100% - ${paneHeight} - 2.25rem)` }}>
                {renderRecs()}
            </div>
        </div>
  );
};