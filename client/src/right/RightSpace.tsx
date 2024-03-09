import React from "react";
import { useSelector } from "react-redux";
import "./rightSpace.css";
import RightSearchBar from "./search/RightSearchBar";
import RightNav from "./RightNav";
import NewsCards from "./content/NewsCards";
import ExploreCards from "./content/ExploreCards";
import MessagesCards from "./content/MessagesCards";
import DogEarCards from "./content/DogEarCards";
import PapersCards from "./content/PapersCards";
import { RightState } from "@FgTypes/rightTypes";

export default function RightSpace() {
  /* 
    Description:   
      Container for everything that happens in the right space section including 
      RightNav, RightSearchBar, conditionally rendered content.
    Unique Properties:
      N/A
  */

  const rightPage = useSelector(
    (state: RightState) => state.page.right.pagePayload.pageState,
  );

  const renderContent = () => {
    switch (rightPage) {
      case "papers":
        return <PapersCards />;
      case "news":
        return <NewsCards />;
      case "explore":
        return <ExploreCards />;
      case "messages":
        return <MessagesCards />;
      case "dogEars":
        return <DogEarCards />;
      default:
        return <NewsCards />;
    }
  };

  return (
    <div
      className="bg-fg-white-95 rounded-xl overflow-hidden h-4/5"
      style={{
        width: "24.5%",
        minWidth: "24.5%",
        maxWidth: "24.5%",
        boxShadow:
          "0px 8px 8px -4px rgba(0, 0, 0, 0.1), 0 6px 6px -4px rgba(0, 0, 0, 0.06)",
      }}
    >
      <RightNav />
      <div
        className="mr-3 overflow-auto"
        style={{ height: `calc(100% - 7rem)` }}
      >
        {renderContent()}
      </div>
      <RightSearchBar page={rightPage} />
    </div>
  );
}
