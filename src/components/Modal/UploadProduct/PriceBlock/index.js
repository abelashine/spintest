import React from "react";
import styles from "./PriceBlock.module.scss";
import UploadSelectionInput from "../../../Inputs/UploadSelectionInput";

const PriceBlock = ({ characteristics, errors, touched, values, label }) => {
  values.price = String(values.price);
  const priceStringArr = Array.from(values.price);

  if (priceStringArr.length > 14)
    priceStringArr.splice(14, priceStringArr.length);
  for (let i = 0; i < priceStringArr.length; i++) {
    if (priceStringArr[i] === " ") priceStringArr.splice(i);
    if (
      priceStringArr[i] == "0" &&
      i == 0 &&
      (priceStringArr[i + 1] == "0" ||
        (priceStringArr[i + 1] && priceStringArr[i + 1] != "."))
    )
      priceStringArr.splice(i, 1);
    if (priceStringArr[i] === ".") {
      if (i === 0) priceStringArr.splice(0, 1);
      for (let idx = i + 1; idx < priceStringArr.length; idx++) {
        if (isNaN(priceStringArr[idx])) priceStringArr.splice(idx, 1);
        if (priceStringArr.length - idx > 2)
          priceStringArr.splice(idx, priceStringArr.length);
      }
      while (priceStringArr.indexOf(".") !== priceStringArr.lastIndexOf(".")) {
        priceStringArr.splice(priceStringArr.lastIndexOf("."), 1);
      }
    }
    if (isNaN(priceStringArr[i]) && priceStringArr[i] !== ".")
      priceStringArr.splice(i, 1);
  }
  values.price = priceStringArr.join("");
  if (isNaN(values.price)) {
    // in case the user tries to paste bad stuff in the field
    values.price = "";
  }
  return (
    <div className={styles.selectsGroup}>
      <UploadSelectionInput
        name="price"
        label={label || "Price"}
        placeholder="*Type here..."
        type="text"
        isError={{ text: errors.price, touched: touched.price }}
      />
      <UploadSelectionInput
        name="currency_id"
        label="Currency"
        type="select"
        placeholder="*Currency"
        variants={characteristics.currencies}
        saveId
      />
    </div>
  );
};

export default PriceBlock;
