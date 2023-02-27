import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import React from "react";

export default function Layout() {
  return (
    <div className={styles.contentWrapper}>
      <Outlet />
    </div>
  );
}
