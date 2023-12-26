import React from "react";
import "./middleSpace.css";
import MiddleVerticalSplitPane from "./MiddleVerticalSplitPane";
import MiddleDrop from "./search/MiddleDrop";

export default function MiddleSpace({ middleSpaceContainerRef }) {

    /* 
    
        Description:   
            Container for everything that happens in the middle space section including 
            MiddleDrop and MiddleVerticalSplitPane.
        Unique Properties:
            N/A
    */

    return (
        <div id="middleSpace" className="rounded-xl h-4/5 relative">
            <div className="absolute inset-0 left-1/2 transform -translate-x-1/2 z-10 -top-6 h-fit">
                <MiddleDrop middleSpaceContainerRef={ middleSpaceContainerRef } />
            </div>
            <div className="overflow-hidden rounded-xl h-full w-full">
                <MiddleVerticalSplitPane />
            </div>
        </div>
    )
}