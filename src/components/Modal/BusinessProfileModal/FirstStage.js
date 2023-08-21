import React, { useState } from "react";
import { useFormikContext } from "formik";

import styles from "./BusinessProfileModal.module.scss";

import WizardForm from "../../../components/WizardForm";
import ImageUploader from "../../../components/Inputs/ImageUploader";
import CheckboxBlack from "../../../components/Inputs/CheckboxBlack";
import SelectAccountTypes from "../../Inputs/SelectAccountTypes";
import PhoneLineBlock from "../../Inputs/PhoneLineBlock/PhoneLineBlock";
import phones from "../../../static/phones.json";
import SelectGender from "../../../components/Inputs/SelectGender";

const FirstStage = () => {
  const { values, errors, touched } = useFormikContext();

  console.log("third stage", values);
  const [phoneCodes, setPhoneCodes] = useState(phones);
  const searchCountryCode = (query) => {
    setPhoneCodes(phones.filter((item) => item.value.includes(query)));
  };

  return (
    <WizardForm.Page>
      <div className={styles.firstStepText}>
        Start creating your business account on SPIN!
      </div>
      <div className={styles.secondStepText}>
        Please upload your company logo.
      </div>

      
      <SelectAccountTypes name="accounttype" />
      <div className={styles.imageUploaderStepOne}>
        <ImageUploader
          name="profile"
          placeholder="Upload profile log"
          message="(.png 2000*2000)"
        />
      </div>
      <div className={styles.imageUploaderStepOneRectangular}>
        <ImageUploader
          name="label"
          placeholder="Upload label logo"
          message="(.png 3000*3000; white background is suggested)"
          isRectangular={true}
        />
      </div>
      <div className={styles.terms}>
        <CheckboxBlack name="policy" value={values.policy} />
        <span>
          I accept the&nbsp;
          <a
            href="https://www.lablaco.com/user-terms"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.termsLink}
          >
            terms and conditions
          </a>
        </span>
      </div>
    </WizardForm.Page>
  );
};

export default FirstStage;
