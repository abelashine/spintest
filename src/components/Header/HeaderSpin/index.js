import React from "react";
import styles from "./HeaderSpin.module.scss";
import spinByLablacoLogoWhite from "../../../static/images/logo/spinByLablacoLogoWhite.svg";
import backArrow from "../../../static/icons/back-arrow.svg";

const Header = ({isPayment, onClose}) => {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderContent}>
        <a href="https://spin.lablaco.com">
          <div className={styles.Logo}>
            <img
                src={spinByLablacoLogoWhite}
                alt="SPIN"
            />
          </div>

        </a>
      </div>
      {isPayment &&(
          <button
              onClick={()=>onClose()}
              className={styles.backBtn}
              type="button"
          >
            <img src={backArrow} alt="Back arrow" />
          </button>
      )}
    </div>
  );
};

export default Header;
