import React from "react";
import styles from "./ErrorSubscriptionModal.module.scss";
import closeButton from "../../../../static/icons/cross.svg";
import SpinLogoBlack from "../../../../static/images/logo/spinByLablacoLogoBlack.svg";
import crossBtn6 from "../../../../static/icons/crossBtn6.svg";

import Modal from "../../index";
import Button from "../../../Button";

export default ({ isOpened, onClose, onModalClose }) => {
  return (
      <Modal isOpen={isOpened}>
        <div className={styles.ErrorSubscriptionModal}>
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
              <>
                Oops, seems like<br/>
                <strong>there was a problem.</strong>
              </>
            </p>

            <div className={styles.secondaryMessage}>
              <p>The credit card may have been declined.<br/>
                Please try change card or try again.</p>
              <span>i</span>
            </div>

            <div className={styles.buttonContainer}>
              <Button
                  type="button"
                  size="large"
                  onClick={onClose}
                  className={styles.addButton}
              >
                ADD NEW CARD
              </Button>
              <Button
                  type="button"
                  size="large"
                  onClick={onModalClose}
                  className={styles.cancelButton}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
  );
};
