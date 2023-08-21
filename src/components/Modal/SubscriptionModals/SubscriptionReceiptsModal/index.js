import React from "react";
import Modal from "../../index";
import Button from "../../../Button";
import SpinLogoBlack from "../../../../static/images/logo/spinByLablacoLogoBlack.svg";
import closeButton from "../../../../static/icons/cross.svg";
import styles from "./SubscriptionReceiptsModal.module.scss";

export default ({ isOpened, onUpgrade, onCancel, onModalClose, subData, currentSubType, isCancelled }) => {
  return (
    <Modal isOpen={isOpened}>
      <div className={styles.SubscriptionReceiptsModal}>
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
            <span>Here are your recent subscription receipts</span>
          </div>
          <div className={styles.bodyContent}>
            <table>
              <thead>
                <tr>
                  <td>
                    <table className={styles.tableHeader}>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Receipt code</th>
                          <th>Plan type</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                    </table>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className={styles.tableBody}>
                      <table className={styles.tableData}>
                        <tbody>
                          {subData.map((el) => {
                            if (el.paid) {
                              return (
                                  <tr className={styles.tableRow}>
                                    <td>{el.date.getDate()} {el.date.toLocaleString('default', {month: 'long'})} {el.date.getFullYear()}</td>
                                    <td>{el.code}</td>
                                    <td>{el.plan.toUpperCase()}</td>
                                    <td>€ {el.price}</td>
                                  </tr>
                              );
                            }})}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.button}>
            {currentSubType!=="whitelabel" && currentSubType!=="pro" && !isCancelled&&
            <Button
                type="button"
                size="large"
                color="black"
                onClick={onUpgrade}
            >
              UPGRADE
            </Button>}
            {!isCancelled &&
            (<Button type="button" size="large" color="black" onClick={onCancel}>
              UNSUBSCRIBE
            </Button>)}
          </div>
        </div>
      </div>
    </Modal>
  );
};
