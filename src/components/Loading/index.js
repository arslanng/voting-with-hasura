import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import styles from "./styles.module.css"

function Loading() {
  return (
    <div className={styles.loading}>
      <Spin delay={300} indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
      {/* 300 milisn ve daha kısa süren durumlarda loading görünmez. */}
    </div>
  );
}

export default Loading;
