import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";
import { Provider } from "react-redux";
import store from "./src/redux/store.ts";
import { AffiliateContextProvider } from "./src/context/AffiliateContext.tsx";
import { PinnedProvider } from "./src/context/PinnedContext.tsx";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <PinnedProvider>
    <AffiliateContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AffiliateContextProvider>
  </PinnedProvider>,
);
