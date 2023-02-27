import { useApiClient } from "../../services/api/api-client";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { Article } from "../../services/api/types";
import { newsQueryKeys } from "./query-keys";

export function useGetBestArticles<Result = Array<Article>>(
  options?: Partial<UseQueryOptions<Array<Article>, Error, Result>>
) {
  const apiClient = useApiClient();

  return useQuery<Array<Article>, Error, Result>(
    newsQueryKeys.getBestNews(),
    async () => {
      const news = await apiClient.getBestArticles();

      return news.sort((a, b) => (a.time.isBefore(b.time) ? 1 : -1));
    },
    options
  );
}
