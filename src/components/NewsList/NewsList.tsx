import { Divider, List, Skeleton } from "antd";
import { useGetBestArticles } from "@/hooks/api/useGetBestArticles";
import * as React from "react";
import { ArticleModel, CleanData } from "@/services/api/types";
import { formatDateFromNow } from "@/utils/format-date";
import classes from "./NewsList.module.sass";
import { Link } from "react-router-dom";
import { RefetchButton } from "./RefetchButton";
import InfiniteScroll from "react-infinite-scroll-component";

export default React.memo(function NewsList() {
  const { data: bestNews, fetchNextPage, hasNextPage, refetch } = useGetBestArticles();

  const articleDescription = (article: CleanData<typeof ArticleModel>) =>
    `${article.score} points by ${article.by} ${formatDateFromNow(article.time)}`;

  const dataLength = bestNews?.pages.reduce((total, current) => total + current.length, 0) ?? 0;

  return (
    <>
      <RefetchButton refetch={refetch} />
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Skeleton paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={bestNews?.pages.flat()}
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
      </InfiniteScroll>
    </>
  );
});
