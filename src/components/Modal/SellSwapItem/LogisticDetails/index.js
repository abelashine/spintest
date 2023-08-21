import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import styles from "./LogisticDetails.module.scss";
import UploadSelectionInput from "../../../Inputs/UploadSelectionInput";
import { shippingCosts } from "../../../../static/data/dataForForms";
import { setDefaultValues } from "../helpers";

const LogisticDetails = ({ addresses, cards, topTitle, addressField }) => {
  const productInfo = useSelector((state) => state.profileReducer.productInfo);
  const pr = useFormikContext();
  const { values, errors, touched, setFieldValue, setFieldTouched } = pr;
  const [defaultPickUpAddress, setDefaultPickUpAddress] = useState(null);
  const [defaultReturnAddresses, setDefaultReturnAddresses] = useState(null);
  const [defaultCard, setDefaultCard] = useState(null);
  useEffect(() => {
    setDefaultValues(
      addresses,
      values,
      productInfo,
      setFieldValue,
      topTitle,
      cards,
      addressField,
      setDefaultPickUpAddress,
      setDefaultReturnAddresses,
      setDefaultCard,
      setFieldTouched
    );
  }, [addresses, values.pickupaddress, values.returnaddress]);
  if (
    (topTitle === "Rent item" &&
      (!defaultPickUpAddress || !defaultReturnAddresses || !defaultCard)) ||
    (topTitle !== "Rent item" && (!defaultPickUpAddress || !defaultCard))
  ) {
    return null;
  }

  return (
    <section className={styles.LogiscticDetails}>
      <p className={styles.LogiscticDetails__formtitle}>Logistic details</p>
      <div className={styles.pickupAdressBlock}>
        <UploadSelectionInput
          name="pickupaddress"
          label="Pickup address"
          placeholder="*Select"
          type="select"
          variants={addresses}
          isError={{
            text: errors.pickupaddress,
            touched: touched.pickupaddress,
          }}
          saveId
          defaultAddress={defaultPickUpAddress}
          fieldType="pickupaddress"
        />
      </div>
      {topTitle === "Rent item" && (
        <div className={styles.returnAdressBlock}>
          <UploadSelectionInput
            name="returnaddress"
            label="Return address"
            placeholder="*Select"
            type="select"
            variants={addresses}
            isError={{
              text: errors.returnaddress,
              touched: touched.returnaddress,
            }}
            saveId
            defaultAddress={defaultReturnAddresses}
            fieldType="returnaddress"
          />
        </div>
      )}

      <UploadSelectionInput
        name="shippingcost"
        label="Shipping costs"
        placeholder="*Free world wide shipping"
        type="select"
        variants={shippingCosts}
      />
      {values.shippingcost === "I will pay" && (
        <UploadSelectionInput
          name="paymentmethod"
          label="Payment method"
          placeholder="*Select"
          type="select"
          variants={cards}
          isError={{
            text: errors.paymentmethod,
            touched: touched.paymentmethod,
          }}
          saveId
          defaultCard={defaultCard}
        />
      )}
    </section>
  );
};

export default LogisticDetails;
