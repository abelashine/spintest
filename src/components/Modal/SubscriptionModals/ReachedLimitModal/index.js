import React from "react";
import styles from "./ReachedLimitModal.module.scss";
import closeButton from "../../../../static/icons/cross.svg";
import SpinLogoBlack from "../../../../static/images/logo/spinByLablacoLogoBlack.svg";
import crossBtn6 from "../../../../static/icons/crossBtn6.svg";
import { subscriptionData } from "../../../../static/data/subscriptionData";

import Modal from "../../index";
import Button from "../../../Button";
import { useDispatch, useSelector } from "react-redux";
import { reachedLimitActions } from "../../../../actions/errors/reachedLimit";
import { useHistory } from "react-router-dom";

export default () => {
  const reduxDispatch = useDispatch();
  const history = useHistory();
  const closeModal = () =>
    reduxDispatch(reachedLimitActions.hideReachedLimitUserModal());
  const { reachedLimitModalOpen } = useSelector(
    (state) => state.reachedLimitReducer
  );
  const { userInfo } = useSelector((state) => state.authReducer);
  const subLevel = subscriptionData.filter(
    (el) => el.stripe_price === userInfo?.subscription?.plan
  )[0]?.type;
  if (!reachedLimitModalOpen) return null;
  return (
    <Modal isOpen>
      <div className={styles.UnsubscribedUserModal}>
        <div className={styles.header}>
          <div className={styles.backButton} onClick={closeModal}>
            <img src={closeButton} alt="" />
          </div>
          <img
            src={SpinLogoBlack}
            alt="spinLogoBlack"
            className={styles.logoImg}
          />
        </div>
        <div className={styles.content}>
          <div className={`${styles.circle} ${styles.redCircle}`}>
            <img src={crossBtn6} alt="Check" />
          </div>

          <div className={styles.secondaryMessage}>
            <p>
              You have reached the <br />
              limit of items in your
              <br />
              subscription plan:
              <br />
              {subLevel?.toUpperCase()}
              <br />
              <br />
              <br />
              Please upgrade to
              <br />
              upload more products
            </p>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              type="button"
              size="large"
              onClick={() => {
                closeModal();
                history.push("/subscription");
              }}
              className={styles.okButton}
            >
              UPGRADE
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
