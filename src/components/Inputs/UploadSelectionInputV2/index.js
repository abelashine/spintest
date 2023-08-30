import React, { useState } from "react";
import { useField, Field } from "formik";
import styles from "./UploadSelectionInput.module.scss";
import dropdown from "../../../static/icons/drop-2.png";

export const UploadSelectionInputV2 = ({ name, variants, onItemClick }) => {
  const [, , helpers] = useField(name);
  const [isOpened, setIsOpened] = useState(false);

  const itemClick = (e, data) => {
    if (data.name === "VOUCHER CODE") {
      onItemClick(null);
    } else onItemClick(data);
    helpers.setValue(data.value);
    setIsOpened(false);
  };

  return (
    <div
      className={styles.UploadSelectionInput}
      onClick={() => setIsOpened(!isOpened)}
    >
      <div className={styles.customInput}>
        {/* <Field name={name} readOnly /> */}
        <input value={name} placeholder={"Choose how to pay"} readOnly={true} />
      </div>
      <div className={styles.dropdown}>

        <img
          src={dropdown}
          alt="arrowicon"
          className={`${styles.arrow} ${isOpened ? styles.opened : styles.notopened}`}
        />
        {variants && isOpened && (
          <ul className={styles.variants}>
            {variants.map((data, index) => {
              return (
                <li
                  key={index}
                  className={styles.variant}
                  onClick={(e) => itemClick(e, data)}
                >
                  {data.value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
export default UploadSelectionInputV2;
