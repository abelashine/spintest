import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import styles from "./RentSummarize.module.scss";
import { getRentTotalPrice } from "../helpers";

const RentSummarize = ({ productInfo, currentQuantity, total, setTotal }) => {
  const { values } = useFormikContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const { certainDiscount } = useSelector((state) => state.profileReducer);
  useEffect(() => {
    getRentTotalPrice(
      values.rentalPeriod.type,
      +values.rentalPeriod.value,
      +productInfo.price_per_day,
      +currentQuantity,
      setTotal,
      certainDiscount,
      setTotalPrice
    );
  }, [values.rentalPeriod, currentQuantity, certainDiscount]);
  const isDiscount =
    (total === 0 && certainDiscount?.discount_type === "FREE") ||
    (total !== 0 && certainDiscount) ||
    (total === 0 && certainDiscount);
  const stringToTotalPrice =
    String(+values.rentalPeriod.value) +
    " " +
    (+values.rentalPeriod.value === 1
      ? values.rentalPeriod.type
          .slice(0, values.rentalPeriod.type.length - 1)
          .toLowerCase()
      : values.rentalPeriod.type
    ).toLowerCase();
  const currencySymbol = productInfo.currency.symbol;
  const currencyShortname = productInfo.currency.currency;
  return (
    <section className={styles.summaryInfo}>
      <div className={styles.valuewrap}>
        <div className={styles.summaryInfo__valueblock}>
          <p>Price per day</p>
          <p>{`${currencySymbol || "€"}${productInfo.price_per_day.toFixed(
            2
          )} (${currencyShortname})`}</p>
        </div>
        <div className={styles.summaryInfo__valueblock}>
          <p>Shipping cost</p>
          <p>
            {currencySymbol || "€"}0.00 ({currencyShortname})
          </p>
        </div>
      </div>
      <div className={styles.summaryInfo__valueblock}>
        <p>Price for {stringToTotalPrice}</p>
        <p className={isDiscount ? styles.crossedthrough : ""}>
          {currencySymbol || "€"}
          {totalPrice} ({currencyShortname})
        </p>
        {isDiscount && (
          <p>{`${currencySymbol || "€"}${total} (${currencyShortname})`}</p>
        )}
      </div>
      <div className={styles.summaryInfo__totalblock}>
        <p>Total price</p>
        <p>{`${currencySymbol || "€"}${total} (${currencyShortname})`}</p>
      </div>
    </section>
  );
};

export default RentSummarize;
