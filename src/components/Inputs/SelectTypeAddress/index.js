import React, { useState } from "react";
import { useField } from "formik";
import styles from "./Select.module.scss";

export default ({
  label,
  variant,
  options,
  isAutocomplete,
  onAutocomplete,
  placeholder,
  ...props
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const [field, , helpers] = useField(props);
  return (
    <>
      <div
        className={styles.Select}
        variant={variant}
        opened={`${isOpened}`}
        onClick={() => setIsOpened((prevState) => !prevState)}
      >
        {isAutocomplete ? (
          <input
            className={styles.label}
            type="text"
            value={field.value}
            onChange={({ target: { value } }) => {
              onAutocomplete(value);
              label === "Phone number" && value[0] !== "+"
                ? helpers.setValue(`+${value}`)
                : helpers.setValue(value);
              setIsOpened(true);
            }}
            placeholder={
              label === "City" && isOpened ? "Type here..." : placeholder
            }
          />
        ) : (
          <span className={styles.label}>{field.value || label}</span>
        )}
        <svg
          className={styles.arrow}
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="14"
        >
          <path
            fill={variant === "outlined" ? "var(--white)" : "var(--black)"}
            fillRule="evenodd"
            d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
          />
        </svg>
        <div className={styles.optionsWrapper}>
          <div className={styles.options}>
            {options.map(({ value }, index) => (
              <div
                key={index}
                className={styles.option}
                onClick={() => helpers.setValue(value)}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
      {variant === "outlined" && <div className={styles.overlay} />}
    </>
  );
};
