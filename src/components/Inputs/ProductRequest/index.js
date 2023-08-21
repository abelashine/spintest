import React, {useState, useEffect} from 'react';
import {useField} from 'formik';
import styles from './ProductRequest.module.scss';

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
  name
) => {
  switch (type) {
    case "hashtags":
      return (
        <section>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="14"
            className={styles.arrow}
          >
            <path
              fill="var(--white)"
              fillRule="evenodd"
              d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
            />
          </svg>
          <div className={styles.hashtags}></div>
        </section>
      );

    case "select":
      return (
        <div
          className={styles.dropdown}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onClick && onClick(isOpened ? "" : name);
            setIsOpened(!isOpened);
          }}
        >
          {variants && isOpened && (
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
                        label === "Payment method"
                          ? onOpenMyWalletModalVisibility(true)
                          : onOpenAddressModalVisibility(true);
                      }}
                    >
                      {label === "Payment method" ? card_last_digits : address}
                    </li>
                  ) : (
                    <li
                      key={index}
                      className={styles.variant}
                      onClick={(ev) => {
                        changeValue(
                          value ||
                          en ||
                          currency ||
                          (address && `${address}, ${city.city}`) ||
                          `****${card_last_digits}`
                        );
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
                  setActiveSelect,
                }) => {
  const [field, , helpers] = useField(name);
  const [isOpened, setIsOpened] = useState(false);
  const [currentVariants, setCurrentVariants] = useState(variants);

  const onAutocomplete = ({target: {value}}) => {
    helpers.setValue(value);
    variants &&
    setCurrentVariants(() => {
      const totalVariants = variants.filter((variant) =>
        variant.en.startsWith(value.toLowerCase())
      );
      if (totalVariants.length > 0) {
        setIsOpened(true);
        return totalVariants;
      }
    });
  };


  useEffect(() => {
    if (isActive === field.name) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  }, [isActive, field.name]);

  return (
    <div
      className={`${styles.ProductRequest} ${
        isActive === field.name ? styles.active : ""
      }`}
      onClick={() => {
        setActiveSelect(field.name);
        setIsOpened(!isOpened);
      }}
    >
      <label>
        {label}
        <input
          {...field}
          placeholder={placeholder}
          readOnly={type === "select" && readOnly}
          onChange={isAutocomplete ? onAutocomplete : field.onChange}
        />
        {inputType(
          type,
          label,
          label === "Payment method" || label === "Delivery address"
            ? variants
            : currentVariants,
          isOpened,
          setIsOpened,
          helpers.setValue,
          readOnly,
          onOpenMyWalletModalVisibility,
          onOpenAddressModalVisibility,
          onClick,
          field.name
        )}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='8'
          height='14'
          className={`${styles.arrow} ${isOpened ? styles.opened : ''}`}
        >
          <path
            fill="var(--white)"
            fillRule="evenodd"
            d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
          />
        </svg>
      </label>
    </div>
  );
};
