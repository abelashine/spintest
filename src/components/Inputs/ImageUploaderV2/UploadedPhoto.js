import React from "react";
import styles from "./ImageUploader.module.scss";
import crossBtn1 from "../../../static/icons/crossBtn1.svg";

const UploadedPhoto = ({ resetValue, editImage, image }) => {
  return (
    <div className={styles.imageBlockWrap}>
      <button type="button" className={styles.resetBtn} onClick={resetValue}>
        <img src={crossBtn1} alt="Cross button" />
      </button>
      <img src={image} onClick={editImage} className={styles.uploadedImage} alt='' />
    </div>
  );
};

export default UploadedPhoto;
