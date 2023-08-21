import React from "react";
import styles from "./CancelSubscriptionModal.module.scss";
import closeButton from "../../../../static/icons/cross.svg";
import SpinLogoBlack from "../../../../static/images/logo/spinByLablacoLogoBlack.svg";
import checkCircle from "../../../../static/icons/checked.svg";

import Modal from "../../index";
import Button from "../../../Button";

export default ({ isOpened, onModalClose }) => {
  return (
    <Modal isOpen={isOpened}>
      <div className={styles.SubscriptionCancellation}>
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
              Sorry to see you go
            </>
          </p>

          <div className={styles.secondaryMessage}>
            <p>Your subscription is cancelled after the<br/>
              end of this month. Please visit My<br/>
              Subscription at Settings to reactivate <br/>
              any plan.</p>
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
