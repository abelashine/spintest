import React from "react";
import styles from "../../Modal/BusinessProfileModal/BusinessProfileModal.module.scss";
import TextField from "../../Inputs/TextField";
import { useFormikContext } from "formik";
import phones from "../../../static/phones.json";
import { useState } from "react";

import {
  validateNumber,
} from "../../../utils/validations";
import SelectField from "./SelectField";



const PhoneLineBlock = ({ phoneCodes, searchCountryCode, setPhoneCodes }) => {

  const { errors, touched } = useFormikContext();
  const labelText =
    (touched.phoneNumber && errors.phoneNumber) || "Phone number";
  const setStartData = () => setPhoneCodes(phones);
  const [phone, setPhone] = useState("");
  const [phoneToSave, setPhoneToSave] = useState("");
  const [focusMem, setFocusMem] = useState([1]);
  const [fieldNum, setFieldNum] = useState(1);





  return (
    <div className={styles.phoneContainer}>
      <div className={styles.phoneCodes}>
        <SelectField
          options={phones}
          value={phone}
          onChange={setPhone}
          validate={validateNumber}
          label="Phone"
          onSave={setPhoneToSave}
          focus={fieldNum === 1}
          setFieldNum={setFieldNum}
          focusMem={focusMem}
          setFocusMem={setFocusMem}
          fieldNum={fieldNum}
        />

      </div>
      <div className={styles.phoneField}>
        <TextField
          name="phone_number"
          type="text"
          placeholder={errors.phoneNumber ? "" : "000 00 000 00"}
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default PhoneLineBlock;
