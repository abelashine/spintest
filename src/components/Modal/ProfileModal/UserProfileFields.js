import React from "react";
import TextField from "../../Inputs/TextField";
import SelectV2 from "../../Inputs/SelectV2";
import { gendersDataV3 } from "../../../static/data/dataForForms";
import { useFormikContext } from "formik";

const UserProfileFields = () => {
  const data = useFormikContext();
  return (
    <>
      <TextField
        name="first_name"
        type="text"
        variant="underline"
        label="Name"
      />
      <TextField
        name="last_name"
        type="text"
        variant="underline"
        label="Surname"
      />
      <SelectV2
        name="gender"
        label="Gender"
        options={gendersDataV3}
        readOnly={true}
      />
      <TextField
        name="birth_date"
        type="text"
        variant="underline"
        label={data.errors.birth_date || "Birthday"}
      />
    </>
  );
};

export default UserProfileFields;
