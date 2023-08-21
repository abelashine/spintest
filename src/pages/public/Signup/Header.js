import React from "react";
import { useHistory } from "react-router-dom";
import routes from "../../../routes";
import styles from "./Signup.module.scss";
import backArrow from "../../../static/icons/back-arrow.svg";

const Header = ({ step, setStep }) => {
  const history = useHistory();

  const routerHandler = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      history.push(routes.prelogin);
    }
  };

  return (
    <div className={styles.Header}>
      <button className={styles.backArrow} onClick={routerHandler}>
        <img src={backArrow} alt="Back arrow" />
      </button>
    </div>
  );
};

export default Header;
