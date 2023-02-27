import { Button, List } from "antd";
import { useGetBestArticles } from "../../hooks/api/useGetBestArticles";
import * as React from "react";
import { useState } from "react";
import { ArticleModel, CleanData } from "../../services/api/types";
import { formatDateFromNow } from "../../utils/format-date";
import classes from "./NewsList.module.sass";
import { Link } from "react-router-dom";

export default React.memo(function NewsList() {
  const [isRefetchingManually, setIsRefetchingManually] = useState<boolean>(false);
  const { data: bestNews, refetch } = useGetBestArticles({
    refetchInterval: 1000 * 60, // refresh data every minute
  });

  const articleDescription = (article: CleanData<typeof ArticleModel>) =>
    `${article.score} points by ${article.by} ${formatDateFromNow(article.time)}`;

  const refetchNewsManually = () => {
    setIsRefetchingManually(true);
    refetch({ throwOnError: true })
      .then(() => {
        setIsRefetchingManually(false);
      })
      .catch(() => setIsRefetchingManually(false));
  };

  return (
    <>
      <Button type="primary" loading={isRefetchingManually} onClick={refetchNewsManually}>
        Refresh data
      </Button>
      <List
        dataSource={bestNews}
        className={classes.listWrapper}
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
