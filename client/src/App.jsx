import React, { useState, useRef } from "react";
import LeftSpace from "./left/LeftSpace";
import MiddleSpace from "./middle/MiddleSpace";
import RightSpace from "./right/RightSpace";
import PageNav from "./middle/PageNav";
import LoginScreen from "./LoginScreen";
import './app.css';
import './scrollbar.css';
import './filterSwitches.css'

export default function App() {

    /* 
        Description:   
            Container for everything that happens on the page split into left, right, and middle sections.
        Unique Properties:
            It is simplest to prop drill middleSpaceContainerRef down to MiddleSearchBar 
            so it can reference its width and set its own width to be 80% of that.
    */

    const [isLoggedIn, setLoggedIn] = useState(false);
    const middleSpaceContainerRef = useRef(null);

    if (!isLoggedIn) {
        return <LoginScreen />;
    };

    return (
        <div id="base" className="h-screen w-screen">
            <div id="pageSpace" className="flex justify-between mx-12 mt-16 h-full">
                
                <LeftSpace />

                <div ref={middleSpaceContainerRef} style={{ width: "45%", minWidth: "45%", maxWidth: "45%" }}>
                    <MiddleSpace middleSpaceContainerRef={middleSpaceContainerRef} />
                    <PageNav />
                </div>

                <RightSpace />
            </div>
        </div>
    )
};