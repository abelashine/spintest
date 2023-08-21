import React from "react";
import styles from "./ProfileModal.module.scss";
import TextField from "../../Inputs/TextField";
import DateTextFields from "../../../components/Inputs/DateTextFields";
import phones from "../../../static/phones.json";
import { useState } from "react";
import SelectCityV5 from "../../Inputs/SelectCityV5";
import SelectAccountTypes from "../../Inputs/SelectAccountTypes";

const PublicDetailCompany = () => {
  const [cities, setCities] = useState(["City 1", "City 2", "City 3"]);

  const [phoneCodes, setPhoneCodes] = useState(phones);
  return (
    <>
      <div className={styles.randomMargin}></div>

      <SelectAccountTypes name="category" />
      <div className={styles.randomMargin}></div>
      <TextField
        name="profile_name"
        type="text"
        label="Profile name"
        variant="outlined"
      />
     
      <TextField
        name="user_name"
        type="text"
        label="Username"
        variant="outlined"
      />
      <TextField
        name="company_story"
        type="text"
        label="Company story"
        variant="outlined"
      />
      <DateTextFields
        name="company_founding_date"
        label="Company founding date"
      />

      <SelectCityV5 name="city" setCities={setCities} options={cities} />
    </>
  );
};

export default PublicDetailCompany;
