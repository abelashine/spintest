import React, { useState, useRef } from "react";
import { useField } from "formik";
import styles from "./Select.module.scss";
import classNames from "classnames";
import { useSetSearchCityHook } from "../../../utils/hooks";

export default ({
  label,
  variant,
  options,
  isAutocomplete,
  isSimpleDropdown,
  isTypeAndDropdown,
  onAutocomplete,
  placeholder,
  saveId,
  withoutOpacity,
  errorLabel,
  inlineStyle,
  setStartData,
  setCity,
  validateSymbols,
  ...props
}) => {
  const { name } = props;
  const [isOpened, setIsOpened] = useState(false);
  const [field, meta, helpers] = useField(props);
  const [fieldValue, setFieldValue] = useState("");
  const textInp = useRef(null);
  if (setCity) {
    useSetSearchCityHook(field.value, setCity);
  }
  function handleClick() {
    textInp.current.focus();
  }
  const onChangeHandler = (value) => {
    onAutocomplete(value);
    setFieldValue(value);
    setIsOpened(true);
  };
  const handleOnBlurDiv = () => {
    if (label === "Phone number" && meta.error && setStartData) {
      helpers.setValue("+");
      setStartData();
    } else helpers.setTouched(name);
    setIsOpened(false);
  };
  const noOpacity =
    (meta.touched && meta.error && withoutOpacity) || !isOpened
      ? styles.placeHolderNoOpacity
      : "";
  const onChange = ({ target: { value } }) => {
    if (onAutocomplete) onAutocomplete(value);
    let val = value;
    if (validateSymbols) val = validateSymbols(val);
    label === "Phone number" && val[0] !== "+"
      ? helpers.setValue(`+${val}`)
      : helpers.setValue(value);
    setIsOpened(true);
  };
  return (
    <>
      <div
        className={styles.Select}
        invalid={meta.touched ? meta.error : undefined}
        variant={variant}
        opened={`${isOpened}`}
        onClick={() => setIsOpened(!isOpened)}
        style={inlineStyle ? inlineStyle : null}
        onBlur={handleOnBlurDiv}
      >
        {isAutocomplete &&
        !isTypeAndDropdown &&
        !isSimpleDropdown &&
        !errorLabel ? (
          <input
            className={classNames(styles.label, noOpacity)}
            type="text"
            value={field.value}
            ref={textInp}
            onClick={handleClick}
            onChange={onChange}
            placeholder={
              isOpened
                ? "Type here..."
                : meta.touched && meta.error
                ? meta.error
                : placeholder
            }
          />
        ) : isAutocomplete &&
          !isTypeAndDropdown &&
          !isSimpleDropdown &&
          errorLabel ? (
          <>
            <input
              className={classNames(styles.label, `select_${name}`, noOpacity)}
              type="text"
              value={field.value}
              ref={textInp}
              onClick={handleClick}
              onChange={({ target: { value } }) => {
                onAutocomplete(value);
                label === "Phone number" && value[0] !== "+"
                  ? helpers.setValue(`+${value}`)
                  : helpers.setValue(value);
                setIsOpened(true);
              }}
              placeholder={
                isOpened
                  ? "Type here..."
                  : meta.touched && meta.error
                  ? meta.error
                  : placeholder
              }
            />
            <span className={styles.label}>
              {meta.value && meta.touched ? meta.error : ""}
            </span>
          </>
        ) : isSimpleDropdown ? (
          <input
            className={classNames(styles.label, `select_${name}`, noOpacity)}
            type="text"
            value={fieldValue}
            ref={textInp}
            onClick={handleClick}
            onChange={({ target: { value } }) => {
              setFieldValue(value);
              helpers.setValue(value);
              setIsOpened(true);
            }}
            placeholder={meta.touched && meta.error ? meta.error : placeholder}
          />
        ) : isAutocomplete && isTypeAndDropdown && !saveId ? (
          <input
            className={classNames(styles.label, `select_${name}`, noOpacity)}
            type="text"
            value={field.value}
            ref={textInp}
            onClick={handleClick}
            onChange={({ target: { value } }) => {
              if (!setCity && onAutocomplete) onAutocomplete(value);
              helpers.setValue(value);
              setIsOpened(true);
            }}
            placeholder={meta.touched && meta.error ? meta.error : placeholder}
          />
        ) : isAutocomplete && isTypeAndDropdown && saveId ? (
          <input
            className={classNames(styles.label, `select_${name}`, noOpacity)}
            type="text"
            value={fieldValue}
            ref={textInp}
            onClick={handleClick}
            onChange={({ target: { value } }) => onChangeHandler(value)}
            placeholder={meta.touched && meta.error ? meta.error : placeholder}
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
        >
          <path
            fill={
              variant === "outlined"
                ? meta.touched && meta.error
                  ? "var(--tomato)"
                  : "var(--white)"
                : meta.touched && meta.error
                ? "var(--tomato)"
                : "var(--black)"
            }
            fillRule="evenodd"
            d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
          />
        </svg>
        {options?.length !== 0 && (
          <div className={styles.optionsWrapper}>
            <div className={styles.options}>
              {options.map((data, index) => {
                const { value, name, label } = data;
                const outingValue = name ? name : value ? value : label;
                return (
                  <div
                    key={index}
                    className={styles.option}
                    onMouseDown={(e) => {
                      setFieldValue(outingValue);
                      helpers.setValue(String(outingValue));
                      setIsOpened(false);
                    }}
                  >
                    {outingValue}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {variant === "outlined" && <div className={styles.overlay} />}
    </>
  );
};
