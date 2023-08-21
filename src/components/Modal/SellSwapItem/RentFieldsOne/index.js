import React from "react";
import { useFormikContext } from "formik";
import PriceBlock from "../PriceBlock";
import UploadSelectionInput from "../../../Inputs/UploadSelectionInput";
import { validateFormikComponentNumber } from "../../../../utils/validations";

const RentFieldsOne = ({ characteristics }) => {
  const { values, errors, touched } = useFormikContext();
  validateFormikComponentNumber(values, "itempriceperday");
  return (
    <>
      <PriceBlock characteristics={characteristics} labelText="Item value" />
      <UploadSelectionInput
        name="itempriceperday"
        label="Item price per day"
        placeholder="*Type here..."
        type="text"
        isError={{
          text: errors.itempriceperday,
          touched: touched.itempriceperday
        }}
      />
    </>
  );
};

export default RentFieldsOne;
