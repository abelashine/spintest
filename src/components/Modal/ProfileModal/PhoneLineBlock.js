import React from "react";
import styles from "./ProfileModal.module.scss";
import TextField from "../../Inputs/TextField";
import Select from "../../Inputs/Select";
import { useFormikContext } from "formik";
import phones from "../../../static/phones.json";

const PhoneLineBlock = ({ phoneCodes, searchCountryCode, setPhoneCodes }) => {
  const { errors, touched } = useFormikContext();
  const labelText =
    (touched.phoneNumber && errors.phoneNumber) || "Phone number";
  const setStartData = () => setPhoneCodes(phones);
  return (
    <div className={styles.phoneContainer}>
      <div className={styles.phoneCodes}>
        <select
          style={{
            borderRadius: 15,
            height: 35,
            border: "1px solid black",
            backgroundColor: "red",
          }}
        >
          {phones.map((code,index) => (
            <option value={code.value} key={index}>
              {code.value}
            </option>
          ))}
        </select>
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

    // <div className={styles.phoneContainer}>
    //   <div className={styles.phoneCodes}>
    //     <Select
    //       options={phoneCodes}
    //       name="countryCode"
    //       label={labelText}
    //       type="text"
    //       placeholder={errors.countryCode || "+00"}
    //       variant="underline"
    //       isAutocomplete
    //       onAutocomplete={(query) => searchCountryCode(query)}
    //       setStartData={setStartData}
    //     />
    //   </div>
    //   <div className={styles.phoneField}>
    //     <TextField
    //       name="phoneNumber"
    //       type="text"
    //       placeholder={errors.phoneNumber ? "" : "000 00 000 00"}
    //       variant="outlined"
    //     />
    //   </div>
    // </div>
  );
};

export default PhoneLineBlock;
