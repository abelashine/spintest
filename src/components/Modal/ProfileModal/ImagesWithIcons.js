import React, { useState } from "react";
import { useFormikContext } from "formik";

import styles from "./ProfileModal.module.scss";

import ImageUploader from "../../../components/Inputs/ImageUploader";
import pencil from "../../../static/icons/pencil.svg";


const ImagesWithIcons = () => {
  return (
    <div>
      <div className={styles.imageHolderCircle}>
        <div className={styles.imageUploaderStepOne}>
          <ImageUploader
            name="profile"
            placeholder="Upload profile log"
            message="(.png 2000*2000)"
          />
        </div>
        <div className={styles.iconHolderCircle}>
          <img
            src={pencil}
            onClick={() => {
              console.log("clicked");
            }}
          />
        </div>
      </div>

      <div className={styles.imageHolderRectangular}>
        <div className={styles.imageUploaderStepOneRectangular}>
          <ImageUploader
            name="label"
            placeholder="Upload label logo"
            message="(.png 3000*3000; white background is suggested)"
            isRectangular={true}
          />
        </div>
        <div className={styles.iconHolderRectangular}>
          <img
            src={pencil}
            onClick={() => {
              console.log("clicked");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagesWithIcons;
