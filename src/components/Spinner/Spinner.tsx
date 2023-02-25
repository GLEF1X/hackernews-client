import React from "react";
import { Spin } from "antd";
import classes from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={classes.spinnerWrapper}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
}
