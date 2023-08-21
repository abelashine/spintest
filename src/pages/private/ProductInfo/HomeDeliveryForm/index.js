import React from "react";
import lablacoLogo from "../../../../static/images/logo/lablacoLogo.svg";
import styles from "./HomeDeliveryForm.module.scss";
import { initialValues } from "./initForm";
import { Formik } from "formik";
import routes from "../../../../routes";

import { AddressSelect } from "../../../../components/Inputs/ProductRequest/AddressSelect";
import { CardSelect } from "../../../../components/Inputs/ProductRequest/CardSelect";
import Summarize from "../Summarize";
import Button from "../../../../components/Button";

const HomeDeliveryForm = ({
  productInfo,
  onSubmit,
  addresses,
  activeSelect,
  setIsAddressModalVisible,
  setActiveSelect,
  setIsWalletModalVisible,
  cards,
  allowApply,
  isPublic,
  history,
  userInfo,
  isButtonDisabled,
  total,
  setTotal,
  setTempValues,
}) => {
  const onClickHandler = (e, values) => {
    if (isPublic) {
      history.push(routes.prelogin);
    } else {
      setTempValues(values);
    }
  };
  return (
    <div key="1" className={styles.HomeDeliveryForm}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {addresses && (
              <AddressSelect
                isActive={activeSelect}
                onAddNew={() => setIsAddressModalVisible(true)}
                setActiveSelect={setActiveSelect}
                variants={addresses}
              />
            )}
            {cards && (
              <CardSelect
                onAddNew={() => setIsWalletModalVisible(true)}
                setActiveSelect={setActiveSelect}
                variants={cards}
              />
            )}
            <Summarize
              productInfo={productInfo}
              shipPrice="9.00"
              total={total}
              setTotal={setTotal}
            />
            <Button
              type="submit"
              color="blue"
              size="large"
              disabled={
                productInfo.out_of_stock ||
                (userInfo && userInfo.slug === productInfo.poster.slug) ||
                !allowApply ||
                isButtonDisabled
              }
              onClick={onClickHandler}
            >
              {productInfo && productInfo.giveaway ? "SEND REQUEST" : "PAY"}
            </Button>
            <div className={styles.lablacoLogo}>
              <img src={lablacoLogo} alt="Lablaco Logo" />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default HomeDeliveryForm;
