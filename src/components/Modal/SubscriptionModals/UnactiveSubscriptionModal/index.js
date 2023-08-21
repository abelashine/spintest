import React from "react";
import styles from "./UnactiveSubscriptionModal.module.scss";
import closeButton from "../../../../static/icons/cross.svg";
import SpinLogoBlack from "../../../../static/images/logo/spinByLablacoLogoBlack.svg";
import crossBtn6 from "../../../../static/icons/crossBtn6.svg";

import Modal from "../../index";
import Button from "../../../Button";
import { CardSelect } from "../../../Inputs/ProductRequest/CardSelect";

import { Formik } from "formik";

export const initialValues = {
  card_id: "",
};

export default ({
  isOpened,
  onModalClose,
  onSubmit,
  setActiveSelect,
  setIsWalletModalVisible,
  cards,
  setTempValues,
}) => {
  const onClickHandler = (e, values) => {
    setTempValues(values);
  };
  return (
    <Modal isOpen={isOpened}>
      <div className={styles.UnactiveSubscriptionModal}>
        <div className={styles.header}>
          <div className={styles.backButton} onClick={onModalClose}>
            <img src={closeButton} alt="" />
          </div>
          <img
            src={SpinLogoBlack}
            alt="spinLogoBlack"
            className={styles.logoImg}
          />
        </div>
        <div className={styles.content}>
          <div className={`${styles.circle} ${styles.redCircle}`}>
            <img src={crossBtn6} alt="Check" />
          </div>

          <p className={styles.mainMessage}>
            Oops, seems like <br/>
            <b>there was a problem.</b>
          </p>

          <div className={styles.secondaryMessage}>
            <p>
            The credit card may have been declined. 
            <br/>
            Please try change card or try again.  
            </p>
            <span>i</span>
          </div>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {cards && (
                  <CardSelect
                    onAddNew={() => {
                      setIsWalletModalVisible(true)
                      onModalClose()
                    }}
                    setActiveSelect={setActiveSelect}
                    variants={cards}
                    isSubscription={true}
                    isExpired={true}
                  />
                )}
                <div className={styles.buttonContainer}>
                  <Button
                      type="submit"
                      size="large"
                      onClick={onClickHandler}
                      className={styles.okButton}
                  >
                    <b>PAY</b>
                  </Button>
                  <Button
                      type="button"
                      size="large"
                      onClick={() => {
                        setIsWalletModalVisible(true)
                        onModalClose()
                      }}
                      className={styles.addCardButton}
                  >
                    Add new card
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};
