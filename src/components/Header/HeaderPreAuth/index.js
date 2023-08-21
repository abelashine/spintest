import React from "react";
import styles from "./HeaderPreAuth.module.scss";
import spinByLablacoLogoWhite from "../../../static/images/logo/spinByLablacoLogoWhite.svg";
const HeaderPreAuth = () => {
  return (
    <section className={styles.HeaderPreAuth}>
      <div className={styles.HeaderPreAuth__logoContainer}>
        <img src={spinByLablacoLogoWhite} alt="SPINS" />
      </div>
    </section>
  );
};

export default HeaderPreAuth;
