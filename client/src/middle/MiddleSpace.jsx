import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import EntityPage from "./pages/EntityPage";
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
    const [middleSpaceContent, setMiddleSpaceContent] = useState([])

    useEffect(() => {
        if (mainPageState === "home") {
            setMiddleSpaceContent(<HomePage middleSpaceContainerRef={middleSpaceContainerRef} middleSpaceRef={middleSpaceRef} />);
        } else if (mainPageState === "individuals") {
            setMiddleSpaceContent(<EntityPage entityType="individuals" />);
        } else if (mainPageState === "groups") {
            setMiddleSpaceContent(<EntityPage entityType="groups" />);
        } else if (mainPageState === "organizations") {
            setMiddleSpaceContent(<EntityPage entityType="organizations" />);
        }
    }, [mainPageState]);
    
    return (
        <div ref={middleSpaceRef} id="middleSpace" className="rounded-xl h-4/5 w-full relative" style={{ boxShadow: '0px 8px 8px -4px rgba(0, 0, 0, 0.1), 0 6px 6px -4px rgba(0, 0, 0, 0.06)' }}>
            {middleSpaceContent}
        </div>
    )
}