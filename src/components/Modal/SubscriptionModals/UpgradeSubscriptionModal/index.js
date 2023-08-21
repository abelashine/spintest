import React from "react";
import styles from "./UpgradeSubscriptionModal.module.scss";
import closeButton from "../../../../static/icons/cross.svg";
import SpinLogoBlack from "../../../../static/images/logo/spinByLablacoLogoBlack.svg";
import checkCircle from "../../../../static/icons/checked.svg";

import Modal from "../../index";
import Button from "../../../Button";

export default ({ subscriptionType, isOpened, onModalClose }) => {
  return (
    <Modal isOpen={isOpened}>
      <div className={styles.UpgradeSubscriptionModal}>
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
          <div className={`${styles.circle} ${styles.greenCircle}`}>
            <img src={checkCircle} alt="Check" />
          </div>

          <p className={styles.mainMessage}>
            <>
              Thank you for
              <br />
              upgrading to {subscriptionType.toUpperCase()}
            </>
          </p>

          <div className={styles.secondaryMessage}>
            <p>
              You will receive the upgraded charge
              <br />
              starting next month.
            </p>
            <span>i</span>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              type="button"
              size="large"
              onClick={onModalClose}
              className={styles.okButton}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
