import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {

  return (
    <div className={styles.Footer}>
      <section>
        <a className={styles.menuLink} href="https://lablaco.com/about">
          About
        </a>
        <a className={styles.menuLink} href="#">
          lablaco
        </a>
        <a className={styles.menuLink} href="https://lablaco.com/contact">
          Contact
        </a>
      </section>
      <section>
        <a className={styles.menuLink} href="https://lablaco.com/user-terms">
          Terms Users
        </a>
        <a
          className={styles.menuLink}
          href="https://lablaco.com/business-terms"
        >
          Terms Business
        </a>
        <a
          className={styles.menuLink}
          href="https://lablaco.com/privacy-policy"
        >
          Cookie Policies
        </a>
      </section>
    </div>
  );
};

export default Footer;
