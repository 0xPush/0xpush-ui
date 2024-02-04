import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

// Create a new router instance
// const memoryHistory = createMemoryHistory({
//   initialEntries: ["/"],
// });

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
