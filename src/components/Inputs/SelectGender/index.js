import React, { useState, useEffect, useRef } from "react";
import styles from "./SelectGender.module.scss";
import { useField, Field } from "formik";
import backArrow from "../../../static/icons/back-arrow.svg";
import backArrowV3 from "../../../static/icons/back-arrowV3.svg";
import { gendersDataV3 } from "../../../static/data/dataForForms";
import OptionsList from "./OptionsList";

const SelectGenderV2 = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  const [isFocus, setIsFocus] = useState(false);
  const [options, setOptions] = useState([]);
  const fieldWrapRef = useRef(null);
  useEffect(() => {
    if (isFocus) {
      fieldWrapRef.current.style.zIndex = "2";
    } else fieldWrapRef.current.style.zIndex = "0";
  }, [isFocus]);
  useEffect(() => {
    if (field.value) {
      if (field.value.trim()) {
        const filteredOptions = gendersDataV3.filter((g) =>
          g.value.toLowerCase().includes(field.value.trim().toLowerCase())
        );
        setOptions(filteredOptions);
      }
    } else setOptions([]);
  }, [field.value]);

  const onBlurHandler = (e) => {
    field.onBlur(e);
    setIsFocus(false);
  };
  const onChooseHandler = (value) => helpers.setValue(value);

  const isOptionsListOpen = isFocus && options.length !== 0 && field.value;
  const fieldInvalid = meta.error && meta.touched && !isFocus;
  const arrowBtn = fieldInvalid ? backArrowV3 : backArrow;
  const arrowBtnClass = isOptionsListOpen
    ? styles.openArrowBtn
    : styles.arrowBtn;
  const inputPlaceHolder =
    isFocus && !field.value ? "Type here..." : fieldInvalid ? meta.error : "";
  const correctValue = field.value && !meta.error && !isFocus;
  return (
    <>
      <div
        className={styles.SelectGender}
        data-invalid={fieldInvalid}
        data-focus={isFocus || correctValue}
        ref={fieldWrapRef}
        onClick={() => setIsFocus(true)}
      >
        <Field
          name={name}
          className={styles.field}
          onBlur={onBlurHandler}
          placeholder={inputPlaceHolder}
          autoComplete="off"
        />
        <span className={styles.label}>Gender</span>
        <img src={arrowBtn} alt="Arrow" className={arrowBtnClass} />
        {isOptionsListOpen && (
          <OptionsList options={options} onChooseHandler={onChooseHandler} />
        )}
      </div>
      {isFocus && <div className={styles.overlay} />}
    </>
  );
};

export default SelectGenderV2;
