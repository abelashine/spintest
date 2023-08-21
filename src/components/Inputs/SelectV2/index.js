import React, { useState, useEffect } from "react";
import { useField, Field } from "formik";
import styles from "./SelectV2.module.scss";

const SelectV2 = ({ name, label, options, readOnly }) => {
  const [field, meta, helpers] = useField(name);
  const [listOpen, setListOpen] = useState(false);
  useEffect(() => {
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);
  useEffect(() => {
    if (!listOpen) {
      if (field.value) {
        const isCorrectCity = options.find(
          (c) => c.name === field.value.trim()
        );
      }
    }
  }, [listOpen]);
  const clickOutside = (e) => {
    if (!e.target.dataset.field) {
      setListOpen(false);
    }
  };
  const onChangeHandler = (e) => {
    helpers.setTouched(false);
    field.onChange(e);
    if (!listOpen) {
      setListOpen(true);
    }
  };
  const onClickHandler = () => {
    if (!listOpen) {
      setListOpen(true);
    } else {
      setListOpen(false);
    }
  };
  const onItemClick = (e) => {
    helpers.setValue(e.target.textContent);
    setListOpen(false);
  };
  const labelText =
    meta.value && meta.error && meta.touched ? meta.error : label;
  return (
    <div className={styles.SelectV2}>
      <div
        className={styles.SelectV2__fieldblock}
        data-error={meta.error && meta.touched}
        onClick={onClickHandler}
      >
        <Field
          id="SelectCityV4"
          name={name}
          className={styles.SelectV2__fieldblock_input}
          onChange={onChangeHandler}
          data-field
          readOnly={readOnly}
        />
        <label
          htmlFor="SelectCityV4"
          className={styles.label}
          data-noempty={!!field.value}
        >
          {labelText}
        </label>
      </div>
      {options.length !== 0 && listOpen && (
        <ul className={styles.SelectV2__optionslist}>
          {options.map((o) => (
            <li key={o.id || o.value} onClick={onItemClick}>
              {o.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SelectV2;
