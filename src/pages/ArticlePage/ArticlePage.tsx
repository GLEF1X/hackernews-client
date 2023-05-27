import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";
import { articleLoader, getArticleQuery } from "@/services/loaders/article-loader";
import { useQuery } from "@tanstack/react-query";
import { getParameterIfPresentedOrThrow } from "@/utils/router-utils";
import React from "react";
import { Breadcrumb, Descriptions, Space } from "antd";
import CommentsTree from "@/components/Comments/CommentsTree";
import { formatDate } from "@/utils/format-date";
import { CommentsTreeSkeleton } from "@/components/Comments/CommentsTreeSkeleton";

export default function ArticlePage() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof articleLoader>>>;
  const params = useParams();
  const location = useLocation();
  const articleId = parseInt(getParameterIfPresentedOrThrow(params, "articleId"));
  const { data: article } = useQuery({
    ...getArticleQuery(articleId),
    initialData,
  });

  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
      key: "home",
    },
    {
      title: <Link to={location.pathname}>{article.title}</Link>,
      key: location.key,
    },
  ];

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Breadcrumb items={breadcrumbItems} />
      <Descriptions title="Article Info">
        <Descriptions.Item label="url">
          {
            <a href={article.url} target="_blank" referrerPolicy="no-referrer">
              {article.title}
            </a>
          }
        </Descriptions.Item>
        <Descriptions.Item label="title">{article.title}</Descriptions.Item>
        <Descriptions.Item label="date">{formatDate(article.time)}</Descriptions.Item>
        <Descriptions.Item label="author">{article.by}</Descriptions.Item>
        <Descriptions.Item label="number of comments">
          {article?.descendants ?? 0}
        </Descriptions.Item>
      </Descriptions>
      <React.Suspense fallback={<CommentsTreeSkeleton />}>
        <CommentsTree commentIds={article?.kids ?? []} articleId={article.id} />
      </React.Suspense>
    </Space>
  );
}
