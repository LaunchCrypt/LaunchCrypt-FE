import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";import "./index.css";
import { INFURA_API_KEY } from "./constant";
import { MetaMaskProvider } from "@metamask/sdk-react";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "LaunchCrypt",
          url: window.location.href,
        },
        infuraAPIKey: INFURA_API_KEY,
      }}>
      <RouterProvider router={router} />
    </MetaMaskProvider>
  </React.StrictMode>
);















