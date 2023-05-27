import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function RootLayout() {
  return (
    <Layout style={{ padding: "10px", backgroundColor: "white" }}>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
}
