import React from "react";
import Modal from "../../index";
import Button from "../../../Button";
import SpinLogoBlack from "../../../../static/images/logo/spinByLablacoLogoBlack.svg";
import closeButton from "../../../../static/icons/cross.svg";
import styles from "./UpgradeSubscriptionConfirmModal.module.scss";
import spinIcon from "../../../../static/icons/spin_icon.png";

export default ({ isOpened, onClose, onModalClose, upgradeData }) => {
  const date = new Date()
  return (
    <Modal isOpen={isOpened}>
      <div className={styles.UpgradeSubscriptionConfirmModal}>
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
              Congratulations for upgrading. Please
              <br />
              confirm the subscription plan below.
            </span>
          </div>
          <div className={styles.bodyContent}>
            <table>
              <tbody>
                <tr>
                  <th rowspan="2">
                    <img src={spinIcon} alt="Spin Icon" />
                  </th>
                  <th>
                    Upgrade
                    <br />
                    date
                  </th>
                  <th>
                    Current
                    <br />
                    plan type
                  </th>
                  <th>
                    Upgraded
                    <br />
                    plan type
                  </th>
                  <th>
                    Upgraded plan
                    <br />
                    monthly price
                  </th>
                </tr>
                <tr>
                  <td>{date.getDate()} {date.toLocaleString('default', {month: 'long'})} {date.getFullYear()}</td>
                  <td>{upgradeData.type.toUpperCase()}</td>
                  <td>{upgradeData.new_type.toUpperCase()}</td>
                  <td>€ {upgradeData.price}*</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>* You will receive the upgraded charge starting next month</p>
          <div className={styles.button}>
            <Button type="button" size="large" color="blue" onClick={onClose}>
              CONFIRM
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
