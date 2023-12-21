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
        <div id="leftSpace" className="rounded-xl overflow-hidden h-4/5 drop-shadow-md">
            <LeftNav />
            <div id="leftSpaceContentContainer" style={{ height: `calc(100% - 3rem)` }}>
                <LeftVerticalSplitPane />
            </div>
        </div>
    )
}