import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import styles from "./Signup.module.scss";
import WizardForm from "../../../components/WizardForm";
import DateTextFields from "../../../components/Inputs/DateTextFields";
import ImageUploader from "../../../components/Inputs/ImageUploader";
import SelectGender from "../../../components/Inputs/SelectGender";
import SelectCityV3 from "../../../components/Inputs/SelectCityV3";
import TopPart from "./TopPart";

const StepTwo = ({ cities, setCities }) => {
  const { values } = useFormikContext();
  useEffect(() => {
    localStorage.setItem("firsttime", "true");
  }, []);

  return (
    <WizardForm.Page>
      <TopPart />

      <div className={styles.imageUploader}>
        <ImageUploader
          name="image"
          placeholder="Choose your profile picture"
          withCrop={false}
        />
      </div>
      <p className={styles.formMessage}>
        Great to meet you, {values.first_name},<br />
        one final step and we are ready to go!
      </p>
      <DateTextFields name="birth_date" label="Birthday" />
      <div className={styles.selects}>
        <SelectGender name="gender" autoComplete="off" />
        <SelectCityV3 name="city" setCities={setCities} options={cities} />
      </div>
    </WizardForm.Page>
  );
};

export default React.memo(StepTwo);
