import React, { useState } from "react";
import { useField, Field } from "formik";
import styles from "./UploadSelectionInput.module.scss";

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
      <Field name={name} readOnly />
      <div className={styles.dropdown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="14"
          className={`${styles.arrow} ${isOpened ? styles.opened : ""}`}
        >
          <path
            fill="var(--white)"
            fillRule="evenodd"
            d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
          />
        </svg>
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
