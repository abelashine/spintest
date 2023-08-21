import React from "react";
import QRCode from "qrcode.react";
import Modal from "..";
import styles from "./GiveBackQRModal.module.scss";
import closeButton from "../../../static/icons/cross.svg";
import SpinLogoBlack from "../../../static/images/logo/spinByLablacoLogoBlack.svg";
import SpinLogoQR from "../../../static/images/logo/QR_logo.png"

export default ({ isOpened, productInfo, onModalClose }) => {
  const giveBackUrl = `${window.location.origin}/giveback/${productInfo?.old_owner}/${productInfo?.passon_link}`;
  return (
    <Modal isOpen={isOpened}>
      <div className={styles.GiveBackQRModal}>
        <div className={styles.header}>
          <div className={styles.backButton} onClick={onModalClose}>
            <img src={closeButton} alt="Button to close modal window" />
          </div>
          <img
            src={SpinLogoBlack}
            className={styles.logoImg}
            alt="spinLogoBlack"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.QRCode}>
            <QRCode
              value={giveBackUrl}
              level="Q"
              renderAs="svg"
              size={334}
              imageSettings={{
                src: SpinLogoQR,
                width: 94,
                height: 94,
              }}
            />
            <div className={styles.name}>{productInfo?.product_name}</div>
            <div className={styles.slug}>{`@${productInfo?.old_owner}`}</div>
            <p
              className={styles.bio}
            >{`Please show @${productInfo?.old_owner} team this QR code in order to complete the return process.`}</p>
            <a href={giveBackUrl}>{giveBackUrl}</a>
          </div>
        </div>
      </div>
    </Modal>
  );
};
