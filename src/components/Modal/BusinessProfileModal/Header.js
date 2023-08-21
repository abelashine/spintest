import React from "react";
import { useHistory } from "react-router-dom";
import routes from "../../../routes";
import styles from "./BusinessProfileModal.module.scss";
import backArrow from "../../../static/icons/back-arrow.svg";
import spinConnectIcon from "../../../static/images/logo/spin-connect-icon.png";

const Header = ({ step, setStep }) => {
  const history = useHistory();

  const routerHandler = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      history.push(routes.prelogin);
    }
  };
  const skipped=()=>{
    history.push(routes.prelogin);
  }

  return (
    <div className={styles.Header}>
      <button className={styles.backArrow} onClick={routerHandler}>
        <img src={backArrow} alt="Back arrow" />
      </button>
      {step == 2 ? (
        <button className={styles.skip} onClick={skipped}>
          skip
        </button>
      ) : (
        <></>
      )}

      <div>
        <section className={styles.top_label}>
          <img
            src={spinConnectIcon}
            alt="spin connect icon"
            className={styles.connect_logo}
          />
        </section>
      </div>
    </div>
  );
};

export default Header;
