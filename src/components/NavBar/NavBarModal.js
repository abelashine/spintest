import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./NavBarModal.module.scss";
import termsIcon from "../../static/icons/termsIcon.png";
import SettingsModal from "../Modal/SettingsModal";
import BussinessBar from "../Modal/MenuModal/BusinessBar";
import logoutIcon from "../../static/icons/logoutIcon.png";
import { authActions } from "../../actions/auth";
import IndividualBar from "../Modal/MenuModal/IndividualBar";
import settingsIcon from "../../static/icons/settings.png";


const NavBarModal = ({ isOpen, onClose }) => {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const { userInfo } = useSelector((state) => state.authReducer);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "initial";
    };
  }, [isOpen]);

  const dispatch = useDispatch();
  const history = useHistory();
  const logoutFromProfile = () => {
    const lastUsersData = JSON.parse(
      localStorage.getItem("lastUsersDataToRememberLastAccounts")
    );
    // deleteUserInfo();
    localStorage.setItem(
      "lastUsersDataToRememberLastAccounts",
      JSON.stringify(lastUsersData)
    );
    history.push("/login");
    dispatch(authActions.logout());
  };
  const menuModalRef = useRef(null);

  useEffect(() => {
    if (!userInfo.business_role) {
      menuModalRef.current.style.maxWidth = "280px";
    }
  }, []);

  if (isSettingsVisible) {
    return (
      <SettingsModal
        onClose={(e) => {
          setIsSettingsVisible(false);
          if (e.closeModal) onClose();
        }}
      />
    );
  }

  return (
    <div>
      <div className={styles.ModalWrap}>
        <div className={styles.MenuModal} ref={menuModalRef}>
          <div>MENU</div>

          {!!userInfo?.business_role ? <BussinessBar /> : <IndividualBar />}
          <div className={styles.MenuModalItemContainer}>
            <img src={termsIcon} />
            <a
              href="https://spin.fashion/connect"
              className={styles.MenuModalItem}
            >
              TERMS
            </a>{" "}
          </div>
          <div
            className={styles.MenuModalItemContainer}
            onClick={() => {
              setIsSettingsVisible(true);
            }}
          >
            <img src={settingsIcon} />
            <span className={styles.MenuModalItem}>SETTINGS</span>
          </div>

          <div className={styles.MenuModalItemContainer}>
            <img src={logoutIcon} />
            <span className={styles.MenuModalItem} onClick={logoutFromProfile}>
              LOGOUT
            </span>
          </div>
        </div>
        <div className={styles.ModalWrap__overlay}></div>
      </div>
    </div>
  );
};
export default React.memo(NavBarModal);
