import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useApiClient } from "@/services/api/api-client";
import { newsQueryKeys } from "./query-keys";
import { convertCommentsToCommentNodes, CommentNode } from "@/utils/tree";

export function useGetComments<Result = CommentNode[]>(
  ids: number[],
  articleId: number,
  options?: Partial<Omit<UseQueryOptions<CommentNode[], Error, Result>, "queryFn" | "queryKey">>
) {
  const apiClient = useApiClient();

  return useQuery<CommentNode[], Error, Result>(
    newsQueryKeys.getComments(articleId),
    async () => convertCommentsToCommentNodes(await apiClient.getComments(ids)),
    options
  );
}
