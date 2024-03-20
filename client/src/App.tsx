import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSocketContext } from "./context/LiveUpdatesContext";
import LeftSpace from "./left/LeftSpace";
import MiddleSpace from "./middle/MiddleSpace";
import RightSpace from "./right/RightSpace";
import PageNav from "./middle/PageNav";
import LoginScreen from "./LoginScreen";
import CreateAccountScreen from "./CreateAccountScreen";
import "./app.css";
import "./scrollbar.css";
import "./filterSwitches.css";

import { AffiliateContextProvider } from "@context/AffiliateContext";
import { PinnedProvider } from "@context/PinnedContext";
import { LastMessageContextProvider } from "@context/LastMessageContext";
import { LiveUpdatesSocketProvider } from "@context/LiveUpdatesContext";
import { IndexedDBProvider } from "@context/IDBContext";
import { useIndexedDBContext } from "@context/IDBContext";

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

  const { clearAllIndexedDBData } = useIndexedDBContext();
  const { liveUpdatesSocket } = useSocketContext();
  const isLoggedIn = useSelector(
    (state: LoginState) => state.page.login.pagePayload.isLoggedIn,
  );
  const loginPageState = useSelector(
    (state: LoginState) => state.page.login.pagePayload.pageState,
  );
  const middleSpaceContainerRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    clearAllIndexedDBData();
  }, [token]);

  useEffect(() => {
    if (!token) {
      return;
    }

    liveUpdatesSocket?.emit("joinSession", token);

    return () => {
      liveUpdatesSocket?.emit("leaveSession", token);
    };
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    switch (loginPageState) {
      case "login":
        return <LoginScreen />;
      case "createAccount":
        return <CreateAccountScreen />;
    }
  }

  return (
    <LiveUpdatesSocketProvider>
      <LastMessageContextProvider>
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
                  <MiddleSpace
                    middleSpaceContainerRef={middleSpaceContainerRef}
                  />
                  <PageNav />
                </div>

                <RightSpace />
              </div>
            </div>
          </AffiliateContextProvider>
        </PinnedProvider>
      </LastMessageContextProvider>
    </LiveUpdatesSocketProvider>
  );
}
