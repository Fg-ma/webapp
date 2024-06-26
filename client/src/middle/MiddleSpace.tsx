import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MiddleSpaceProps, MainState } from "@FgTypes/middleTypes";
import HomePage from "./pages/homePage/HomePage";
import EntityPage from "./pages/entityPage/EntityPage";
import ContentPage from "./pages/contentPage/ContentPage";
import "./middleSpace.css";
import MessagesPage from "./pages/messagesPage/MessagesPage";

export default function MiddleSpace({
  middleSpaceContainerRef,
}: MiddleSpaceProps) {
  /* 
    Description:   
      Container for everything that happens in the middle space section including 
      MiddleDrop and MiddleVerticalSplitPane.
    Unique Properties:
      N/A
  */

  const middleSpaceRef = useRef<HTMLDivElement>(null);
  const mainPageState = useSelector(
    (state: MainState) => state.page.main.pagePayload.pageState,
  );
  const [middleSpaceContent, setMiddleSpaceContent] =
    useState<React.JSX.Element | null>(null);

  useEffect(() => {
    if (mainPageState === "home") {
      setMiddleSpaceContent(
        <HomePage
          middleSpaceContainerRef={middleSpaceContainerRef}
          middleSpaceRef={middleSpaceRef}
        />,
      );
    } else if (mainPageState === "individuals" || mainPageState === "profile") {
      setMiddleSpaceContent(<EntityPage entityType={1} />);
    } else if (mainPageState === "groups") {
      setMiddleSpaceContent(<EntityPage entityType={2} />);
    } else if (mainPageState === "organizations") {
      setMiddleSpaceContent(<EntityPage entityType={3} />);
    } else if (mainPageState === "sheets") {
      setMiddleSpaceContent(<ContentPage contentType="sheets" />);
    } else if (mainPageState === "videos") {
      setMiddleSpaceContent(<ContentPage contentType="videos" />);
    } else if (mainPageState === "images") {
      setMiddleSpaceContent(<ContentPage contentType="images" />);
    } else if (mainPageState === "messages") {
      setMiddleSpaceContent(<MessagesPage middleSpaceRef={middleSpaceRef} />);
    }
  }, [mainPageState]);

  return (
    <div
      ref={middleSpaceRef}
      id="middleSpace"
      className="bg-fg-white-95 rounded-md w-full max-w-full relative"
      style={{
        boxShadow:
          "0px 8px 8px -4px rgba(0, 0, 0, 0.1), 0 6px 6px -4px rgba(0, 0, 0, 0.06)",
        height: "85%",
      }}
    >
      {middleSpaceContent}
    </div>
  );
}
