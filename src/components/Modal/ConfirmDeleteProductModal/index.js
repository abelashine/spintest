import React from "react";
import styles from "./ConfirmDeleteProductModal.module.scss";
import closeButton from "../../../static/icons/cross.svg";
import SpinLogoBlack from "../../../static/images/logo/spinByLablacoLogoBlack.svg";
import crossBtn6 from "../../../static/icons/crossBtn6.svg";

import Modal from "..";
import Button from "../../Button";

export default ({ isOpened, onClose, onModalClose }) => {
  return (
    <Modal isOpen={isOpened}>
      <div className={styles.ConfirmDeleteProductModal}>
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
            <img src={crossBtn6} alt="Cross" />
          </div>

          <p className={styles.mainMessage}>
            <>
              Are you sure you
              <br />
              <strong>want to delete this item?</strong>
            </>
          </p>

          <div className={styles.secondaryMessage}>
            <p>Once the item is deleted it is not possible to restore.</p>
            <span>i</span>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              type="button"
              size="large"
              onClick={onClose}
              className={styles.confirmButton}
            >
              CONFIRM
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
