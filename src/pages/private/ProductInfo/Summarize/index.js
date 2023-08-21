import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./Summarize.module.scss";

const Summarize = ({
  productInfo,
  shipPrice,
  currentQuantity,
  total,
  setTotal,
  printerPrice,
  isSubVoucher,
  isSubscription,
  subscriptionTotalPriceWithoutDiscount, //[Leo - 2210281315]
  checkoutProductType, //[Leo - 2210191530] to determine phygital or digital price
}) => {
  const { certainDiscount } = useSelector((state) => state.profileReducer);
  const [isDiscountBiggerPrice, setIsDiscountBiggerPrice] = useState(false);
  //[Leo - 2210191543] to handle the state of checkout price
  const [checkoutPrice, setCheckOutPrice] = useState(0);

  //[Leo - 2210191534] all usage of checkoutPrice were previously used plain productInfo.price, which will always lead to phygital price
  useEffect(() => {
    if (isSubscription) return;
    const temp =
      checkoutProductType === "phygital"
        ? productInfo.price
        : productInfo.digital_price;
    setCheckOutPrice(temp);
    if (!certainDiscount) {
      setTotal((+checkoutPrice * +currentQuantity).toFixed(2));
      setIsDiscountBiggerPrice(false);
    } else if (certainDiscount.discount_type === "FREE") {
      setTotal(0);
      setIsDiscountBiggerPrice(false);
    } else if (certainDiscount.discount_type === "PERCENTAGE") {
      const discontValue = certainDiscount.amount;
      let priceWithDiscont =
        +checkoutPrice - +checkoutPrice * (discontValue / 100);
      setTotal((priceWithDiscont * +currentQuantity).toFixed(2));
      setIsDiscountBiggerPrice(false);
    } else {
      const discontValue = certainDiscount.amount;
      const priceWithDiscont = (
        +checkoutPrice * +currentQuantity -
        discontValue
      ).toFixed(2);
      if (+priceWithDiscont <= 0) {
        setTotal(0);
        setIsDiscountBiggerPrice(true);
      } else {
        setTotal(priceWithDiscont);
        setIsDiscountBiggerPrice(false);
      }
    }
  }, [checkoutPrice, currentQuantity, certainDiscount]);
  const isDiscount =
    (total === 0 && certainDiscount?.discount_type === "FREE") ||
    (total !== 0 && certainDiscount) ||
    isDiscountBiggerPrice;
  const totalPriceWithoutDiscount = (checkoutPrice * currentQuantity).toFixed(
    2
  );
  const currencySymbol = productInfo.currency.symbol;
  const currencyShortname = productInfo.currency.currency;
  return (
    <div className={styles.summaryInfo}>
      <div>
        <span>Product price</span>
        {!isSubscription && (
          <span className={isDiscount ? styles.crossedthrough : ""}>{`${
            currencySymbol || "€"
          }${totalPriceWithoutDiscount} (${currencyShortname})`}</span>
        )}
        {isDiscount && (
          <span>{`${
            currencySymbol || "€"
          }${total} (${currencyShortname})`}</span>
        )}
        {isSubscription && (
          <span className={isSubVoucher ? styles.crossedthrough : ""}>{`${
            currencySymbol || "€"
          }${subscriptionTotalPriceWithoutDiscount} (${currencyShortname})`}</span>
        )}
        {isSubVoucher && (
          <span>{`${
            currencySymbol || "€"
          }${total} (${currencyShortname})`}</span>
        )}
      </div>
      <div>
        {/**[Leo - 2210191442] Disable shipping cost as we currently does not have home delivery system */}
        <div className={styles.total}>
          <span>Total</span>
          <span>{`${
            currencySymbol || "€"
          }${total} (${currencyShortname})`}</span>
        </div>
      </div>
    </div>
  );
};

export default Summarize;
