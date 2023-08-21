import React, { useState, useEffect } from "react";
import { useField } from "formik";
import styles from "./DateTextFields.module.scss";
import backArrow from "../../../static/icons/back-arrow.svg";
import backArrowV3 from "../../../static/icons/back-arrowV3.svg";

import SetDateModal from "../../Modal/SetDateModal";

const DateTextFields = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (field.value) {
      helpers.setTouched(true);
    }
  }, []);
  const openCloseFields = () => {
    if (isOpen) helpers.setTouched(true);
    setIsOpen(!isOpen);
  };
  const isTouchedError = meta.error && meta.touched;
  const isTouched = meta.touched;
  return (
    <>
      {isOpen && <SetDateModal name={name} openCloseFields={openCloseFields} />}
      <div
        className={styles.DateTextFields}
        onClick={openCloseFields}
        data-invalid={isTouchedError}
      >
        <input
          className={styles.DateTextFields__input}
          name={name}
          value={isTouchedError ? meta.error : field.value}
          readOnly
          data-invalid={isTouchedError}
        />
        <img
          className={styles.DateTextFields__backarrow}
          src={isTouchedError ? backArrowV3 : backArrow}
          alt="Back Arrow"
        />
        <span
          className={styles.DateTextFields__placeholderLabel}
          data-touched={isTouched}
          data-invalid={isTouchedError}
        >
          {label}
        </span>
      </div>
    </>
  );
};

export default DateTextFields;
