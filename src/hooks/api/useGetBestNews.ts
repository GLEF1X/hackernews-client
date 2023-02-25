import { useApiClient } from "../../services/api/apiClient";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { type ArticleModel, type CleanData } from "../../services/api/types";
import { newsQueryKeys } from "./queryKeys";

export function useGetBestNews<Result = Array<CleanData<typeof ArticleModel>>>(
  options?: Partial<UseQueryOptions<Array<CleanData<typeof ArticleModel>>, Error, Result>>
) {
  const apiClient = useApiClient();

  return useQuery<Array<CleanData<typeof ArticleModel>>, Error, Result>(
    newsQueryKeys.getBestNews(),
    () => apiClient.getBestArticles(),
    options
  );
}
