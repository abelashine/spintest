import React, { useState } from "react";

import SelectGender from "../../../components/Inputs/SelectGender";
import DateTextFields from "../../../components/Inputs/DateTextFields";

import phones from "../../../static/phones.json";
import PhoneLineBlock from "../../Inputs/PhoneLineBlock/PhoneLineBlock";
import styles from "./BusinessProfileModal.module.scss";
import ImageUploader from "../../Inputs/ImageUploader";
import { useFormikContext } from "formik";
import CustomFileInput from "./CustomFileInput";

const ThirdStageIndividiual = () => {
  const [phoneCodes, setPhoneCodes] = useState(phones);
  const { values, errors, touched } = useFormikContext();

  const searchCountryCode = (query) => {
    setPhoneCodes(phones.filter((item) => item.value.includes(query)));
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedFile(reader.result);
      };

      reader.readAsDataURL(file);
    }
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

      <DateTextFields name="birth_date" label="Birthday" />
             <SelectGender name="gender" autoComplete="off" />

      <div className={styles.randomMargin}></div>

      <PhoneLineBlock
        phoneCodes={phoneCodes}
        searchCountryCode={searchCountryCode}
        setPhoneCodes={setPhoneCodes}
      />

     <CustomFileInput label={"UPLOAD COPY OF ID"} />
    </div>
  );
};

export default ThirdStageIndividiual;
