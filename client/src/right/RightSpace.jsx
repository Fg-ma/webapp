import React from "react";
import { useSelector } from "react-redux";
import "./rightSpace.css";
import RightSearchBar from "./search/RightSearchBar";
import RightNav from "./RightNav";
import NewsCards from "./content/NewsCards";
import ExploreCards from "./content/ExploreCards";
import MessagesCards from "./content/MessagesCards";
import DogEarCards from "./content/DogEarCards";

export default function RightSpace() {

    /* 
        Description:   
            Container for everything that happens in the right space section including 
            RightNav, RightSearchBar, conditionally rendered content.
        Unique Properties:
            N/A
    */

    const rightPage = useSelector(state => state.page.right.pagePayload.pageState);

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
        <div className="bg-fg-white-95 rounded-xl overflow-hidden h-4/5 shadow-md" style={{ width: "26%" }}>
            <RightNav />
            <div id="rightSpaceContentContainer" style={{ height: `calc(100% - 7rem)` }}>
                {renderContent()}
            </div>
            <RightSearchBar page={rightPage} />
        </div>
    )
}