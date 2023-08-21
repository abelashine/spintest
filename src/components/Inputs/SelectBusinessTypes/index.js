import React, { useState, useEffect, useRef } from "react";
import styles from "./SelectGender.module.scss";
import { useField, Field } from "formik";
import backArrow from "../../../static/icons/back-arrow.svg";
import backArrowV3 from "../../../static/icons/back-arrowV3.svg";
import { businessAccountTypes as  accountTypes} from "../../../static/data/dataForForms" ;
import OptionsList from "./OptionsList";

const SelectBusinessTypes = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  const [isFocus, setIsFocus] = useState(false);
  const [options, setOptions] = useState([]);
  const [clicked, setClicked] = useState(false);
  const fieldWrapRef = useRef(null);

  useEffect(() => {
    if (isFocus) {
      fieldWrapRef.current.style.zIndex = "2";
    } else {
      fieldWrapRef.current.style.zIndex = "0";
    }
  }, [isFocus]);

  
  useEffect(() => {
    setOptions(accountTypes);
  }, []);

  const onBlurHandler = (e) => {
    field.onBlur(e);
    setIsFocus(false);
  };

  const onChooseHandler = (value) => {
    helpers.setValue(value), setClicked(false);
  };

  const fieldInvalid = meta.error && meta.touched && !isFocus;
  const arrowBtn = fieldInvalid ? backArrowV3 : backArrow;
  const arrowBtnClass = clicked ? styles.openArrowBtn : styles.arrowBtn;
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
      >
        <Field
          name={name}
          className={styles.field}
          onBlur={onBlurHandler}
          placeholder={inputPlaceHolder}
          autoComplete="off"
          onClick={() => {
            setClicked(true);
          }}
        />
        <span className={styles.label}>Category</span>
        <img src={arrowBtn} alt="Arrow" className={arrowBtnClass} />
        {clicked && (
          <OptionsList options={options} onChooseHandler={onChooseHandler} />
        )}
      </div>
      {isFocus && <div className={styles.overlay} />}
    </>
  );
};

export default SelectBusinessTypes;
