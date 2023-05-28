import { Spin } from "antd";
import classes from "./Spinner.module.css";
import { LoadingOutlined } from "@ant-design/icons";

export default function Spinner() {
  return (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      className={classes.spinnerWrapper}
      size="large"
      tip="Loading..."
    />
  );
}
