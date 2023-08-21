import React, { useState, useRef } from "react";
import { useField } from "formik";
import styles from "./SelectCity.module.scss";
import classNames from "classnames";
import { useSetSearchCityHook } from "../../../utils/hooks";

export default ({
  label,
  variant,
  options,
  isAutocomplete,
  onAutocomplete,
  placeholder,
  setCity,
  name,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [field, meta, helpers] = useField(name);
  if (setCity) {
    useSetSearchCityHook(field.name, setCity);
  }
  const textInp = useRef(null);
  function handlerDoubleClick() {
    textInp.current.focus();
    textInp.current.select();
  }

  return (
    <>
      <div
        style={{ zIndex: 100400 }}
        id="cityField"
        className={styles.Select2}
        invalid={meta.touched ? meta.error : undefined}
        variant={variant}
        opened={`${isOpened}`}
        onClick={() => {
          setIsOpened(true);
          // Change z-index
          if ((prevState) => prevState) {
            document.getElementById("cityField").style.zIndex = "228228228";
          } else {
            document.getElementById("cityField").style.zIndex = "100400";
          }
        }}
      >
        {isAutocomplete ? (
          <input
            className={classNames(styles.label, `select_${name}`)}
            type="text"
            value={field.value}
            onBlur={() => {
              document.getElementById("cityField").style.zIndex = "100400";
            }}
            ref={textInp}
            onChange={({ target: { value } }) => {
              onAutocomplete(value);
              label === "Phone number" && value[0] !== "+"
                ? helpers.setValue(`+${value}`)
                : helpers.setValue(value);
              setIsOpened(true);
            }}
            onDoubleClick={handlerDoubleClick}
            placeholder={
              isOpened
                ? "Type here..."
                : meta.touched && meta.error
                ? meta.error
                : placeholder
            }
          />
        ) : (
          <span className={styles.label}>
            {meta.touched && meta.error ? meta.error : field.value || label}
          </span>
        )}
        <svg
          className={styles.arrow}
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="14"
          onClick={(e) => {
            const inp = document.getElementsByClassName(`select_${name}`);
            inp[0].focus();
          }}
        >
          <path
            fill={
              variant === "outlined"
                ? meta.touched && meta.error
                  ? "var(--tomato)"
                  : "var(--white)"
                : "var(--black)"
            }
            fillRule="evenodd"
            d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
          />
        </svg>

        <div className={styles.optionsWrapper}>
          <div className={styles.options} style={{ display: "block" }}>
            {options.map(({ value }, index) => (
              <div
                style={{ display: "block" }}
                key={index}
                className={styles.option}
                onMouseDown={(e) => {
                  helpers.setValue(value);
                  setIsOpened(false);
                }}
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
