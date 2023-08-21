import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./PaymentModal.module.scss";
import closeButton from "../../../static/icons/cross.svg";
import checkIcon from "../../../static/icons/checked2@2x.png";
import { profileActions } from "../../../actions/profile";

import Modal from "..";
import SuccessButtons from "./SuccessButtons";
import MainMessage from "./MainMessage";
import SecondaryText from "./SecondaryText";

import { IMKitApi } from "imkit-js-api-v3";

const PaymentModal = ({
  isOpened,
  isSuccess,
  onClose,
  onModalClose,
  withoutMessage,
  isPasswordReset,
  productInfo,
}) => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const { roomsSkipNum } = useSelector((state) => state.chatReducer);
  const history = useHistory();
  const reduxDispatch = useDispatch();
  const [chatRoomId, setChatRoomId] = useState(null);

  useEffect(() => {
    if (userInfo?.chat_token) {
      const CHAT_SERVER_URL = process.env.REACT_APP_IMKIT_DEV_CHAT_SERVER_URL;
      const IMKIT_API_CLIENT_KEY = process.env.REACT_APP_IMKIT_DEV_CLIENT_KEY;
      const apiConfig = {
        domain: CHAT_SERVER_URL,
        clientKey: IMKIT_API_CLIENT_KEY,
        token: userInfo.chat_token,
      };
      const api = new IMKitApi(apiConfig);
      api.room.getRoomsList(20, roomsSkipNum).then((chatRooms) => {
        for (let i = 0; i < chatRooms.data.length; i++) {
          const chatRoom = chatRooms.data[i];
          if (
            chatRoom.lastMessage &&
            String(chatRoom.lastMessage.messageType) === "spinRequest"
          ) {
            for (let j = 0; j < chatRoom.members.length; j++) {
              const member = chatRoom.members[j];
              if (String(member.id) === String(productInfo.poster.id)) {
                setChatRoomId(chatRoom.id);
              }
            }
          }
        }
      });
    }
  }, [userInfo]);

  const closeModal = () => {
    onModalClose();
    if (isSuccess && !withoutMessage) {
      if (userInfo.brand) {
        reduxDispatch(profileActions.setTabKind("store"));
      } else {
        reduxDispatch(profileActions.setUsualTabKind("store"));
      }
      history.push(`/${userInfo?.slug}/profile/store`);
    }
  };
  const goToVault = () => {
    onModalClose();
    if (userInfo.business_role) {
      history.push(`/${userInfo?.slug}/profile/brandvault`);
    } else {
      reduxDispatch(profileActions.setUsualTabKind("vault"));
      history.push(`/${userInfo?.slug}/profile/vault`);
    }
  };

  return (
    <Modal isOpen={isOpened}>
      <div className={styles.PaymentModal}>
        <div className={styles.header}>
          <div className={styles.backButton} onClick={closeModal}>
            <img src={closeButton} alt="" />
          </div>
        </div>
        <div className={styles.content}>
          <div className={`${styles.circle} ${styles.greenCircle}`}>
            <img src={checkIcon} alt="" />
          </div>
          <MainMessage
            isPasswordReset={isPasswordReset}
            productInfo={productInfo}
          />
          <SecondaryText productInfo={productInfo} />
          <SuccessButtons
            productInfo={productInfo}
            chatRoomId={chatRoomId}
            onClose={onClose}
            goToVault={goToVault}
          />
        </div>
      </div>
    </Modal>
  );
};
export default PaymentModal;
