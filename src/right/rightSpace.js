import React from "react";
import "./rightSpace.css";
import RightSearchBar from "./RightSearchBar";
import RightNav from "./RightNav";
import NewsCards from "./content/NewsCards";

export default function RightSpace() {
    return (
        <div id="rightSpace" className="rounded-xl overflow-hidden h-4/5">
            <RightNav />
            <div id="rightSpaceContentContainer" style={{ height: `calc(100% - 7rem)` }}>
                <NewsCards />
            </div>
            <RightSearchBar />
        </div>
    )
}