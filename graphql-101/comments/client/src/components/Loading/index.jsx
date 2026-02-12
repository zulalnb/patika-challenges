import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

function Loading() {
  return (
    <div className={styles.loading}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  );
}

export default Loading;
