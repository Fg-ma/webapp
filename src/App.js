import React from "react";
import LeftSpace from "./leftSpace";
import MiddleSpace from "./middleSpace";
import RightSpace from "./rightSpace";
import PageNav from "./pageNav";
import './app.css';
import "./scrollbar.css";

const App = () =>{
    return (
        <div id="base" className="h-screen">
            <div id="pageSpace" className="flex space-x-14 mx-12 mt-16 h-full">
                
                <LeftSpace />

                <div id="middleSpaceContainer">
                    <MiddleSpace />
                    <PageNav />
                </div>

                <RightSpace />
            </div>
        </div>
    )
}

export default App