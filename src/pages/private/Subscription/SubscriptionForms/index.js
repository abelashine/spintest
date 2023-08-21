import React, { useEffect, useState } from "react";
import styles from "./SubscriptionForm.module.scss";
import { initialValues } from "../../ProductInfo/HomeDeliveryForm/initForm";
import { Field, Formik } from "formik";
import { AddressSelect } from "../../../../components/Inputs/ProductRequest/AddressSelect";
import { CardSelect } from "../../../../components/Inputs/ProductRequest/CardSelect";
import Summarize from "../../ProductInfo/Summarize";
import Button from "../../../../components/Button";
import checkmarkgreen from "../../../../static/icons/checkmarkgreen.svg";
import crossBtn5 from "../../../../static/icons/crossBtn5.svg";

const SubscriptionForm = ({
  addresses,
  activeSelect,
  setIsAddressModalVisible,
  setActiveSelect,
  setIsWalletModalVisible,
  cards,
  setTempValues,
  productInfo,
  total,
  setTotal,
  onSubmit,
  setVoucherCode,
  hasPrinter,
  printerPrice,
  hasRFIDWriter,
  RFIDPrice,
}) => {
  const onClickHandler = (e, values) => {
    setTempValues(values);
  };
  const [totalValue, setTotalValue] = useState(1);
  const [isCorrectVoucherCode, setIsCorrectVoucherCode] = useState(null);
  const [voucherType, setVoucherType] = useState(null);

  const checkCorrectVoucher = (code) => {
    const vouchers = [
      process.env.REACT_APP_ONE_MONTH_FREE,
      process.env.REACT_APP_THREE_MONTHS_FREE,
      process.env.REACT_APP_SIX_MONTHS_FREE,
      process.env.REACT_APP_TWELVE_MONTHS_FREE,
    ];
    const types = [1, 3, 6, 12];
    if (vouchers.some((v) => v === code)) {
      setVoucherType(types[vouchers.findIndex((v) => v === code)]);
      setTotalValue(0);
      setIsCorrectVoucherCode(true);
    } else if (code.length !== 0) {
      setVoucherType(null);
      setTotalValue(1);
      setIsCorrectVoucherCode(false);
    } else {
      setVoucherType(null);
      setIsCorrectVoucherCode(null);
    }
  };

  const onVoucherCodeChange = (e) => {
    checkCorrectVoucher(e.target.value);
    setVoucherCode(e.target.value);
  };

  const getSubscriptionTotalPriceWithoutDiscount = () => {
    const pricePerYear = productInfo.price * 12;
    if (hasPrinter && hasRFIDWriter) {
      return pricePerYear;
    }
    if (!hasPrinter && hasRFIDWriter) {
      return pricePerYear + printerPrice;
    }
    if (!hasRFIDWriter && hasPrinter) {
      return pricePerYear + RFIDPrice;
    }
    if (!hasPrinter && !hasRFIDWriter) {
      return pricePerYear + RFIDPrice + printerPrice;
    }
    return 0;
  };

  const getSummarizeTotal = () => {
    if (!hasPrinter && !hasRFIDWriter && totalValue === 0) {
      return printerPrice + RFIDPrice;
    }
    if (!hasPrinter && hasRFIDWriter && totalValue === 0) {
      return printerPrice;
    }
    if (!hasRFIDWriter && hasPrinter && totalValue === 0) {
      return RFIDPrice;
    }
    return totalValue * total;
  };

  return (
    <div key="1" className={styles.SubscriptionForm}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {addresses &&
              (productInfo.type === "pro" ||
                ((productInfo.type === "essential" ||
                  productInfo.type === "prime") &&
                  (!hasPrinter || !hasRFIDWriter))) && (
                <AddressSelect
                  isActive={activeSelect}
                  onAddNew={() => setIsAddressModalVisible(true)}
                  setActiveSelect={setActiveSelect}
                  variants={addresses}
                />
              )}
            {cards &&
              ((productInfo.type !== "essential" && !voucherType) ||
                (productInfo.type !== "pro" &&
                  (!hasPrinter || !hasRFIDWriter))) && (
                <CardSelect
                  onAddNew={() => setIsWalletModalVisible(true)}
                  setActiveSelect={setActiveSelect}
                  variants={cards}
                  isSubscription={true}
                />
              )}
            <section className={styles.DiscountFields}>
              <h3>Discount</h3>
              <div className={styles.DiscountFields__vouchercodefield}>
                <Field
                  name="voucherCode"
                  placeholder="Type in voucher code..."
                  onChange={onVoucherCodeChange}
                />
                {isCorrectVoucherCode && (
                  <img src={checkmarkgreen} alt="Mark sign" />
                )}
                {!isCorrectVoucherCode && isCorrectVoucherCode !== null && (
                  <img src={crossBtn5} alt="Red cross" />
                )}
              </div>
              {voucherType && (
                <p className={styles.hint}>
                  * The first {voucherType} month of subscription will be free
                </p>
              )}
            </section>
            <Summarize
              productInfo={productInfo}
              shipPrice="0.00"
              total={getSummarizeTotal()}
              setTotal={setTotal}
              currentQuantity={1}
              isSubVoucher={isCorrectVoucherCode}
              printerPrice={!hasPrinter ? printerPrice : 0}
              isSubscription={true}
              subscriptionTotalPriceWithoutDiscount={getSubscriptionTotalPriceWithoutDiscount()}
            />
            <div className={styles.delimiter} />
            <div className={styles.hints}>
              {productInfo.price === 0 ? (
                <p className={styles.hint}>
                  * The subscription must be manually renewed after 12 months
                </p>
              ) : (
                <p className={styles.hint}>
                  * The subscription price will be charged yearly with your
                  credit card
                </p>
              )}
              {voucherType && (
                <p className={styles.hint}>
                  ** The subscription price will be charged after the discounted
                  period
                </p>
              )}
            </div>
            <Button
              type="submit"
              color="blue"
              size="large"
              onClick={onClickHandler}
            >
              {(voucherType || productInfo.price === 0) &&
              hasPrinter &&
              hasRFIDWriter
                ? "ACTIVATE"
                : "PAY"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SubscriptionForm;
