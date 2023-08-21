import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./VouchersHeader.module.scss";
import backArrow from "../../../../static/icons/back-arrow.svg";

const VouchersHeader = () => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const { tabKind } = useSelector((state) => state.profileReducer);
  return (
    <section className={styles.VouchersHeader}>
      <Link
        to={`/${userInfo.slug}/profile/${tabKind}`}
        className={styles.VouchersHeader__backarrow}
      >
        <img src={backArrow} alt="backArrow" />
      </Link>
      <p className={styles.VouchersHeader__slugname}>{userInfo.slug}</p>
    </section>
  );
};

export default VouchersHeader;
