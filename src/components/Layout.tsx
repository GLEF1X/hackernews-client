import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <Layout style={{ padding: "10px", backgroundColor: "white" }}>
      <Content style={{ margin: "0 250px" }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
