import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import TaskDetailsPage from "./pages/TaskDetailsPage.jsx";
import Tasks from "./pages/Tasks.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Tasks />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetailsPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
