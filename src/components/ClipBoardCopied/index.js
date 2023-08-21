import React from "react";
import styles from "./ClipBoardCopied.module.scss";

export default ({ setIsActive, copiedObjectName }) => {
  setTimeout(() => setIsActive(false), 2000);

  const name = "product" === copiedObjectName ? "Product" : "Profile";

  return (
    <div className={styles.ClipBoardCopied}>
      <span className={styles.Frame}>
        <p className={styles.Text}>{name} link copied to clipboard</p>
      </span>
    </div>
  );
};
