import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { usePayPalScriptHook } from "../../../../utils/hooks";
import Button from "../../../../components/Button";
import styles from "./PickUpForm.module.scss";
const BottomButton = ({
  allowApply,
  isButtonDisabled,
  onClickHandler,
  total,
  currentSize,
  onSubmit,
}) => {
  const { values } = useFormikContext();
  const { productInfo } = useSelector((state) => state.profileReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const count = total / productInfo.price;
  const [payPalData, setPayPalData] = useState({
    total: String(total),
    currency: productInfo.currency.currency,
    callbackAfterPayment: onSubmit,
  });
  useEffect(() => {
    setPayPalData((prev) => ({ ...prev, total: String(total) }));
  }, [total]);

  usePayPalScriptHook(values, styles.paypalcontainer, payPalData, currentSize);
  // const { userInfo } = useSelector((state) => state.authReducer);
  if (values.card_id === "crypto") {
    return (
      <div className={styles.BottomButton}>
        <Button
          type="button"
          color="blue"
          size="large"
          disabled={
            productInfo.out_of_stock ||
            (userInfo && userInfo.slug === productInfo.poster.slug) ||
            !allowApply ||
            isButtonDisabled
          }
          onClick={() => console.log("")}
        >
          <span className={styles.inscription}>PAY</span>
          <div id={styles.paypalcontainer} data-paypalcontainerblock></div>
        </Button>
        <div
          className={styles.BottomButton}
          style={{ opacity: 0, position: "absolute", width: "30%" }}
        >
          <div id="pay-button"></div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.BottomButton}>
      {values.card_id === "paypal" && currentSize && +total ? (
        <Button
          type="button"
          color="blue"
          size="large"
          disabled={
            productInfo.out_of_stock ||
            (userInfo && userInfo.slug === productInfo.poster.slug) ||
            !allowApply ||
            isButtonDisabled
          }
        >
          <span className={styles.inscription}>PAY</span>
          <div id={styles.paypalcontainer} data-paypalcontainerblock></div>
        </Button>
      ) : (
        <button
          className={styles.payButton}
          type="submit"
          color="blue"
          size="large"
          disabled={
            productInfo.out_of_stock ||
            (userInfo && userInfo.slug === productInfo.poster.slug) ||
            !allowApply ||
            isButtonDisabled
          }
          onClick={() => onClickHandler(values)}
        >
          {productInfo?.giveaway
            ? "SEND REQUEST"
            : !parseFloat(total)
            ? "GET"
            : "PAY"}
        </button>
      )}
    </div>
  );
};

export default BottomButton;
