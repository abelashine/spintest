import React from "react";
import styles from "./UploadImages.module.scss";
import ImageUploaderV2 from "../../../Inputs/ImageUploaderV2";

const UploadImages = ({preloadPhotos}) => {
  return (
    <div className={styles.imagesGroup}>
      <div className={styles.mainImage}>
        <ImageUploaderV2
          name="images[0]"
          placeholder="Add photo"
          isCircled={false}
          withCrop
          preloadPhoto={preloadPhotos[0]}
        />
      </div>
      <ImageUploaderV2
        name="images[1]"
        placeholder="Add photo"
        isCircled={false}
        withCrop
        preloadPhoto={preloadPhotos[1]}
      />
      <ImageUploaderV2
        name="images[2]"
        placeholder="Add photo"
        isCircled={false}
        withCrop
        preloadPhoto={preloadPhotos[2]}
      />
      <ImageUploaderV2
        name="images[3]"
        placeholder="Add photo"
        isCircled={false}
        withCrop
        preloadPhoto={preloadPhotos[3]}
      />
      <ImageUploaderV2
        name="images[4]"
        placeholder="Add photo"
        isCircled={false}
        withCrop
        preloadPhoto={preloadPhotos[4]}
      />
    </div>
  );
};

export default UploadImages;
