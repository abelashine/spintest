import React from "react";
import styles from "./ProfileModal.module.scss";
import plusIcon from "../../../static/icons/plusIcon.svg";
import { Field, useFormikContext } from "formik";

const CustomFileInput = ({label}) => {
  const { setFieldValue } = useFormikContext();

  const handleFileUpload = (event) => {
    const file = event.currentTarget.files[0];
    setFieldValue("company_constitution", file);
  };

  return (
    <div>
      <label htmlFor="file-upload" className={styles.customUpload}>
        <span className={styles.add}>
          <img src={plusIcon} style={{ height: 33.6 }} alt="Add icon" />
        </span>
        <div className={styles.text3} style={{ marginLeft: "10px" }}>
          {label}
        </div>
      </label>
      <Field name="file-upload">
        {({ field }) => (
          <input
            id="file-upload"
            type="file"
            className="file-input"
            onChange={(event) => {
              field.onChange(event);
              handleFileUpload(event);
            }}
            style={{ display: "none" }}
          />
        )}
      </Field>
    </div>
  );
};

export default CustomFileInput;
