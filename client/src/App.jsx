import React, { useRef } from "react";
import LeftSpace from "./left/LeftSpace";
import MiddleSpace from "./middle/MiddleSpace";
import RightSpace from "./right/RightSpace";
import PageNav from "./middle/PageNav";
import './app.css';
import './scrollbar.css';
import './filterSwitches.css'

const App = () => {

    /* 
        Description:   
            Container for everything that happens on the page split into left, right, and middle sections.
        Unique Properties:
            It is simplest to prop drill middleSpaceContainerRef down to MiddleSearchBar 
            so it can reference its width and set its own width to be 80% of that.
    */

    const middleSpaceContainerRef = useRef(null);

    return (
        <div id="base" className="h-screen">
            <div id="pageSpace" className="flex space-x-14 mx-12 mt-16 h-full">
                
                <LeftSpace />

                <div ref={middleSpaceContainerRef} style={{width: "48%"}}>
                    <MiddleSpace middleSpaceContainerRef={middleSpaceContainerRef} />
                    <PageNav />
                </div>

                <RightSpace />
            </div>
        </div>
    )
}

export default App