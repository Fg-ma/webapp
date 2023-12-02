import React from "react";
import LeftSpace from "./leftSpace";
import './app.css';
import "./scrollbar.css";


import { useState, useEffect } from 'react';

const CustomVerticalSplitPane = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState(0);
  const [initialPaneHeight, setInitialPaneHeight] = useState(0);
  const [paneHeight, setPaneHeight] = useState('50%');

  const handleMouseMove = (event) => {
    if (isResizing) {
      const containerHeight = document.body.clientHeight;
      const mouseY = event.clientY;
      const mouseYDelta = mouseY - initialMousePosition;

      // Adjust the speed by multiplying the delta by a factor (e.g., 2)
      const sensitivityFactor = 2;
      const newPaneHeight = `${initialPaneHeight + (mouseYDelta / containerHeight) * 100 * sensitivityFactor}%`;
      setPaneHeight(newPaneHeight);
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
    <div className="custom-vertical-split-pane">
      <div className="custom-pane" style={{ height: paneHeight }}>
        Top Pane Content
      </div>
      <div className="custom-resizer" onMouseDown={handleMouseDown}>
      </div>
      <div className="custom-pane" style={{ height: `calc(100% - ${paneHeight})` }}>
        Bottom Pane Content
      </div>
    </div>
  );
};

const App = () =>{
    return (
        <div id="base" className="h-screen">
            <div id="pageSpace" className="flex space-x-14 mx-12 my-16 h-4/5">
                
                <LeftSpace />

                <div id="middleSpace" className="rounded-xl">
                    <div id="searchBar">
                        <p>Search Bar</p>
                    </div>
                    <div id="pages">
                        <p>Pages</p>
                    </div>
                    <div id="relatedIssuesSpace">
                        <p>Related Issues</p>
                    </div>
                </div>

                <div id="rightSpace" className="rounded-xl">
                    <div id="rightSelectionBarSpace">
                        <p>Hot News/Explore</p>
                    </div>
                    <div id="rightContentSpace">
                        <CustomVerticalSplitPane></CustomVerticalSplitPane>
                    </div>
                </div>
            </div>
            <div id="navbar">
                <p>navbar</p>
            </div>
        </div>
    )
}

export default App