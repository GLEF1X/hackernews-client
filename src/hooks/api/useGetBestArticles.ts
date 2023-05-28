import { useApiClient } from "@/services/api/api-client";
import { useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { Article } from "@/services/api/types";
import { newsQueryKeys } from "./query-keys";
import { calculateTotalNestedArrayLength } from "@/utils/arrays";

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

        return calculateTotalNestedArrayLength(allPages);
      },
      staleTime: 10 * 1000, // ten seconds
      cacheTime: 10 * 1000, // ten seconds
      refetchOnMount: true,
      ...options,
    }
  );
}
