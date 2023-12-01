import React from "react";
import LeftSpace from "./leftSpace";
import './app.css';
import "./scrollbar.css"
import "./leftSpace.css"

const App = () =>{
    return (
        <div id="base" className="h-screen">
            <div id="pageSpace" className="flex space-x-14 mx-12 my-16 h-4/5">
                <LeftSpace />

                <div id="middleSpace" className="rounded-xl">
                    <div id="searchBar">
                        <p>Search Bar</p>
                    </div>
                    <div id="pages">
                        <p>Pages</p>
                    </div>
                    <div id="relatedIssuesSpace">
                        <p>Related Issues</p>
                    </div>
                </div>

                <div id="rightSpace" className="rounded-xl">
                    <div id="rightSelectionBarSpace">
                        <p>Hot News/Explore</p>
                    </div>
                    <div id="rightContentSpace">
                        <p>Hot News/Explore Content</p>
                    </div>
                </div>
            </div>
            <div id="navbar">
                <p>navbar</p>
            </div>
        </div>
    )
}

export default App