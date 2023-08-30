import React, { useState, useEffect } from "react";
import { useField } from "formik";
import styles from "./ProductRequest.module.scss";
import { useFormikContext } from "formik";
import { useDispatch } from "react-redux";

import { authActions } from "../../../actions/auth";
import arrowicon from "../../../static/icons/back-arrow.svg";
import dropdown from "../../../static/icons/drop-2.png";
import cardIcon from "../../../static/icons/Card.png";
import paypalIcon from "../../../static/icons/paypal.png";

export function CardSelect({
  onAddNew,
  setActiveSelect,
  isError,
  variants,
  isSubscription,
  isExpired,
  onClickHandler,
  onSubmit,
  total,
}) {
  const cards = variants.filter((i) => i.id);
  const dispatch = useDispatch();
  const [field, , helpers] = useField("card_id");
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState("");
  const { values } = useFormikContext();
  const amount = total * 100;

  useEffect(() => {
    if (cards.length) {
      setCard(cards[0]);
    }
  }, [variants]);

  useEffect(() => {
    if (value !== "crypto") {
      return;
    }
    dispatch(authActions.startLoading());
    setTimeout(() => {
      dispatch(authActions.finishLoading());
    }, 2000);
  }, [value]);
  useEffect(() => {
    window.cryptopay
      .Button({
        createPayment: function (actions) {
          return actions.payment.create({
            currency: "EUR",
            amount: amount,
            description: "Product Name",
            order_id: "1",
            metadata: {
              size: "XL",
              color: "black",
            },
          });
        },
        onApprove: function (data, actions) {
          onSubmit(values);
        },
        defaultLang: "en-US", // Optional: default language for payment page
      })
      .render("#pay-button");
  }, [value]);
  return (
    <div className={`${styles.ProductRequest}`} onClick={onClick}>
      <span className={styles.title}>PAYMENT </span>
      <span>
        Payment method
        <div className={styles.customInput}>
          <input
            value={value}
            placeholder={"Choose how to pay"}
            readOnly={true}
          />
        </div>
        <input {...field} hidden={true} />
        <div className={styles.dropdown}>
          {isOpened && (
            <ul className={styles.variants}>
              {cards.map((card) => (
                <li key={card.id} onClick={(event) => onSelect(event, card)}>
                  <img
                    src={cardIcon}
                    width={28}
                    height={19}
                    style={{ marginRight: 10, position: "relative", top: 3 }}
                  />

                  {getCardLabel(card)}
                </li>
              ))}
              {!isSubscription && (
                <li onClick={(event) => onSelect(event, "paypal")}>
                  <img
                    src={paypalIcon}
                    width={28}
                    height={19}
                    style={{ marginRight: 10, position: "relative", top: 3 }}
                  />
                  PayPal
                </li>
              )}
              {!isSubscription && (
                <li onClick={(event) => onSelect(event, "crypto")}>
                  <img
                    src={cardIcon}
                    width={28}
                    height={19}
                    style={{ marginRight: 10, position: "relative", top: 3 }}
                  />
                  Crypto.com Pay
                </li>
              )}
              <li onClick={addNewCard}>
                {" "}
                <img
                  src={cardIcon}
                  width={28}
                  height={19}
                  style={{ marginRight: 10, position: "relative", top: 3 }}
                />
                Add New Card
              </li>
            </ul>
          )}
        </div>
        <img
          src={dropdown}
          alt="arrowicon"
          className={`${isExpired ? styles.blackarrow : styles.arrow} ${
            isOpened ? styles.opened : ""
          }`}
        />
      </span>
      {isError?.touched && isError?.text && (
        <span className={styles.errorText}>{isError?.text}</span>
      )}
    </div>
  );

  function onClick() {
    setActiveSelect(field.name);
    setIsOpened(!isOpened);
  }

  function onSelect(event, card) {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    setIsOpened(false);
    setCard(card);
  }

  function addNewCard(event) {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    setIsOpened(false);
    onAddNew();
  }

  function setCard(card) {
    if (card === "paypal") {
      helpers.setValue(card);
      setValue("PayPal");
    } else if (card === "crypto") {
      helpers.setValue(card);
      setValue("crypto");
    } else {
      helpers.setValue(card.id);
      setValue(getCardLabel(variants.find((i) => i.id === card.id)));
    }
  }
}

function getCardLabel(card) {
  return card ? `Card *${card.card_last_digits}` : "";
}
