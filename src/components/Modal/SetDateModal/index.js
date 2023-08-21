import React, { useState, useEffect } from "react";
import { useField } from "formik";
import styles from "./SetDateModal.module.scss";
import SelectField from "./SelectField";
import {
  daysInMonthV2,
  monthNamesV2,
  oneHundredAndTwentyYears,
} from "../../../static/data/dataForForms";
import {
  validateDay,
  validateYear,
  validateStringV2,
  validateNumber,
} from "../../../utils/validations";
import { startValues, saveData } from "./helpers";

const SetDateModal = ({ name, openCloseFields }) => {
  const [field, , helpers] = useField(name);
  const [fieldNum, setFieldNum] = useState(1);
  const [day, setDay] = useState("");
  const [dayToSave, setDayToSave] = useState("");
  const [month, setMonth] = useState("");
  const [monthToSave, setMonthToSave] = useState("");
  const [year, setYear] = useState("");
  const [yearToSave, setYearToSave] = useState("");
  const [focusMem, setFocusMem] = useState([1]);
  useEffect(() => {
    startValues(
      field,
      setDay,
      setDayToSave,
      setMonth,
      setMonthToSave,
      setYear,
      setYearToSave,
      setFieldNum,
      setFocusMem
    );
  }, []);
  useEffect(() => {
    if (focusMem.includes(4)) {
      saveData(openCloseFields, dayToSave, monthToSave, yearToSave, helpers);
    }
  }, [focusMem]);
  const onClose = (e) => {
    e.stopPropagation();
    if (e.target.dataset.fieldswrap) return;
    const elemClass = e.target.classList.value.split("_")[0];
    if (elemClass === "SetDateModal") {
      saveData(openCloseFields, dayToSave, monthToSave, yearToSave, helpers);
    }
  };
  return (
    <div className={styles.SetDateModal} onClick={onClose}>
      <div className={styles.SetDateModal__bgc} data-overlay></div>
      <div className={styles.SetDateModal__fieldsBlock} data-fieldswrap>
        <section className={styles.SetDateModal__fieldsBlock_dateBlock}>
          <SelectField
            options={daysInMonthV2}
            value={day}
            onChange={setDay}
            validate={validateDay}
            label="Day"
            onSave={setDayToSave}
            focus={fieldNum === 1}
            setFieldNum={setFieldNum}
            focusMem={focusMem}
            setFocusMem={setFocusMem}
            fieldNum={fieldNum}
            
          />
        </section>
        <section className={styles.SetDateModal__fieldsBlock_dateBlock}>
          <SelectField
            options={monthNamesV2}
            value={month}
            onChange={setMonth}
            validate={validateStringV2}
            label="Month"
            onSave={setMonthToSave}
            focus={fieldNum === 2}
            setFieldNum={setFieldNum}
            focusMem={focusMem}
            setFocusMem={setFocusMem}
            fieldNum={fieldNum}
          />
        </section>
        <section className={styles.SetDateModal__fieldsBlock_dateBlock}>
          <SelectField
            options={oneHundredAndTwentyYears}
            value={year}
            onChange={setYear}
            validate={validateYear}
            label="Year"
            onSave={setYearToSave}
            focus={fieldNum === 3}
            setFieldNum={setFieldNum}
            focusMem={focusMem}
            setFocusMem={setFocusMem}
            fieldNum={fieldNum}
          />
        </section>
      </div>
    </div>
  );
};

export default SetDateModal;
