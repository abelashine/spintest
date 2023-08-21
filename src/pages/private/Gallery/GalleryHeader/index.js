import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./GalleryHeader.module.scss";
import backArrow from "../../../../static/icons/back-arrow.svg";

const GalleryHeader = () => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const { tabKind } = useSelector((state) => state.profileReducer);
  return (
    <section className={styles.GalleryHeader}>
      <Link
        to={`/${userInfo.slug}/profile/${tabKind}`}
        className={styles.GalleryHeader__backarrow}
      >
        <img src={backArrow} alt="backArrow" />
      </Link>
      <p className={styles.GalleryHeader__slugname}>{userInfo.slug}</p>
    </section>
  );
};

export default GalleryHeader;
