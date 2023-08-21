import React from "react";
import { useField, Field } from "formik";
import styles from "./TextFieldV2.module.scss";

const TextFieldV2 = ({ placeholder, name }) => {
  const [, meta] = useField(name);
  return (
    <label
      className={styles.TextFieldV2}
      invalid={meta.touched ? meta.error : undefined}
    >
      <Field
        name={name}
        type="text"
        placeholder={meta.touched ? meta.error : placeholder}
      />
    </label>
  );
};
export default TextFieldV2;
