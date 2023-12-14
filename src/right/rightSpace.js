import React from "react";
import { useSelector } from "react-redux";
import "./rightSpace.css";
import RightSearchBar from "./RightSearchBar";
import RightNav from "./RightNav";
import NewsCards from "./content/NewsCards";
import ExploreCards from "./content/ExploreCards";
import MessagesCards from "./content/MessagesCards";
import DogEarCards from "./content/DogEarCards";

export default function RightSpace() {
    const rightPage = useSelector(state => state.page.rightPagePayload.rightPageState);

    const renderContent = () => {
        switch (rightPage) {
            case "news":
                return <NewsCards />;
            case "explore":
                return <ExploreCards />;
            case "messages":
                return <MessagesCards />;
            case "dogEars":
                return <DogEarCards />
            default:
                return <NewsCards />
        }
    };

    return (
        <div id="rightSpace" className="rounded-xl overflow-hidden h-4/5 shadow-md">
            <RightNav />
            <div id="rightSpaceContentContainer" style={{ height: `calc(100% - 7rem)` }}>
                {renderContent()}
            </div>
            <RightSearchBar />
        </div>
    )
}