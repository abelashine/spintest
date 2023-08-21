import React from "react";
import styles from "./NotificationsBurger.module.scss";

export default ({ notifications, onClick }) => {
  return (
    <button
      className={styles.NotificationsBurger}
      type="button"
      onClick={onClick}
    >
      {notifications && (
        <span className={styles.notificationsCounter}>{notifications}</span>
      )}
    </button>
  );
};
