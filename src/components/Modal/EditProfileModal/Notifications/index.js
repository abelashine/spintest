import React from "react";
import styles from "./Notifications.module.scss";

const Notifications = () => {
  return (
    <div className={styles.Notifications}>
      <h3 className={styles.Notifications__title}>Notifications</h3>
      <ul className={styles.Notifications__list}>
        <li className={styles.Notifications__list_item}>
          <img
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
            alt="Avatar"
          />
        </li>
        <li className={styles.Notifications__list_item}>
          <img
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
            alt="Avatar"
          />
        </li>
      </ul>
    </div>
  );
};

export default Notifications;
