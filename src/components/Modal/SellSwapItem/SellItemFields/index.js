import React from "react";
import { useFormikContext } from "formik";
import styles from "./SellItemFields.module.scss";
import UploadSelectionInput from "../../../Inputs/UploadSelectionInput";
import PriceBlock from "../PriceBlock";

import { statusesData } from "../../../../static/data/dataForForms";

const SellItemFields = ({ characteristics, isDisabled, productInfo }) => {
  const { values, errors, touched } = useFormikContext();
  return (
    <>
      {isDisabled && (Boolean(productInfo?.status) || Boolean(values?.itemstatus)) && (
        <div className={styles.itemStatus}>
          <UploadSelectionInput
            name="itemstatus"
            label="Item status"
            placeholder="*Select"
            type="select"
            variants={statusesData}
            isError={{
              text: errors.itemstatus,
              touched: touched.itemstatus
            }}
            isDisabled={isDisabled}
          />
        </div>
      )}
      <PriceBlock characteristics={characteristics} labelText="Item price" />
    </>
  );
};

export default SellItemFields;
