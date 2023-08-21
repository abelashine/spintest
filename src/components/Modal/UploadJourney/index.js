import React from "react";
import { Formik } from "formik";
import styles from "./UploadJourney.module.scss";
import backArrow from "../../../static/icons/back-arrow.svg";
import { getInitialValues, validate } from "./initForm";

import ImageUploader from "../../Inputs/ImageUploader";
import UploadSelectionInput from "../../Inputs/UploadSelectionInput";
import UploadTextarea from "../../Inputs/UploadTextarea";
import SelectCityV2 from "../../Inputs/SelectCityV2";
import HashesFieldBlock from "../../Inputs/HashesFieldBlock";
import Button from "../../Button";

const UploadJourney = ({
  onClose,
  onSubmit,
  uploadedImage,
  cities,
  setCities,
}) => {
  const initialValues = getInitialValues(uploadedImage);
  return (
    <div className={styles.UploadJourney}>
      <div className={styles.header}>
        <img
          src={backArrow}
          alt="Back Arrow"
          onClick={onClose}
          className={styles.arrow}
        />
        Upload journey
      </div>
      <div className={styles.uploadForm}>
        <Formik
          initialValues={initialValues}
          validate={(values) => validate(values, cities)}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, values, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <div
                className={`${styles.photo} ${values.photo ? styles.filled : ""
                  }`}
              >
                <ImageUploader
                  closeButton
                  name="photo"
                  placeholder="Add photo"
                  uploadPhoto
                  // turned off for make equal to spin connect while crop not fixed
                  // withCrop
                  isCircled={false}
                />
              </div>
              <div className={styles.delimiter} />
              <div className={styles.fields}>
                <UploadSelectionInput
                  name="title"
                  label="Title"
                  placeholder="*Type here..."
                  isError={{
                    touched: touched.title,
                    text: errors.title,
                  }}
                />
                <UploadTextarea
                  name="description"
                  label="Description"
                  placeholder="*Describe your photo and tell a story…"
                />
                <SelectCityV2
                  name="location"
                  label="Location"
                  placeholder="*Type here..."
                  cities={cities}
                  setCities={setCities}
                />
                <div className={styles.fields__hashtags}>
                  <HashesFieldBlock
                    values={values}
                    name="hashtagfield"
                    totalNames="hashtags"
                    label="Hashtags"
                  />
                </div>
              </div>
              <div className={styles.delimiter} />
              <Button color="blue" type="submit" size="middle">
                PUBLISH
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default UploadJourney;
