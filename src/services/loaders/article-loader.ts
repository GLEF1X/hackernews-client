import { QueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/api-client";
import { LoaderFunctionArgs } from "@remix-run/router/utils";
import { getParameterIfPresentedOrThrow } from "../../utils/router-utils";
import { Article } from "../api/types";

export const getArticleQuery = (id: number) => {
  return {
    queryKey: ["articles", "detail", id],
    queryFn: async () => await apiClient.getArticleById(id),
  };
};

export const articleLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs): Promise<Article> => {
    const articleId = parseInt(getParameterIfPresentedOrThrow(params, "articleId"), 10);

    return await queryClient.ensureQueryData({ ...getArticleQuery(articleId) });
  };
