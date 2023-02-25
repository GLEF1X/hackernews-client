import { List } from "antd";
import { useGetBestNews } from "../../hooks/api/useGetBestNews";
import * as React from "react";

export default React.memo(function NewsList() {
  const { data: bestNews } = useGetBestNews({
    refetchInterval: 1000 * 60, // refresh data every minute
  });

  return (
    <List
      dataSource={bestNews}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta title={item.title} description={item.by} />
          <div>Content</div>
        </List.Item>
      )}
    />
  );
});
