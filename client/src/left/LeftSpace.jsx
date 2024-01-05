import React from "react";
import "./leftSpace.css";
import LeftVerticalSplitPane from "./LeftVerticalSplitPane";
import LeftNav from "./LeftNav";

export default function LeftSpace() {

    /* 
        Description:   
            Container for everything that happens in the left space section including 
            LeftNav and LeftVerticalSplitPane.
        Unique Properties:
            N/A
    */
   
    return (
        <div className="bg-fg-white-95 rounded-xl overflow-hidden h-4/5" style={{ width: "26%", boxShadow: '0px 8px 8px -4px rgba(0, 0, 0, 0.1), 0 6px 6px -4px rgba(0, 0, 0, 0.06)' }}>
            <LeftNav />
            <div id="leftSpaceContentContainer" style={{ height: `calc(100% - 3rem)` }}>
                <LeftVerticalSplitPane />
            </div>
        </div>
    )
}