import React from "react";
import styles from "./SecondFormPart.module.scss";
import { useFormikContext } from "formik";

import DesignCriteria from "../DesignCriteria";
import ItemJourney from "../ItemJourney/index";
import LogisticDetails from "../LogisticDetails/index";
import CheckboxBlack from "../../../Inputs/CheckboxBlack";
import Button from "../../../../components/Button";

const SecondFormPart = ({
  openModal,
  prevLayers,
  setPrevLayers,
  addresses,
  cards,
  topTitle,
  isEdit,
  addressField,
  productInfo,
}) => {
  const { values } = useFormikContext();
  const isDisabled = isEdit === "isPassOn";
  console.log('prevLayers', prevLayers)
  return (
    <div className={styles.fieldsInputs}>
      {productInfo?.product_type === '1' && Boolean(productInfo?.size) && (
        <DesignCriteria values={values} isDisabled={isDisabled} />
      )}
      <ItemJourney
        openModal={openModal}
        prevLayers={prevLayers}
        setPrevLayers={setPrevLayers}
        isDisabled={isDisabled}
      />
      {(Boolean(productInfo?.pickup_address) || Boolean(values?.pickupaddress)) && Boolean(productInfo?.size) && (
        <>
          <LogisticDetails
            addresses={addresses}
            cards={cards}
            topTitle={topTitle}
            addressField={addressField}
          />
          <section className={styles.pickupInStore}>
            <CheckboxBlack name="pickupinstore" value={values.pickupinstore} />
            <p>User may pick up the item in store</p>
          </section>
        </>
      )}

      {topTitle === "Rent item" && (
        <section className={styles.pickupInStore}>
          <CheckboxBlack
            name="canreturninstore"
            value={values.canreturninstore}
          />
          <p>User can return the item in store</p>
        </section>
      )}

      <div className={styles.delimiter} />
      <Button type="submit" color="blue" size="middle">
        {isEdit === "isEdit" ? "Save" : "Publish"}
      </Button>
    </div>
  );
};

export default SecondFormPart;
