import { Divider, List, Select, Skeleton, Space } from "antd";
import { useGetBestArticles } from "@/hooks/api/useGetBestArticles";
import * as React from "react";
import { Article, ArticleModel, CleanData } from "@/services/api/types";
import { formatDateFromNow } from "@/utils/format-date";
import classes from "./NewsList.module.sass";
import { Link } from "react-router-dom";
import { RefetchButton } from "./RefetchButton";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";

export function NewsList() {
  const [orderBy, setOrderBy] = React.useState<"score" | "time" | "no-ordering">("no-ordering");
  const { data, fetchNextPage, hasNextPage, refetch } = useGetBestArticles();

  const bestNews = React.useMemo(() => {
    const sortByTime = <T extends Article>(a: T, b: T) => (dayjs(a.time).isBefore(b.time) ? 1 : -1);
    const sortByScore = <T extends Article>(a: T, b: T) => (a.score < b.score ? 1 : -1);

    if (!data) {
      return [];
    } else if (orderBy === "no-ordering") {
      return data.pages.flat();
    }

    return data.pages.flat().sort(orderBy === "score" ? sortByScore : sortByTime);
  }, [data, orderBy]);

  const handleOrderByChange = (value: string): void => {
    setOrderBy(value as "score" | "time" | "no-ordering");
  };

  const articleDescription = (article: CleanData<typeof ArticleModel>) =>
    `${article.score} points by ${article.by} ${formatDateFromNow(article.time)}`;

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <RefetchButton refetch={refetch} />
      <Select
        defaultValue="no-ordering"
        style={{ width: 200 }}
        onChange={handleOrderByChange}
        options={[
          { value: "no-ordering", label: "Pick the best" },
          { value: "score", label: "Order by score" },
          { value: "time", label: "Order by time" },
        ]}
      />
      <InfiniteScroll
        dataLength={bestNews.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Skeleton paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
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
      </InfiniteScroll>
    </Space>
  );
}
