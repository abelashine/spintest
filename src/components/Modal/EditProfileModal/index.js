import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./MenuModal.module.scss";
import termsIcon from "../../../static/icons/termsIcon.png";
import SettingsModal from "../SettingsModal";
import logoutIcon from "../../../static/icons/logoutIcon.png";
import { authActions } from "../../../actions/auth";
import settingsIcon from "../../../static/icons/settings.png";
import pencilIcon from "../../../static/icons/pencil.png";

const EditProfileModal = ({ isOpen, onClose }) => {
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

  const dispatch = useDispatch();
  const history = useHistory();

  return (
   <></>
  );
};
export default React.memo(EditProfileModal);
