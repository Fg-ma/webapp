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
import { RightState, MainState, MessagesState } from "@FgTypes/rightTypes";
import Conversations from "./content/Conversations";
import Contacts from "./content/Contacts";

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
  const messagesPage = useSelector(
    (state: MessagesState) => state.page.messages.pagePayload.pageState,
  );
  const mainPageState = useSelector(
    (state: MainState) => state.page.main.pagePayload.pageState,
  );

  const renderContent = () => {
    if (mainPageState !== "messages") {
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
    } else if (mainPageState === "messages") {
      switch (messagesPage) {
        case "conversations":
          return <Conversations />;
        case "contacts":
          return <Contacts />;
      }
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
      <RightNav mainPageState={mainPageState} />
      <div
        className="overflow-auto"
        style={{ height: `calc(100% - 7rem)`, scrollbarGutter: "stable" }}
      >
        {renderContent()}
      </div>
      <RightSearchBar
        page={rightPage}
        isFilter={mainPageState !== "messages" ? true : false}
      />
    </div>
  );
}
