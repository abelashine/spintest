import React, { useState } from "react";
import styles from "./SettingsModal.module.scss";
import {
  backArrow,
  checkCircle,
  cog,
  location,
  person,
  wallet,
  subscription,
} from "../icons";

import Modal from "..";
import MenuItem from "../../MenuItem";
import Button from "../../Button";
import ProfileModal from "../../Modal/ProfileModal";
import ChangePasswordModal from "../../Modal/ChangePasswordModal";
import MyWalletModal from "../../Modal/MyWalletModal";
import ShippingAddressModal from "../../Modal/ShippingAddressesModal";
import BusinessProfileModal from "../../Modal/BusinessProfileModal";
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";

export default ({ onClose }) => {
  const [currentSection, setCurrentSection] = useState(null);

  const history = useHistory();
  const { userInfo } = useSelector((state) => state.authReducer);


  const settingsOptions = () => {
    if(userInfo.business_role){
      return[
        ["Edit profile", person],
        ["My wallet", wallet],
        ["My shipping addresses", location],
        ["Business", checkCircle],
        ["My subscriptions", subscription],
      ]
    }
    return[
      ["Edit profile", person],
      ["My wallet", wallet],
      ["My shipping addresses", location],
      ["Business", checkCircle],
    ]
  }

  const closeModal = (closeMenuNeeded = false) => {
    closeMenuNeeded && onClose({ closeModal: true });
    setCurrentSection(null);
  };

  if (currentSection) {
    switch (currentSection) {
      case "Edit profile":
        return (
          <ProfileModal
            onClose={() => closeModal(true)}
            goBack={() => setCurrentSection(null)}
          />
        );

      case "Change password":
        return <ChangePasswordModal onClose={() => closeModal()} />;

      case "My wallet":
        return <MyWalletModal onClose={() => closeModal()} />;

      case "My shipping addresses":
        return <ShippingAddressModal onClose={() => closeModal()} />;

      case "Business":
        return (
          <BusinessProfileModal
            onClose={() => closeModal(true)}
            goBack={() => setCurrentSection(null)}
          />
        );
      case "My subscriptions":
        closeModal();
        history.push(`/subscription`)

      default:
        return;
    }
  }
  return (
    <Modal isOpen={true}>
      <div className={styles.SettingsModal}>
        <button className={styles.returnButton} onClick={onClose}>
          {backArrow}
        </button>
        <div className={styles.bigIconContainer}>{cog}</div>
        <h1>Settings</h1>
        {settingsOptions().map(([label, icon]) => (
          <MenuItem
            key={label}
            icon={icon}
            onClick={() => setCurrentSection(label)}
          >
            {label}
          </MenuItem>
        ))}
        <div className={styles.cancelButton}>
          <Button
            type="button"
            size="large"
            color="monochromatic"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
