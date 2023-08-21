import React from "react";
import { useField } from "formik";
import InputMask from "react-input-mask";
import styles from "./PasswordField.module.scss";

export default ({
  label,
  variant,
  placeholder,
  area,
  cityAutocomplete,
  noLabel,
  validateSymbols,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name);
  const onChangeHandler = (event) => {
    if (validateSymbols) {
      const data = validateSymbols(event.target.value);
      helpers.setValue(data);
    } else if (field.name === "iban" || field.name === "bic_swift") {
      helpers.setValue(event.target.value.trim());
    } else helpers.setValue(event.target.value);
  };
  return (
    <label
      className={`${styles.TextField} ${styles[variant]}`}
      invalid={meta.touched ? !props.noValidate && meta.error : undefined}
    >
      {area ? (
        <textarea
          placeholder={placeholder}
          rows={3}
          {...props}
          {...field}
          onChange={onChangeHandler}
        />
      ) : props.type === "date" ? (
        <InputMask
          mask="99.99.9999"
          maskPlaceholder={props.maskPlaceholder}
          {...field}
          type="text"
          onChange={onChangeHandler}
          onBlur={field.onBlur}
        >
          <input placeholder={placeholder || " "} />
        </InputMask>
      ) : (
        <input
          placeholder={placeholder || " "}
          {...props}
          {...field}
          onChange={onChangeHandler}
        />
      )}{" "}
     
     {!noLabel && (
  <span className={styles.label}>
    Password
    {/* {meta.touched ? (!props.noValidate && meta.error) || label : label} */}
  </span>
)}
    </label>
  );
};
