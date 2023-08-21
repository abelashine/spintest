import React from "react";
import styles from "./Signup.module.scss";
import spinConnectIcon from "../../../static/images/logo/spin-connect-icon.png";
// import spinByLablacoLogoWhite from "../../../static/images/logo/spinByLablacoLogoWhite.svg";

const TopPart = () => {
  return (
    <div>
      
      <section className={styles.top_label}>
          <img src={spinConnectIcon} alt="spin connect icon" className={styles.connect_logo} />
        </section>
    </div>
  );
};

export default TopPart;
