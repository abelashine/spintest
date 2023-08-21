import React, { useState } from "react";
import styles from "./Fields.module.scss";
import { searchDay, searchMonth, searchYear } from "../helpers";
import {
  daysInMonth,
  monthNames,
  oneHundredAndTwentyYearsForward,
} from "../../../../static/data/dataForForms";

import Select from "../../../Inputs/Select";

const DateFields = () => {
  const [days, setDays] = useState(daysInMonth);
  const [monthsField, setMonthsField] = useState(monthNames);
  const [years, setYears] = useState(oneHundredAndTwentyYearsForward);
  return (
    <div
      id={styles.selectFieldDropdown}
      className={styles.Fields__selectFieldDropdown}
    >
      <p>Expiration date</p>
      <Select
        name="expirationdate[2]"
        variant="underline"
        options={days}
        placeholder="Day"
        isAutocomplete
        onAutocomplete={(query) => searchDay(query, setDays)}
        isTypeAndDropdown
        inlineStyle={{ zIndex: "3" }}
        autoComplete="off"

      />
      <Select
        name="monthName"
        variant="underline"
        options={monthsField}
        placeholder="Month"
        isAutocomplete
        onAutocomplete={(query) => searchMonth(query, setMonthsField)}
        isTypeAndDropdown
        inlineStyle={{ zIndex: "2" }}
        autoComplete="off"

      />
      <Select
        name="expirationdate[0]"
        variant="underline"
        options={years}
        placeholder="Year"
        isAutocomplete
        onAutocomplete={(query) => searchYear(query, setYears)}
        isTypeAndDropdown
        inlineStyle={{ zIndex: "1" }}
        autoComplete="off"

      />
    </div>
  );
};

export default DateFields;
