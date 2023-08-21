import React, { useState } from "react";
import { useFormikContext } from "formik";
import TextField from "../../Inputs/TextField";
import PhoneLineBlock from "./PhoneLineBlock";
import styles from "./ProfileModal.module.scss";
import ImageUploader from "../../Inputs/ImageUploader";
import phones from "../../../static/phones.json";
import CustomFileInput from "./CustomFileInput";
import SelectCityV6 from "../../Inputs/SelectCityV6";
import Button from "../../Button";

const PrivateDetailCompany = () => {
  const { values, errors, touched } = useFormikContext();
  const [cities, setCities] = useState(["City 1", "City 2", "City 3"]);

  console.log("third stage", values);
  const [phoneCodes, setPhoneCodes] = useState(phones);
  const searchCountryCode = (query) => {
    setPhoneCodes(phones.filter((item) => item.value.includes(query)));
  };
  return (
    <div className={styles.scrollableContainer}>
      <div className={styles.formTitle}>Company Details</div>
      <div className={styles.scrollableContent}>
        <TextField
          name="company_name"
          type="text"
          label="Company name"
          variant="outlined"
        />
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
        />
        <TextField
          name="postal_code"
          type="text"
          label="Postal code (if any)"
          variant="outlined"
        />
        <TextField
          name="company_email"
          type="text"
          label="General Company email"
          variant="outlined"
        />
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
        <CustomFileInput label={"UPLOAD COMPANY CONSTITUTION"} />
        <div className={styles.formTitle}>Bank Details</div>
        <TextField
          name="bank_name"
          type="text"
          label="Bank name"
          variant="outlined"
        />
        <TextField
          name="account_number"
          type="text"
          label="Account number / IBAN "
          variant="outlined"
        />
        <TextField
          name="bic_swift"
          type="text"
          label="BIC /  SWIFT"
          variant="outlined"
        />
        <TextField
          name="beneficary"
          type="text"
          label="Beneficarty /Account name"
          variant="outlined"
        />
        <TextField
          name="bank_address"
          type="text"
          label="Bank Address"
          variant="outlined"
        />
        
        <SelectCityV6 name="city" setCities={setCities} options={cities} />
        <div className={styles.randomMargin}></div>
        <TextField
          name="bank_postal_code"
          type="text"
          label="Bank postal code (if any)"
          variant="outlined"
        />
       

        <div className={styles.randomMargin}></div>
      </div>
    </div>
  );
};

export default PrivateDetailCompany;
