import { Spin } from "antd";
import classes from "./Spinner.module.css";
import { LoadingOutlined } from "@ant-design/icons";

export default function Spinner() {
  return (
    <div className={classes.spinnerWrapper}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        size="large"
        tip="Loading..."
      />
    </div>
  );
}
