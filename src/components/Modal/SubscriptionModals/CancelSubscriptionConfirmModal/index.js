import React from "react";
import Modal from "../../index";
import Button from "../../../Button";
import SpinLogoBlack from "../../../../static/images/logo/spinByLablacoLogoBlack.svg";
import closeButton from "../../../../static/icons/cross.svg";
import styles from "./CancelSubscriptionConfirmModal.module.scss";
import spinIcon from "../../../../static/icons/spin_icon.png"

export default ({ isOpened, onClose, onModalClose, cancelData }) => {
  const date = new Date();
  return (
    <Modal isOpen={isOpened}>
      <div className={styles.CancelSubscriptionConfirmModal}>
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
        <div className={styles.modalBody}>
          <div className={styles.modalTitle}>
            <span>
              Sorry to see you go. Please confirm the
              <br />
              unsubscription below.
            </span>
          </div>
          <div className={styles.bodyContent}>
            <table >
              <tbody>
                <tr>
                  <th rowspan="2">
                    <img src={spinIcon} alt="Spin Icon"/>
                  </th>
                  <th>
                    Unsubscribe
                    <br />
                    date
                  </th>
                  <th>
                    Current plan
                    <br />
                    type
                  </th>
                  <th>
                    Monthly price
                    <br />
                    of current plan
                  </th>
                </tr>
                <tr>
                  <td>
                    {date.getDate()} {date.toLocaleString('default', {month: 'long'})} {date.getFullYear()}
                  </td>
                    <td>
                      {cancelData.type.toUpperCase()}
                    </td>
                    <td>
                        € {cancelData.price}*
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            * The subscription will still be valid until the end of this month and you will no longer be charged starting next month
          </p>
          <div className={styles.button}>
            <Button type="button" size="large" color="black" onClick={onClose}>
              CONFIRM
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
