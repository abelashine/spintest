import React, { useState, useEffect, useRef } from "react";
import { useField } from "formik";
import { validateHashtag } from "../../../utils/validations";
import styles from "./UploadSelectionInput.module.scss";
import IsDisabledFieldHOC from "../../../utils/HOCs/IsDisabledFieldHOC";

const inputType = (
  type,
  label,
  variants = null,
  isOpened,
  setIsOpened,
  changeValue,
  readOnly,
  onOpenMyWalletModalVisibility,
  onOpenAddressModalVisibility,
  onClick,
  name,
  saveId,
  diffValue,
  setDiffValue,
  isSpaceBtn,
  isAutocomplete,
  field,
  fieldType
) => {

  const cleanHashTagInput = () => {
    if (diffValue?.length > 0 && diffValue?.trim() === "") return;
    onClick("#" + diffValue);
    setDiffValue("");
  };

  switch (type) {
    case "hashtags":
      return (
        <section className={styles.hashTags}>
          <span>#</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="14"
            className={styles.arrow}
            onClick={isSpaceBtn ? cleanHashTagInput : onClick}
          >
            <path
              fill="var(--white)"
              fillRule="evenodd"
              d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
            />
          </svg>
          <div className={styles.hashtags} />
        </section>
      );

    case "select":
      return (
        <div className={styles.dropdown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="14"
            className={`${styles.arrow} ${isOpened ? styles.opened : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              onClick && onClick(isOpened ? "" : name);
              setIsOpened(true);
            }}
          >
            <path
              fill="var(--white)"
              fillRule="evenodd"
              d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
            />
          </svg>
          {((variants && isOpened && !isAutocomplete) ||
            (variants &&
              isOpened &&
              isAutocomplete &&
              field.value &&
              !saveId)) && (
            <ul className={styles.variants}>
              {variants.map(
                (
                  {
                    name,
                    value,
                    en,
                    currency,
                    address,
                    city,
                    card_last_digits,
                    description,
                    id,
                    btnItem,
                  },
                  index
                ) =>
                  (label === "Payment method" ||
                    label === "Delivery address") &&
                  index === variants.length - 1 ? (
                    <li
                      key={index}
                      className={styles.variant}
                      onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        ev.nativeEvent.stopImmediatePropagation();
                        setIsOpened(false);
                        if (saveId && !isAutocomplete && btnItem) {
                          btnItem(fieldType);
                        } else {
                          label === "Payment method"
                            ? onOpenMyWalletModalVisibility(true)
                            : onOpenAddressModalVisibility(true);
                        }
                      }}
                    >
                      {label === "Payment method"
                        ? card_last_digits || name
                        : address}
                    </li>
                  ) : (
                    <li
                      key={index}
                      className={styles.variant}
                      onClick={(ev) => {
                        const args =
                          value ||
                          en ||
                          currency ||
                          (address && `${address}, ${city.city}`) ||
                          description ||
                          `****${card_last_digits}`;
                        if (saveId && !isAutocomplete && btnItem) {
                          btnItem(fieldType);
                        } else if (saveId && !isAutocomplete) {
                          changeValue(id);
                          setDiffValue(args);
                        } else changeValue(args);
                        ev.preventDefault();
                        ev.stopPropagation();
                        ev.nativeEvent.stopImmediatePropagation();
                        setIsOpened(false);
                      }}
                    >
                      {name ||
                        en ||
                        currency ||
                        (address && `${address}, ${city.city}`) ||
                        description ||
                        `****${card_last_digits}`}
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
      );

    default:
      return;
  }
};

export default ({
  name,
  label,
  placeholder,
  type,
  variants,
  isActive,
  onClick,
  readOnly = true,
  isAutocomplete,
  onOpenMyWalletModalVisibility,
  onOpenAddressModalVisibility,
  isError,
  saveId,
  defaultAddress,
  defaultCard,
  inlineStyle,
  isSpaceBtn,
  isDisabled,
  fieldType,
}) => {
  const [field, , helpers] = useField(name);
  const [isOpened, setIsOpened] = useState(false);
  const [currentVariants, setCurrentVariants] = useState(variants);
  const [diffValue, setDiffValue] = useState(field.value);
  const inputRef = useRef();
  const onAutocomplete = ({ target: { value } }) => {
    helpers.setValue(value);
    variants &&
      setCurrentVariants(() => {
        const totalVariants = variants.filter((variant) => {
          const data = variant.en ? "en" : variant.name ? "name" : null;
          if (!data) return;
          return variant[data].toLowerCase().startsWith(value.toLowerCase().trim());
        });
        if (totalVariants.length > 0) {
          setIsOpened(true);
          return totalVariants;
        }
      });
  };
  
  const cleanInputOnHashTag = (e) => {
    if (e.code !== "Space") return;
    if ( diffValue?.length > 0 && diffValue?.trim() === "") {
      setDiffValue("");
      return;
    }

    onClick("#" + diffValue);
    setDiffValue("");
  };
  const hashTagChange = (e) => {
    const string = validateHashtag(e.target.value);
    setDiffValue(string);
  };
  const onBlurHandler = (e) => {
    if (type === "hashtags" && isSpaceBtn) {
      document.removeEventListener("keyup", cleanInputOnHashTag);
      return;
    }
    field.onBlur(e);
    const value = String(field.value).trim();
    helpers.setValue(value);
  };
  useEffect(() => {
    if (defaultAddress) setDiffValue(defaultAddress);
    if (defaultCard) setDiffValue(defaultCard);
  }, [defaultAddress, defaultCard]);
  useEffect(() => {
    if (type === "hashtags") {
      document.addEventListener("keyup", cleanInputOnHashTag);
    }
    return () => document.removeEventListener("keyup", cleanInputOnHashTag);
  }, [diffValue]);
  useEffect(() => {
    setCurrentVariants(variants);
  }, [variants]);

  const onClickField = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    if (type !== "hashtags") onClick && onClick(field.name);
    if (variants?.length === 1 && variants[0].btnItem) {
      variants[0].btnItem(fieldType);
    } else setIsOpened(!isOpened);
    helpers.setTouched(true);
  };

  return (
    <IsDisabledFieldHOC isDisabled={isDisabled}>
      <div
        className={`${styles.UploadSelectionInput} ${
          isActive === field.name ? styles.active : ""
        }`}
        onClick={onClickField}
      >
        <label style={inlineStyle ? inlineStyle : null}>
          {label}
          <input
            style={type === "hashtags" ? { paddingLeft: "12px" } : null}
            ref={inputRef}
            {...field}
            placeholder={placeholder}
            readOnly={type === "select" && readOnly}
            onChange={
              isAutocomplete
                ? onAutocomplete
                : isSpaceBtn
                ? (e) => hashTagChange(e)
                : field.onChange
            }
            value={
              saveId && readOnly
                ? diffValue
                : isSpaceBtn
                ? diffValue
                : field.value
            }
            onBlur={onBlurHandler}
          />
          {inputType(
            type,
            label,
            currentVariants,
            isOpened,
            setIsOpened,
            helpers.setValue,
            readOnly,
            onOpenMyWalletModalVisibility,
            onOpenAddressModalVisibility,
            onClick,
            field.name,
            saveId,
            diffValue,
            setDiffValue,
            isSpaceBtn,
            isAutocomplete,
            field,
            fieldType
          )}
        </label>
        {isError?.touched && isError?.text && (
          <span className={styles.errorText}>{isError?.text}</span>
        )}
      </div>
    </IsDisabledFieldHOC>
  );
};
