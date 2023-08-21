import React from "react";
import styles from "./Options.module.scss";
import checked from "../../../../static/icons/checked2@2x.png";
import cross from "../../../../static/icons/crossBtn3.svg";

const Options = ({ optionsHandler }) => {
  return (
    <div className={styles.Options}>
      <button
        type="button"
        className={styles.declineButton}
        onClick={() => optionsHandler("decline")}
      >
        <div className={styles.circle}>
          <img src={cross} alt="Cross icon" />
        </div>
        <span>DECLINE</span>
      </button>
      <button
        className={styles.acceptButton}
        onClick={() => optionsHandler("accept")}
      >
        <div className={styles.circle}>
          <img src={checked} alt="Checked" />
        </div>
        <span>ACCEPT</span>
      </button>
    </div>
  );
};

export default Options;
