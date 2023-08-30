import styles from "./MenuModal.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import connect from "../../../static/icons/connect.png";
import galleryIcon from "../../../static/icons/gallery.png";
import subscriptionIcon from "../../../static/icons/subscription.png";
import voucherIcon from "../../../static/icons/voucher.png";
import profileAvatar from "../../../static/icons/profile_avatar.png";
import vaultIcon from "../../../static/icons/vault.png";
const BussinessBar = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const history = useHistory();
  const profileHandler = () => {
    history.push(`/${userInfo.slug}/profile/vault`);
  };

  const vaultHandler = () => {
    history.push(`/${userInfo.slug}/profile/vault`);
  };
  return (
    <>
      <div className={styles.MenuModalItemContainer}>
        <img src={connect} />
        <a className={styles.MenuModalItem} href="https://spin.fashion/connect">
          CONNECT
        </a>
      </div>
      <div className={styles.MenuModalItemContainer}>
        <img src={galleryIcon} />
        <span className={styles.MenuModalItem}>GALLERY</span>
      </div>
      <div className={styles.MenuModalItemContainer}>
        <img src={subscriptionIcon} />
        <span className={styles.MenuModalItem}>SUBSCRIPTIONS</span>
      </div>
      <div className={styles.MenuModalItemContainer}>
        <img src={voucherIcon} />
        <span className={styles.MenuModalItem}>VOUCHERS</span>
      </div>
      <div className={styles.MenuModalItemContainer}>
        <img src={profileAvatar} />
        <span className={styles.MenuModalItem} onClick={profileHandler}>
          PROFILE
        </span>
      </div>
      <div className={styles.MenuModalItemContainer}>
        <img src={vaultIcon} />
        <span className={styles.MenuModalItem} onClick={vaultHandler}>
          VAULT
        </span>
      </div>
     
      
    </>
  );
};
export default BussinessBar;
