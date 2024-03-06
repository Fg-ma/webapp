import React, { useRef } from "react";
import { useSelector } from "react-redux";
import LeftSpace from "./left/LeftSpace";
import MiddleSpace from "./middle/MiddleSpace";
import RightSpace from "./right/RightSpace";
import PageNav from "./middle/PageNav";
import LoginScreen from "./LoginScreen";
import CreateAccountScreen from "./CreateAccountScreen";
import "./app.css";
import "./scrollbar.css";
import "./filterSwitches.css";
import { AffiliateContextProvider } from "./middle/pages/entityPage/header/AffiliateContext";
import { PinnedProvider } from "./middle/pages/entityPage/content/PinnedContext";

interface LoginState {
  page: {
    login: {
      pagePayload: {
        pageState: string;
        isLoggedIn: boolean;
      };
    };
  };
}

export default function App() {
  /* 
    Description:   
      Container for everything that happens on the page split into left, right, and middle sections.
    Unique Properties:
      It is simplest to prop drill middleSpaceContainerRef down to MiddleSearchBar 
      so it can reference its width and set its own width to be 80% of that.
  */

  const isLoggedIn = useSelector(
    (state: LoginState) => state.page.login.pagePayload.isLoggedIn,
  );
  const loginPageState = useSelector(
    (state: LoginState) => state.page.login.pagePayload.pageState,
  );
  const middleSpaceContainerRef = useRef<HTMLDivElement>(null);

  if (!isLoggedIn) {
    switch (loginPageState) {
      case "login":
        return <LoginScreen />;
      case "createAccount":
        return <CreateAccountScreen />;
    }
  }

  return (
    <PinnedProvider>
      <AffiliateContextProvider>
        <div id="base" className="h-screen w-screen">
          <div
            id="pageSpace"
            className="flex justify-between mx-12 mt-16 h-full"
          >
            <LeftSpace />

            <div
              ref={middleSpaceContainerRef}
              style={{ width: "45%", minWidth: "45%", maxWidth: "45%" }}
            >
              <MiddleSpace middleSpaceContainerRef={middleSpaceContainerRef} />
              <PageNav />
            </div>

            <RightSpace />
          </div>
        </div>
      </AffiliateContextProvider>
    </PinnedProvider>
  );
}
