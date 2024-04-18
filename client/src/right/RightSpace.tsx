import React from "react";
import { useSelector } from "react-redux";
import "./rightSpace.css";
import RightSearchBar from "./search/RightSearchBar";
import RightNav from "./RightNav";
import News from "./content/News";
import ExploreCards from "./content/ExploreCards";
import DogEars from "./content/DogEars";
import Papers from "./content/Papers";
import {
  RightState,
  MainState,
  MessagesState,
  MainSecondaryState,
} from "@FgTypes/rightTypes";
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
  const mainSecondaryPageState = useSelector(
    (state: MainSecondaryState) =>
      state.page.main.pagePayload.secondaryPageState,
  );

  const renderContent = () => {
    if (mainPageState !== "messages" && mainSecondaryPageState !== "messages") {
      switch (rightPage) {
        case "papers":
          return <Papers />;
        case "news":
          return <News />;
        case "explore":
          return <ExploreCards />;
        case "dogEars":
          return <DogEars />;
        default:
          return <News />;
      }
    } else if (
      mainPageState === "messages" ||
      mainSecondaryPageState === "messages"
    ) {
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
      className="bg-fg-white-95 rounded-xl overflow-hidden"
      style={{
        boxShadow:
          "0px 8px 8px -4px rgba(0, 0, 0, 0.1), 0 6px 6px -4px rgba(0, 0, 0, 0.06)",
        height: "85%",
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
        page={
          mainPageState !== "messages" && mainSecondaryPageState !== "messages"
            ? rightPage
            : messagesPage
        }
        isFilter={
          mainPageState !== "messages" && mainSecondaryPageState !== "messages"
            ? true
            : false
        }
      />
    </div>
  );
}
