import React from "react";
import styles from "./FooterSpin.module.scss";

const Footer = () => {
  return (
      <footer className={styles.Footer}>
        <div className={styles.footerMenu}>
          <div>
            <a className={styles.menuLink} href="https://lablaco.com/about">
              about
            </a>
            <a className={styles.menuLink} href="https://lablaco.com/contact">
              contact
            </a>
            <a
                className={styles.menuLink}
                href="https://www.fashionfootprint.org/"
                target="_blank"
            >
              foundation
            </a>
          </div>
          <div>
            <a className={styles.menuLink} href="https://lablaco.com/user-terms">
              user terms
            </a>
            <a className={styles.menuLink} href="https://lablaco.com/business-terms">
              business terms
            </a>
            <a className={styles.menuLink} href="https://lablaco.com/privacy-policy">
              privacy policy
            </a>
          </div>
        </div>
        <div className={styles.logo}>© {new Date().getFullYear()} by lablaco</div>
      </footer>
  );
};

export default Footer;
