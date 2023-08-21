import React from "react";
import styles from "./BlackCircle.module.scss";

export default (props) => (
  <div className={styles.BlackCircle}>{props.children}</div>
);
