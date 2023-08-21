import React from "react";
import { useSelector } from "react-redux";
import styles from "./Login.module.scss";
import backArrow from "../../../static/icons/back-arrow.svg";
import spinConnectIcon from "../../../static/images/logo/spin-connect-icon.png";
// import spinByLablacoLogoWhite from "../../../static/images/logo/spinByLablacoLogoWhite.svg";
import solid_black from "../../../static/icons/solid_black.svg";

const TopPart = ({ step, toFirstLoginStep }) => {
  const { userInfo } = useSelector((state) => state.authReducer);
  return (
    <div>
      {step === 0 ? (
        <section className={styles.Login__topLabel}>
          <img src={spinConnectIcon} alt="spin connect icon" className={styles.Login__topLabel_ConnectLogo} />
          <p className={styles.Login__topLabel_tagline}>Enter</p>
        </section>
      ) : (
        <section className={styles.Login__topLabelPasswordStep}>
          <div className={styles.Login__topLabelPasswordStep_topRow}>
            <button className={styles.backArrow} onClick={toFirstLoginStep}>
              <img src={backArrow} alt="Back arrow" />
            </button>
          </div>
          <figure className={styles.userAvatar}>
            <img
              src={userInfo.image.url}
              alt="avatar"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = solid_black;
              }}
            />
            <figcaption>Great to see you {userInfo.name}</figcaption>
          </figure>
        </section>
      )}
    </div>
  );
};

export default TopPart;
