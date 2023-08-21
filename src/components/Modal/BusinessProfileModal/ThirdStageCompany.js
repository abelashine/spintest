import React, { useState } from "react";
import { useFormikContext } from "formik";
import TextField from "../../Inputs/TextField";
import PhoneLineBlock from "../../Inputs/PhoneLineBlock/PhoneLineBlock";
import phones from "../../../static/phones.json";

import styles from "./BusinessProfileModal.module.scss";
import ImageUploader from "../../Inputs/ImageUploader";
import CustomFileInput from "../ProfileModal/CustomFileInput";

const ThirdStageCompany = ({ name }) => {
  const { values, errors, touched } = useFormikContext();

  console.log("third stage", values);
  const [phoneCodes, setPhoneCodes] = useState(phones);
  const searchCountryCode = (query) => {
    setPhoneCodes(phones.filter((item) => item.value.includes(query)));
  };
  
  

  return (
    <div>
      <div className={styles.imageUploaderStepOne}>
        <ImageUploader
          name="profile"
          placeholder="Choose your profile picture"
          type="round"
        />
      </div>
      <div className={styles.formMessage}>
        Welcome on board {values.profile_name} ,Please ,<br />
        enter your company information
      </div>
      <TextField
        name="company_name"
        type="text"
        label="Company name"
        variant="outlined"
      />{" "}
      <TextField
        name="tax_no"
        type="text"
        label="Tax no. / Vat"
        variant="outlined"
      />
      <TextField
        name="legal_address"
        type="text"
        label="Legal address"
        variant="outlined"
      />{" "}
      <TextField
        name="postal_code"
        type="text"
        label="Postal code (if any)"
        variant="outlined"
      />{" "}
      <TextField
        name="company_email"
        type="text"
        label="General Company email"
        variant="outlined"
      />{" "}
      <TextField
        name="contact_person"
        type="text"
        label="Contact person"
        variant="outlined"
      />
      <PhoneLineBlock
        phoneCodes={phoneCodes}
        searchCountryCode={searchCountryCode}
        setPhoneCodes={setPhoneCodes}
      />
      <CustomFileInput label={"UPLOAD COMPANY CONSTITUTION"}/>
    </div>
  );
};

export default ThirdStageCompany;
