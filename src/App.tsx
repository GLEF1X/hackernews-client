import { ConfigProvider } from "antd";
import ukUA from "antd/locale/uk_UA";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ApiClientProvider } from "./services/api/api-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./services/query-client";
import * as React from "react";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Spinner from "./components/Spinner/Spinner";

function App() {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<Spinner />}>
        <ConfigProvider locale={ukUA}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ApiClientProvider>
              <RouterProvider router={router} />
            </ApiClientProvider>
          </QueryClientProvider>
        </ConfigProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default App;
