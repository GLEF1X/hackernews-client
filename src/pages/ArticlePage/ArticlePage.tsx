import { useLoaderData, useParams } from "react-router-dom";
import { articleLoader, getArticleQuery } from "../../services/loaders/article-loader";
import { useQuery } from "@tanstack/react-query";
import { getParameterIfPresentedOrThrow } from "../../utils/router-utils";
import React from "react";
import { Descriptions, Skeleton } from "antd";
import CommentsTree from "../../components/CommentsTree/CommentsTree";

export default function ArticlePage() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof articleLoader>>>;
  const params = useParams();
  const { data: article } = useQuery({
    ...getArticleQuery(parseInt(getParameterIfPresentedOrThrow(params, "articleId"))),
    initialData,
  });

  return (
    <>
      <Descriptions title="Article Info">
        <Descriptions.Item label="url">
          {
            <a href={article.url} target="_blank" referrerPolicy="no-referrer">
              {article.title}
            </a>
          }
        </Descriptions.Item>
        <Descriptions.Item label="title">{article.title}</Descriptions.Item>
        <Descriptions.Item label="date">{article.time.format()}</Descriptions.Item>
        <Descriptions.Item label="author">{article.by}</Descriptions.Item>
        <Descriptions.Item label="number of comments">
          {article?.descendants ?? 0}
        </Descriptions.Item>
      </Descriptions>
      <React.Suspense fallback={<Skeleton active />}>
        <CommentsTree commentIds={article?.kids ?? []} articleId={article.id} />
      </React.Suspense>
    </>
  );
}
