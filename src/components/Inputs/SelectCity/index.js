import React, { useState, useRef, useEffect } from "react";
import { useField } from "formik";
import styles from "./SelectCity.module.scss";
import classNames from "classnames";
import { useSetSearchCityHook } from "../../../utils/hooks";

export default ({
  label,
  variant,
  options,
  isAutocomplete,
  placeholder,
  setCities,
  ...props
}) => {
  const fieldWrapperRef = useRef(null)
  const { name } = props;

  const [isOpened, setIsOpened] = useState(false);

  const [field, meta, helpers] = useField(props);

  const textInp = useRef(null);
  const labelRef = useRef(null);

  useSetSearchCityHook(field.value, setCities);

  function handleClick() {
    textInp.current.focus();
    fieldWrapperRef.current.style.zIndex = "2"
  }

  function blurTextInput() {
    textInp.current.blur();
    fieldWrapperRef.current.style.zIndex = "0"
  }

  function handlerDoubleClick() {
    textInp.current.focus();
    textInp.current.select();
  }

  const onBlurHandler = () => {
    helpers.setTouched(true);
    setIsOpened(false);
    fieldWrapperRef.current.style.zIndex = "0"
  };

  useEffect(() => {
    if (field.value || (field.value && !isOpened)) {
      labelRef.current.style.display = "none";
    }
  }, [field.name, isOpened]);

  return (
    <>
      <div
        ref={fieldWrapperRef}
        id="cityField"
        className={styles.Select2}
        invalid={meta.touched ? meta.error : undefined}
        variant={variant}
        opened={`${isOpened}`}
        onMouseDown={() => {
          handleClick();
        }}
        onClick={() => {
          setIsOpened((prevState) => !prevState);
          handleClick();

          if (!isOpened) {
            document.getElementById("cityLabel").style.display = "block";
            document.getElementById("cityLabel").style.fontSize = "0.675rem";
            document.getElementById("cityLabel").style.color = "gray";
            // Don't render Type here if city is selected
            if (!document.getElementsByClassName(styles.label)[0].value) {
              document.getElementsByClassName(
                styles.cityPlaceholder
              )[0].style.display = "block";
            }
            // City input -> on bottom
            const cityInput = document
              .getElementsByClassName(styles.Select2)[0]
              .getElementsByTagName("input")[0];
            cityInput.style.marginTop = "10px";
            cityInput.style.fontSize = "0.625rem";
          } else {
            document.getElementById("cityLabel").style.fontSize = "1.1875rem";
            document.getElementById("cityLabel").style.color = "white";
            document.getElementsByClassName(
              styles.cityPlaceholder
            )[0].style.display = "none";
            const cityInput = document
              .getElementsByClassName(styles.Select2)[0]
              .getElementsByTagName("input")[0];
            cityInput.style.fontSize = "1.1875rem";

            cityInput.style.marginTop = "0";
            blurTextInput();
          }
        }}
        onDoubleClick={handlerDoubleClick}
        onBlur={onBlurHandler}
      >
        {isAutocomplete ? (
          <div className="">
            <input
              className={classNames(styles.label, `select_${name}`)}
              type="text"
              value={field.value}
              onBlur={() => {
                setIsOpened(false);
                const cityLabel = document.getElementById("cityLabel");
                cityLabel.style.fontSize = "1.1875rem";
                cityLabel.style.color = "white";
                document.getElementsByClassName(
                  styles.cityPlaceholder
                )[0].style.display = "none";

                const cityInput = document
                  .getElementsByClassName(styles.Select2)[0]
                  .getElementsByTagName("input")[0];
                cityInput.style.marginTop = "0";
                cityInput.style.fontSize = "1.1875rem";
              }}
              ref={textInp}
              onClick={() => {
                handleClick();
                const cityLabel = document.getElementById("cityLabel");

                if (field.value) {
                  cityLabel.style.display = "none";
                  document.getElementsByClassName(
                    styles.cityPlaceholder
                  )[0].style.display = "none";
                }
              }}
              onChange={({ target: { value } }) => {
                const cityPlaceholder = document.getElementsByClassName(
                  styles.cityPlaceholder
                )[0];
                if (value) {
                  cityPlaceholder.style.display = "none";
                }
                helpers.setValue(value);
                setIsOpened(true);
              }}
            />

            <span className={styles.cityPlaceholder}> </span>
          </div>
        ) : (
          <span className={styles.ololo}>
            {meta.touched ? (!props.noValidate && meta.error) || label : label}
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
                }}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
        <span ref={labelRef} className={styles.ololo} id="cityLabel">
          {meta.touched ? (!props.noValidate && meta.error) || label : label}
        </span>
      </div>
      {variant === "outlined" && <div className={styles.overlay} />}
    </>
  );
};
