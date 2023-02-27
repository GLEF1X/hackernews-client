import { QueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/api-client";
import { LoaderFunctionArgs } from "@remix-run/router/utils";
import { getParameterIfPresentedOrThrow } from "../../utils/router-utils";

export const getArticleQuery = (id: number) => {
  return {
    queryKey: ["articles", "detail", id],
    queryFn: async () => await apiClient.getArticleById(id),
  };
};

export const articleLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) =>
    queryClient.ensureQueryData({
      ...getArticleQuery(parseInt(getParameterIfPresentedOrThrow(params, "articleId"), 10)),
    });
