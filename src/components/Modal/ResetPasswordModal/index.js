import React from "react";

import styles from "./ResetPasswordModal.module.scss";

import { cross, info } from "../icons";
import Modal from "../index";

import Button from "../../Button";
import SpinLogoBlack from "../../../static/images/logo/spinByLablacoLogoBlack.svg";

export default ({ onClose }) => {
  return (
    <Modal isOpen>
      <div className={styles.modalHeader}>
        <button className={styles.closeButton} type="button" onClick={onClose}>
          {cross}
        </button>
        <img
          src={SpinLogoBlack}
          className={styles.logoImg}
          alt="spinLogoBlack"
        />
      </div>
      <div className={styles.modalBody}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="74"
          height="74"
          className={styles.checkIcon}
        >
          <g fill="rgb(31,241,156)" fillRule="evenodd" transform="scale(3.68)">
            <circle cx="10" cy="10" r="10" />
            <path
              fill="var(--white)"
              d="M12.8674692,8.22804647 C12.6777213,8.05193178 12.3811311,8.06298369 12.2049568,8.2527958 L9.14968607,11.5436528 L8.69166747,11.0499191 L7.79498364,10.0833142 C7.78294758,10.0706651 7.78294758,10.0706651 7.77029851,10.0586291 C7.5805506,9.8825144 7.28396036,9.8935663 7.10784567,10.0833142 L6.90105186,10.3061161 C6.73414384,10.4859447 6.73414384,10.7640553 6.90105186,10.9438839 L8.79075233,12.9805051 L8.83158769,13.0219535 C8.92435399,13.1080547 9.0439213,13.1514303 9.13391914,13.1490064 L9.21950885,13.1420629 C9.32440855,13.1266017 9.42008434,13.0769496 9.49404053,12.9972684 L13.0989481,9.11330124 C13.2658562,8.9334727 13.2658562,8.65536206 13.0989481,8.47553352 L12.8921543,8.2527316 C12.8801183,8.24008252 12.8801183,8.24008252 12.8674692,8.22804647 Z"
            />
          </g>
        </svg>
        <p className={styles.bodyTitle}>
          An email has been sent
          <br />
          <strong>to reset yor password</strong>
        </p>
        <div className={styles.bodyContent}>
          <p className={styles.bodyMessage}>
            Please <strong>check your email</strong> and follow the link to
            reset your password.
          </p>
          <div className={styles.info}>{info}</div>
        </div>
        <div className={styles.button}>
          <Button type="button" size="large" color="black" onClick={onClose}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};
