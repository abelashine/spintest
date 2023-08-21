import React, { useState, useEffect, useRef } from "react";
import styles from "./SelectCityV5.module.scss";
import { useField, Field } from "formik";
import backArrow from "../../../static/icons/back-arrow.svg";
import backArrowV3 from "../../../static/icons/back-arrowV3.svg";
import { useSetSearchCityHook } from "../../../utils/hooks";
import OptionsList from "./OptionsList";

const SelectCityV6 = ({ name, setCities, options }) => {
  const [field, meta, helpers] = useField(name);
  const [isFocus, setIsFocus] = useState(false);
  const fieldWrapRef = useRef(null);
  useSetSearchCityHook(field.value, setCities);
  useEffect(() => {
    if (isFocus) {
      fieldWrapRef.current.style.zIndex = "2";
    } else fieldWrapRef.current.style.zIndex = "0";
  }, [isFocus]);

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
        className={styles.SelectCityV3}
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
          autoComplete='off'
        />
        <span className={styles.label}>Bank City</span>
        <img src={arrowBtn} alt="Arrow" className={arrowBtnClass} />
        {isOptionsListOpen && (
          <OptionsList options={options} onChooseHandler={onChooseHandler} />
        )}
      </div>
      {isFocus && <div className={styles.overlay} />}
    </>
  );
};

export default SelectCityV6;
