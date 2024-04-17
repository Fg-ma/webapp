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
import { PinnedContextProvider } from "@context/PinnedContext";
import { LastMessageContextProvider } from "@context/LastMessageContext";
import { ContactContextProvider } from "@context/ContactContext";
import { ConversationContextProvider } from "@context/ConversationContext";
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

interface MainState {
  page: {
    main: {
      pagePayload: {
        pageState: string;
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

  const mainPageState = useSelector(
    (state: MainState) => state.page.main.pagePayload.pageState,
  );

  useEffect(() => {
    clearAllIndexedDBData();
  }, [token]);

  useEffect(() => {
    if (!token || !liveUpdatesSocket) {
      return;
    }

    liveUpdatesSocket.emit("joinSession", token);

    return () => {
      liveUpdatesSocket.emit("leaveSession", token);
    };
  }, [isLoggedIn, liveUpdatesSocket]);

  if (!isLoggedIn) {
    switch (loginPageState) {
      case "login":
        return <LoginScreen />;
      case "createAccount":
        return <CreateAccountScreen />;
    }
  }

  return (
    <LastMessageContextProvider>
      <PinnedContextProvider>
        <AffiliateContextProvider>
          <ContactContextProvider>
            <ConversationContextProvider>
              <div id="base" className="h-screen w-screen">
                <div
                  id="pageSpace"
                  className="flex justify-between mx-12 mt-16 h-full"
                >
                  {mainPageState !== "tables" && <LeftSpace />}
                  <div
                    ref={middleSpaceContainerRef}
                    style={{ width: "45%", minWidth: "45%", maxWidth: "45%" }}
                  >
                    {mainPageState !== "tables" && (
                      <>
                        <MiddleSpace
                          middleSpaceContainerRef={middleSpaceContainerRef}
                        />
                        <PageNav />
                      </>
                    )}
                  </div>

                  <div
                    style={{
                      width: "24.5%",
                      minWidth: "24.5%",
                      maxWidth: "24.5%",
                    }}
                  >
                    <RightSpace />
                    {mainPageState === "tables" && <PageNav />}
                  </div>
                </div>
              </div>
            </ConversationContextProvider>
          </ContactContextProvider>
        </AffiliateContextProvider>
      </PinnedContextProvider>
    </LastMessageContextProvider>
  );
}
