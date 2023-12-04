import React from "react";
import LeftSpace from "./left/LeftSpace";
import MiddleSpace from "./middle/MiddleSpace";
import RightSpace from "./right/RightSpace";
import PageNav from "./middle/PageNav";
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