import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { IndexedDBProvider } from "./src/context/IDBContext";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <IndexedDBProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </IndexedDBProvider>,
);
