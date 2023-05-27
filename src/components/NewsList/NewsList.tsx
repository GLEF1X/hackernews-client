import { List } from "antd";
import { useGetBestArticles } from "@/hooks/api/useGetBestArticles";
import * as React from "react";
import { ArticleModel, CleanData } from "@/services/api/types";
import { formatDateFromNow } from "@/utils/format-date";
import classes from "./NewsList.module.sass";
import { Link } from "react-router-dom";
import { RefetchButton } from "./RefetchButton";

export default React.memo(function NewsList() {
  const { data: bestNews, refetch } = useGetBestArticles();

  const articleDescription = (article: CleanData<typeof ArticleModel>) =>
    `${article.score} points by ${article.by} ${formatDateFromNow(article.time)}`;

  return (
    <>
      <RefetchButton refetch={refetch} />
      <List
        dataSource={bestNews}
        className={classes.listWrapper}
        bordered
        renderItem={(article) => (
          <List.Item key={article.id}>
            <List.Item.Meta
              className={classes.articleMetaInfo}
              title={<Link to={`/news/${article.id}/`}>{article.title}</Link>}
              description={articleDescription(article)}
            />
          </List.Item>
        )}
      />
    </>
  );
});
