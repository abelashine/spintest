import React from "react";
import ImageUploader from "../../Inputs/ImageUploader";
import WizardForm from "../../WizardForm";
import styles from "./BusinessProfileModal.module.scss";
import TextField from "../../Inputs/TextField";
import DateTextFields from "../../../components/Inputs/DateTextFields";
import phones from "../../../static/phones.json";
import { useState } from "react";
import SelectCityV5 from "../../Inputs/SelectCityV5";
import SelectBusinessTypes from "../../Inputs/SelectBusinessTypes";

const SecondStageCompany = () => {
  // Not sure why this is used i don't want to touch the parent component(breaks the code )
  // While this code works mysteriouslu
  const [cities, setCities] = useState(["City 1", "City 2", "City 3"]);

  const [phoneCodes, setPhoneCodes] = useState(phones);

  return (
    <WizardForm.Page>
      <div className={styles.imageUploaderStepOne}>
        <ImageUploader
          name="profile"
          placeholder="Choose your profile picture"
          type="round"
        />
      </div>
      <p className={styles.formMessage}>
        Please enter the information about your business.
      </p>

      <SelectBusinessTypes name="category" />
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
    </WizardForm.Page>
  );
};

export default SecondStageCompany;
