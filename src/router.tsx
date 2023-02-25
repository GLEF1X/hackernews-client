import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
