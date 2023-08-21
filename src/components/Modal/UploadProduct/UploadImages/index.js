import React from "react";
import styles from "./UploadImages.module.scss";
import ImageUploader from "../../../Inputs/ImageUploader";

const UploadImages = ({ preloadPhotos }) => {
  return (
    <div className={styles.imagesGroup}>
      <div className={styles.mainImage}>
        <ImageUploader
          name="images[0]"
          preloadPhoto={preloadPhotos[0]}
          placeholder="Add photo"
          isCircled={false}
          withCrop
          closeButton
        />
      </div>
      <ImageUploader
        name="images[1]"
        preloadPhoto={preloadPhotos[1]}
        placeholder="Add photo"
        isCircled={false}
        withCrop
        closeButton
      />
      <ImageUploader
        name="images[2]"
        preloadPhoto={preloadPhotos[2]}
        placeholder="Add photo"
        isCircled={false}
        withCrop
        closeButton
      />
      <ImageUploader
        name="images[3]"
        preloadPhoto={preloadPhotos[3]}
        placeholder="Add photo"
        isCircled={false}
        withCrop
        closeButton
      />
      <ImageUploader
        name="images[4]"
        preloadPhoto={preloadPhotos[4]}
        placeholder="Add photo"
        isCircled={false}
        withCrop
        closeButton
      />
    </div>
  );
};

export default UploadImages;
