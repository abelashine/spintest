import React from "react";
import styles from "./PriceBlock.module.scss";
import UploadSelectionInput from "../../../Inputs/UploadSelectionInput";
import { useFormikContext } from "formik";
import { validateFormikComponentNumber, validatePrice } from "../../../../utils/validations";

const PriceBlock = ({ characteristics, labelText }) => {
  const { values, errors, touched } = useFormikContext();
  validateFormikComponentNumber(values, "itemprice");
  validatePrice(values, 'itemprice', characteristics.zero_decimal_currencies);
  return (
    <div className={styles.selectsGroup}>
      <UploadSelectionInput
        name="itemprice"
        label={labelText}
        placeholder="*Type here..."
        type="text"
        isError={{ text: errors.itemprice, touched: touched.itemprice }}
      />
      <UploadSelectionInput
        name="itemcurrency"
        label="Currency"
        type="select"
        placeholder="*Currency"
        variants={characteristics.currencies}
      />
    </div>
  );
};

export default PriceBlock;
