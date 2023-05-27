import { createBrowserRouter } from "react-router-dom";
import React, { lazy } from "react";
import NotFoundResult from "./components/404";
import { articleLoader } from "./services/loaders/article-loader";
import queryClient from "./services/query-client";
import Layout from "./components/Layout";
import { withSuspense } from "./HOCs/withSuspense";

const HomePage = withSuspense(lazy(() => import("./pages/HomePage/HomePage")));
const ArticlePage = withSuspense(lazy(() => import("./pages/ArticlePage/ArticlePage")));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundResult />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/news/:articleId/",
        element: <ArticlePage />,
        loader: articleLoader(queryClient),
      },
    ],
  },
]);
