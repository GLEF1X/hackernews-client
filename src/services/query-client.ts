import { QueryClient } from "@tanstack/react-query";

export const CACHE_TIME_IN_MILLISECONDS = 1000 * 60; // 1 minute

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: CACHE_TIME_IN_MILLISECONDS,
      staleTime: CACHE_TIME_IN_MILLISECONDS,
      retry: 0,
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      useErrorBoundary: true,
      suspense: true,
    },
  },
});

export default queryClient;
