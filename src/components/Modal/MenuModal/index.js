import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./MenuModal.module.scss";
import { cross } from "../icons";

import SettingsModal from "../SettingsModal";
import TopIcons from "./TopIcons";
import MiddleIcons from "./MiddleIcons";
import BottomIcons from "./BottomIcons";
import Notifications from "./Notifications";
import PostMiddleIcons from "./PostMiddleIcons";

const MenuModal = ({ isOpen, onClose }) => {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const { userInfo } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "initial";
    };
  }, [isOpen]);

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
    <div className={styles.ModalWrap}>
      <div className={styles.MenuModal} ref={menuModalRef}>
        <button className={styles.closeButton} type="button" onClick={onClose}>
          {cross}
        </button>
        <TopIcons onClose={onClose} />
        <MiddleIcons />
        <PostMiddleIcons />
        <BottomIcons setIsSettingsVisible={setIsSettingsVisible} />
      </div>
      {/* TODO: the string futher is commented, because there isn't respective logic anywhere - this is in future plans */}
      {/* <Notifications /> */}
      <div className={styles.ModalWrap__overlay}></div>
    </div>
  );
};
export default React.memo(MenuModal);
