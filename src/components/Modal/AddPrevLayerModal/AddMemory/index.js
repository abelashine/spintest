import React, { useRef, useEffect, useState } from "react";
import { useField } from "formik";
import styles from "./AddMemory.module.scss";

import PhotoCrop from "../../../PhotoCrop";

const AddMemory = ({ name }) => {
  const [, meta, helpers] = useField(name);
  const imageBlock = useRef(null);
  const uploadedImageBlock = useRef(null);
  const [cropModal, setCropModal] = useState(false);
  const [journeyImage, setJourneyImage] = useState(null);
  useEffect(() => {
    setImageBlockSizes();
    window.addEventListener("resize", setImageBlockSizes);
    return () => window.removeEventListener("resize", setImageBlockSizes);
  }, [journeyImage]);
  const setImageBlockSizes = () => {
    if (journeyImage) return;
    const elementWidth = imageBlock.current.getBoundingClientRect().width;
    const elementHeight = imageBlock.current.getBoundingClientRect().height;
    if (elementWidth !== elementHeight) {
      imageBlock.current.style.height = `${elementWidth}px`;
    }
  };
  const onInputClick = (e) => {
    helpers.setTouched(true);
    e.target.value = ""; // this is to prevent bug in case, when chosen the same file after 'cancel'
  };
  const onInputChange = (e) => {
    setJourneyImage(e.target.files["0"]);
    setCropModal(true);
  };
  const goFuther = (imgData) => {
    setJourneyImage(imgData.topopup);
    setCropModal(false);
    helpers.setValue(imgData.tosave);
  };
  const deleteImage = () => {
    setJourneyImage(null);
    helpers.setValue(null);
  };
  const onCloseCropModal = () => {
    setCropModal(false);
    if (!meta.value) setJourneyImage(null);
  };
  const src = journeyImage ? URL.createObjectURL(journeyImage) : null;
  return (
    <section className={styles.AddMemory}>
      <div className={styles.AddMemory__imagefield}>
        <p className={styles.AddMemory__imagefield_label}>Add memory</p>

        {!journeyImage ? (
          <label
            htmlFor="memoryphotoId"
            className={styles.AddMemory__imagefield_input}
            ref={imageBlock}
            data-error={meta.touched && !!meta.error}
          >
            <span>+</span>
            <span>Add a photo</span>
            <input
              id="memoryphotoId"
              type="file"
              onClick={onInputClick}
              onInput={onInputChange}
            />
          </label>
        ) : (
          <div
            className={styles.AddMemory__imagefield_uploadedImg}
            ref={uploadedImageBlock}
          >
            <img src={src} alt="Image" onClick={() => setCropModal(true)} />
            <span onClick={deleteImage}>+</span>
          </div>
        )}
      </div>
      {cropModal && src && (
        <PhotoCrop
          image={src}
          onCloseCrop={onCloseCropModal}
          onSaveCrop={goFuther}
          withCrop={true}
          isPost
        />
      )}
    </section>
  );
};
export default AddMemory;
