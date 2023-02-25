import "./App.css";
import { ConfigProvider } from "antd";
import ukUA from "antd/locale/uk_UA";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiClientProvider } from "./services/api/apiClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 10 * 60 * 1000,
        staleTime: 1000 * 60, // 1 minute
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        useErrorBoundary: true,
        suspense: true,
      },
    },
  });

  return (
    <ConfigProvider locale={ukUA}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ApiClientProvider>
          <RouterProvider router={router} />
        </ApiClientProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
