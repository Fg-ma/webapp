import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { IndexedDBProvider } from "./src/context/IDBContext";
import { LiveUpdatesSocketProvider } from "./src/context/LiveUpdatesSocketContext";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <IndexedDBProvider>
    <LiveUpdatesSocketProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </LiveUpdatesSocketProvider>
  </IndexedDBProvider>,
);
