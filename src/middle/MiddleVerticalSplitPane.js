import React, { useState, useEffect } from "react";
import RelatedIssuesHeader from "./content/RelatedIssuesHeader";
import RelatedIssues from "./content/RelatedIssues";

export default function MiddleVerticalSplitPane() {
    const [isResizing, setIsResizing] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState(0);
    const [initialPaneHeight, setInitialPaneHeight] = useState(0);
    const [paneHeight, setPaneHeight] = useState('79%');

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

    return (
        <div className="middleVerticalSplitPane">
            <div className="middlePane" style={{ height: paneHeight }}>
                hi
            </div>
            <div className="middleResizer" onMouseDown={handleMouseDown}>
                <RelatedIssuesHeader />
            </div>
            <div id="middleBottomPane" className="middlePane" style={{ height: `calc(100% - ${paneHeight} - 2.25rem)` }}>
                <RelatedIssues />
            </div>
        </div>
  );
};