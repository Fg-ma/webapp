import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import IndividualsPage from "./pages/IndividualsPage";
import "./middleSpace.css";

export default function MiddleSpace({ middleSpaceContainerRef }) {

    /* 
    
        Description:   
            Container for everything that happens in the middle space section including 
            MiddleDrop and MiddleVerticalSplitPane.
        Unique Properties:
            N/A
    */

    const middleSpaceRef = useRef(null);
    const mainPageState = useSelector((state) => state.page.main.pagePayload.pageState);
    
    return (
        <div ref={middleSpaceRef} id="middleSpace" className="rounded-xl h-4/5 w-full relative drop-shadow-md">
            {mainPageState === "home" && 
                <HomePage middleSpaceContainerRef={middleSpaceContainerRef} middleSpaceRef={middleSpaceRef} />
            }
            {mainPageState === "individuals" && 
                <IndividualsPage />
            }
        </div>
    )
}