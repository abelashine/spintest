import React from "react";
import styles from "./Contact.module.scss";

import Header from "../../../components/Header";

export default () => {
  return (
    <div className={styles.Contact}>
      <Header />
      <h1>CONTACT</h1>
      <div className={styles.content}>contact@lablaco.com</div>
    </div>
  );
};
