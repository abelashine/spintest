import React from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({ current, total = 0 }) => (
  <div>
    <div className={styles.stepsProgressBar}>
      <div className={current === 0 ? styles.current : ""}></div>
      <div className={current === 1 ? styles.current : ""}></div>
      <div className={current === 2 ? styles.current : ""}></div>
      <div className={current === 3 ? styles.current : ""}></div>
    </div>
  </div>
);

export default Pagination;
