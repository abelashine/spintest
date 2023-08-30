import React, { useState, useEffect } from "react";
import { useField } from "formik";
import styles from "./ImageUploader.module.scss";
import crossBtn1 from "../../../static/icons/crossBtn1.svg";
import PhotoCrop from "../../PhotoCrop";
import plus from "../../../static/images/plus.png";
import PhotoCropRectangular from "../../PhotoCropRectangular/index";

const ImageUploader = ({
  placeholder,
  preview,
  closeButton,
  isCircled = true,
  withCrop,
  uploadPhoto,
  preloadPhoto,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const [croppedImage, setCroppedImage] = useState(false);
  const [canOpen, setCanOpen] = useState(false);
  const [image, setImage] = useState(() => {
    return field.value ? URL.createObjectURL(field.value) : null;
  });

  useEffect(() => {
    if (preloadPhoto instanceof Blob) {
      setCroppedImage(true);
      const url_image = URL.createObjectURL(preloadPhoto);
      setImage(url_image);
      helpers.setValue(new File([preloadPhoto], "avatar.png"));
    }
  }, [preloadPhoto]);

  const attachImage = (event) => {
    const type = event.type;
    let image = null;
    if (type === "change") {
      image = [...event.target.files][0];
      setCanOpen(true);
    }
    helpers.setValue(image);
    setImage(URL.createObjectURL(image));
    setCroppedImage(false);
    event.preventDefault();
  };

  const resetValue = () => {
    helpers.setValue(null);
    setImage(null);
  };
  const onCloseCrop = () => {
    resetValue();
    setCroppedImage(true);
  };
  const onSaveCrop = (imgData) => {
    setImage(URL.createObjectURL(imgData.topopup));
    helpers.setValue(new File([imgData.tosave], "avatar.png"));
    setCroppedImage(true);
  };

  if (canOpen && image && !croppedImage) {
    if (props.hasOwnProperty("isRectangular")) {
      return (
        <PhotoCropRectangular
          image={image}
          onCloseCrop={onCloseCrop}
          onSaveCrop={onSaveCrop}
          setCroppedImage={setCroppedImage}
          isCircled={true}
          isPost={uploadPhoto}
          withCrop={withCrop}
        />
      );
    } else {
      return (
        <PhotoCrop
          image={image}
          onCloseCrop={onCloseCrop}
          onSaveCrop={onSaveCrop}
          setCroppedImage={setCroppedImage}
          isCircled={true}
          isPost={uploadPhoto}
          withCrop={withCrop}
        />
      );
    }
  }

  return (
    <label
      className={styles.ImageUploader}
      invalid={meta.touched ? meta.error : undefined}
      filled={field.value}
    >
      {field.value ? (
        uploadPhoto ? (
          <>
            <div className={styles.uploadImage}>
              <img src={image} alt="" />
              {closeButton && (
                <button
                  type="button"
                  className={styles.resetButton}
                  onClickCapture={resetValue}
                >
                  <img src={crossBtn1} alt="crossBtn" />
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${image})`,
              }}
              alt=""
            />
            {closeButton && (
              <button
                type="button"
                className={styles.resetButton}
                onClick={resetValue}
              >
                <img src={crossBtn1} alt="crossBtn" />
              </button>
            )}
          </>
        )
      ) : preview ? (
        <img src={preview} alt="" />
      ) : (
        <>
          {props.top ? (
            <div className={styles.labelTextTop} data-label-text="labelBlock">
              <br />
              {props.profile_logo ? (
                <img
                  className={styles.imgTopCircle}
                  src={plus}
                  width={15}
                  style={{ marginTop: -15 }}
                />
              ) : (
                <img
                  className={styles.imgTop}
                  src={plus}
                  width={15}
                  style={{ marginTop: -15 }}
                />
              )}

              <span className={styles.imagePlaceholderTop}>
                {placeholder || ""}
              </span>
              <br />
              <span>{props.message || ""}</span>
              <br />

              <br />
              {!props.message &&
                (meta.touched ? <span>{meta.error}</span> : <div></div>)}
            </div>
          ) : (
            <div className={styles.labelText} data-label-text="labelBlock">
              <br />
              <span className={styles.imagePlaceholder}>
                {placeholder || ""}
              </span>

              <br />
              <img src={plus} width={15} style={{ marginTop: 15 }} />
              <span>{props.message || ""}</span>
              {!props.message &&
                (meta.touched ? <span>{meta.error}</span> : <div></div>)}
            </div>
          )}
        </>
      )}
      <input type="file" accept="image/*" onChange={attachImage} />
    </label>
  );
};
export default ImageUploader;
