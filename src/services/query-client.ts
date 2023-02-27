import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60,
      staleTime: 1000 * 60, // 1 minute
      retry: 0,
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      useErrorBoundary: true,
      suspense: true,
    },
  },
});

export default queryClient;
