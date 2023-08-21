import React, { useState, useEffect } from "react";
import { useField, Field } from "formik";
import styles from "./SelectCityV4.module.scss";
import { useSetSearchCityHook } from "../../../utils/hooks";

const SelectCityV4 = ({ name, label, cities, setCity }) => {
  const [field, meta, helpers] = useField(name);
  const [listOpen, setListOpen] = useState(false);
  useSetSearchCityHook(field.value, setCity);
  useEffect(() => {
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);
  useEffect(() => {
    if (!listOpen) {
      if (field.value) {
        const isCorrectCity = cities.find((c) => c.name === field.value.trim());
        if (!isCorrectCity)
          helpers.setError("Choose the address from the list");
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
    if (cities.length && !listOpen) {
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
    <div className={styles.SelectCityV4}>
      <div
        className={styles.SelectCityV4__fieldblock}
        data-error={meta.error && meta.touched}
        onClick={onClickHandler}
      >
        <Field
          id="SelectCityV4"
          name={name}
          className={styles.SelectCityV4__fieldblock_input}
          onChange={onChangeHandler}
          data-field
        />
        <label
          htmlFor="SelectCityV4"
          className={styles.label}
          data-noempty={!!field.value}
        >
          {labelText}
        </label>
      </div>
      {cities.length !== 0 && listOpen && (
        <ul className={styles.SelectCityV4__citieslist}>
          {cities.map((c) => (
            <li key={c.shortValue} onClick={onItemClick}>
              {c.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SelectCityV4;
