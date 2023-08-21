import React from "react";
import styles from "./Modal.module.scss";

export default (props) => {
  const { children, isOpen, isSub = false } = props;

  return (
    <>
      {isOpen ? (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalWindow} ${isSub ? styles.subModal : ""}`}>{children}</div>
          <div className={styles.modalOverlay__overlay}></div>
        </div>
      ) : null}
    </>
  );
};
