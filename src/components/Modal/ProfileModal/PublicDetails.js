import React from "react";
import TextField from "../../Inputs/TextField";
import SelectCityV4 from "../../Inputs/SelectCityV4";
import styles from "./ProfileModal.module.scss";

const PublicDetails = ({ cities, setCities, isBusinessAccount }) => {
  return (
    <>
      {
          !isBusinessAccount &&
            <div className={styles.detailsTitle}>Public Details</div>
      }
      <TextField
        name="slug"
        type="text"
        label="Username"
        variant="underline"
        readOnly
      />
      <TextField
        name="name"
        type="text"
        label="Profile Name"
        variant="underline"
      />
      <SelectCityV4
        name="city"
        label="City"
        setCity={setCities}
        cities={cities}
      />
    </>
  );
};

export default PublicDetails;
