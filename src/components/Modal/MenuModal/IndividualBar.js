import styles from "./MenuModal.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import galleryIcon from "../../../static/icons/gallery.png";
import tredingIcon from "../../../static/icons/trending.png";
import bussinessIcon from "../../../static/icons/BussinessIcon.png";
import walletIcon from "../../../static/icons/walletIcon.png";
import shippingIcon from "../../../static/icons/shippingIcon.png";
import sizingIcon from "../../../static/icons/sizingIcon.png";

const IndividualBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const profileHandler = () => {
    history.push(`/${userInfo.slug}/profile/vault`);
  };

  const vaultHandler = () => {
    history.push(`/${userInfo.slug}/profile/vault`);
  };
  const termshHandler = () => {
    history.push(`/${userInfo.slug}/profile/vault`);
  };
  return (
    <>
      <div className={styles.MenuModalItemContainer}>
        <img src={tredingIcon} />
        <a className={styles.MenuModalItem} href="https://spin.fashion/connect">
          TRENDING
        </a>
      </div>
      <div className={styles.MenuModalItemContainer}>
        <img src={galleryIcon} />
        <span className={styles.MenuModalItem}>GALLERY</span>
      </div>
      <div className={styles.MenuModalItemContainer}>
        <img src={bussinessIcon} />
        <span className={styles.MenuModalItem}>BUSSINESS</span>
      </div>
      <div className={styles.MenuModalItemContainer}>
        <img src={walletIcon} />
        <span className={styles.MenuModalItem}>WALLET</span>
      </div>
      <div className={styles.MenuModalItemContainer}>
        <img src={shippingIcon} />
        <span className={styles.MenuModalItem} onClick={profileHandler}>
          SHIPPING
        </span>
      </div>
      <div className={styles.MenuModalItemContainer}>
        <img src={sizingIcon} />
        <span className={styles.MenuModalItem} onClick={vaultHandler}>
          SIZING
        </span>
      </div>
     
     
    </>
  );
};
export default IndividualBar;
