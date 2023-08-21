import React from "react";
import styles from "./HeaderTab.module.scss";

const HeaderTab = ({ tab, link, status }) => {
  return <div className={`${styles.HeaderTab} ${styles[status]}`}>{tab}</div>;
};

export default HeaderTab;
