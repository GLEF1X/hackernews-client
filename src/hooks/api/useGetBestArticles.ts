import { useApiClient } from "@/services/api/api-client";
import { useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { Article } from "@/services/api/types";
import { newsQueryKeys } from "./query-keys";

export function useGetBestArticles<Result = Array<Article>>(
  options?: UseInfiniteQueryOptions<Array<Article>, Error, Result>
) {
  const apiClient = useApiClient();

  return useInfiniteQuery<Array<Article>, Error, Result>(
    newsQueryKeys.getBestNews(),
    async ({ pageParam = 0 }) => await apiClient.getBestArticles(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.length) {
          return null;
        }
        return allPages.reduce((total, current) => total + current.length, 0) + 1;
      },
      staleTime: 10 * 1000, // ten seconds
      cacheTime: 10 * 1000, // ten seconds
      refetchOnMount: true,
      ...options,
    }
  );
}
