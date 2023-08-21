import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Error.module.scss";

const Error = () => {
  const history = useHistory();
  const { profileInfo } = useSelector((state) => state.profileReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const goFromErrorPage = () => {
    const profileSlug = userInfo?.slug || profileInfo?.slug || null;
    if (profileSlug) {
      history.push(`/${profileSlug}/profile`);
    } else history.push("/login");
  };
  return (
    <div className={styles.Error}>
      <h3 className={styles.Error__title}>Sorry, this page isn't available</h3>
      <p className={styles.Error__text}>
        The link you followed may be broken, or the page may have been removed.{" "}
        <span onClick={goFromErrorPage}>Go back to SPIN</span>
      </p>
    </div>
  );
};

export default Error;
