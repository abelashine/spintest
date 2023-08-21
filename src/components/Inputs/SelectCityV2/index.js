import React, { useState, useEffect } from "react";
import { useField, Field, ErrorMessage } from "formik";
import styles from "./SelectCityV2.module.scss";
import backArrow from "../../../static/icons/back-arrow.svg";
import { useSetSearchCityHook } from "../../../utils/hooks";

const SelectCityV2 = ({ name, label, placeholder, cities, setCities }) => {
  const [field, , helpers] = useField(name);
  const [listOpen, setListOpen] = useState(false);
  useSetSearchCityHook(field.value, setCities);
  useEffect(() => {
    if (!listOpen) {
      if (field.value) {
        const isCorrectCity = cities.find((c) => c.name === field.value.trim());
        if (!isCorrectCity)
          helpers.setError("Choose the address from the list");
      }
    }
  }, [listOpen]);

  const searchCity = (e) => {
    if (!e.target.value.trim()) {
      helpers.setValue("");
      setCities([]);
      if (listOpen) setListOpen(false);
      return;
    }
    if (!listOpen) setListOpen(true);
    field.onChange(e);
  };
  const onFieldClick = () => {
    if (!cities.length) return;
    setListOpen(!listOpen);
  };
  const onItemClick = (e) => {
    helpers.setValue(e.target.innerHTML);
    setListOpen(false);
  };
  const isListOpened = listOpen ? styles.openList : styles.closedList;
  return (
    <div className={styles.SelectCityV2}>
      <div className={styles.SelectCityV2__fieldblock}>
        <label htmlFor="SelectCityV2">{label}</label>
        <div
          className={styles.SelectCityV2__fieldblock_fieldwrap}
          onClick={onFieldClick}
        >
          <Field
            id="SelectCityV2"
            name={name}
            placeholder={placeholder}
            onChange={searchCity}
          />
          <img className={isListOpened} src={backArrow} alt="Arrow" />
        </div>
      </div>
      <ErrorMessage name={name}>
        {(errorMsg) => <span className={styles.errorText}>{errorMsg}</span>}
      </ErrorMessage>
      {cities.length !== 0 && listOpen && (
        <ul className={styles.SelectCityV2__citieslist}>
          {cities.map((c) => (
            <li key={c.shortValue} onClick={onItemClick}>{c.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SelectCityV2;
