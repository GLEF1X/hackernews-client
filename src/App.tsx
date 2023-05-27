import { ConfigProvider } from "antd";
import ukUA from "antd/locale/uk_UA";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { ApiClientProvider } from "@/services/api/api-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "@/services/query-client";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <ErrorBoundary>
      <ConfigProvider locale={ukUA}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ApiClientProvider>
            <RouterProvider router={router} />
          </ApiClientProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
