import React, { useState, useEffect } from "react";
import { useField } from "formik";
import styles from "./ImageUploader.module.scss";
import { addImg, resetImg, saveImg } from './helpers'

import PhotoCrop from "../../PhotoCrop";
import UploadedPhoto from './UploadedPhoto'
import InputForPhoto from './InputForPhoto'

export default ({
  placeholder,
  preview,
  isCircled = true,
  withCrop,
  uploadPhoto,
  preloadPhoto,
  ...props
}) => {
  const [field, , helpers] = useField(props);
  const [croppedImage, setCroppedImage] = useState(false);
  const [canOpen, setCanOpen] = useState(false);
  const [image, setImage] = useState(() => {
    return field.value ? URL.createObjectURL(field.value) : null;
  });
  const [isDeleteBtn, setIsDeleteBtn] = useState(false)

  useEffect(() => {
    if (preloadPhoto instanceof Blob) {
      setCroppedImage(true);
      const url_image = URL.createObjectURL(preloadPhoto);
      setImage(url_image);
      helpers.setValue(new File([preloadPhoto], "avatar.png"));
      setIsDeleteBtn(true)
    }
  }, [preloadPhoto]);

  const attachImage = (event) => addImg(event, setCanOpen, helpers, setImage, setCroppedImage)
  const resetValue = () => resetImg(helpers, setImage, setIsDeleteBtn)
  const onCloseCrop = () => {
    if (!isDeleteBtn) {
      resetValue();
    }
    setCroppedImage(true);
  };
  const onSaveCrop = (img) => saveImg(img, setImage, helpers, setCroppedImage, setIsDeleteBtn)
  const editImage = () => {
    setCanOpen(true)
    setCroppedImage(false)
  }

  if (canOpen && image && !croppedImage) {
    return (
      <PhotoCrop
        image={image}
        onCloseCrop={onCloseCrop}
        onSaveCrop={onSaveCrop}
        setCroppedImage={setCroppedImage}
        isCircled={isCircled}
        isPost={uploadPhoto}
        withCrop={withCrop}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      {isDeleteBtn
        ? <UploadedPhoto resetValue={resetValue} editImage={editImage} image={image} />
        : <InputForPhoto
          uploadPhoto={uploadPhoto}
          resetValue={resetValue}
          preview={preview}
          placeholder={placeholder}
          attachImage={attachImage}
          props={props}
        />}
    </div>
  );
};
