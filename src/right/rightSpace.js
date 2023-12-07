import React from "react";
import { useSelector } from "react-redux";
import "./rightSpace.css";
import RightSearchBar from "./RightSearchBar";
import RightNav from "./RightNav";
import NewsCards from "./content/NewsCards";
import ExploreCards from "./content/ExploreCard";

export default function RightSpace() {
    const rightPage = useSelector(state => state.rightNav.rightPage);

    const renderContent = () => {
        switch (rightPage) {
            case "news":
                return <NewsCards />;
            case "explore":
                return <ExploreCards />;
            case "messages":
                return <p>Content for messages</p>;
            case "dogEars":
                return <p>Content for Dog-Ears</p>
            default:
                return <NewsCards />
        }
    };

    return (
        <div id="rightSpace" className="rounded-xl overflow-hidden h-4/5">
            <RightNav />
            <div id="rightSpaceContentContainer" style={{ height: `calc(100% - 7rem)` }}>
                {renderContent()}
            </div>
            <RightSearchBar />
        </div>
    )
}