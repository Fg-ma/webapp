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

    const handleLogin = () => {
        // Implement your login logic here (e.g., API call)
        // If login is successful, setLoggedIn(true)
        // Otherwise, display an error message
        // You may use a state variable to handle the login status
    };

    if (!isLoggedIn) {
        return <LoginScreen onLogin={handleLogin} />;
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