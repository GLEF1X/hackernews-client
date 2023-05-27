import { ConfigProvider } from "antd";
import ukUA from "antd/locale/uk_UA";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { ApiClientProvider } from "@/services/api/api-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient, { CACHE_TIME_IN_MILLISECONDS, persister } from "@/services/query-client";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <ConfigProvider locale={ukUA}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister, maxAge: CACHE_TIME_IN_MILLISECONDS }}
        >
          <ReactQueryDevtools initialIsOpen={false} />
          <ApiClientProvider>
            <RouterProvider router={router} />
          </ApiClientProvider>
        </PersistQueryClientProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
