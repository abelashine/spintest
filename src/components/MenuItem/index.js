import React from "react";
import styles from "./MenuItem.module.scss";

export default ({ icon, children, onClick }) => {
  return (
    <div className={styles.MenuItem} onClick={onClick}>
      {icon ? (
        <div className={styles.iconContainer}>{icon}</div>
      ) : (
        <div className={styles.iconPlaceholder} />
      )}
      <span className={styles.ItemLabel}>{children}</span>
    </div>
  );
};
