import React from "react";
import styles from "./ImageChecked.module.scss";
import Check from "../../static/icons/checkOk/xs.png";

const ImageChecked = ({ image, size }) => {
  return (
    <div className={styles.ImageChecked}>
      <img
        className={`${styles.MainImage} ${styles["Main" + size]}`}
        src={image}
        alt="logo"
      />
      <img
        className={`${styles.CheckImage} ${styles["Small" + size]}`}
        src={Check}
        alt="logo"
      />
    </div>
  );
};

export default ImageChecked;
