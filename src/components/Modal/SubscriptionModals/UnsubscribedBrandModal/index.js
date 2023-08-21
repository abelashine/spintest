import React from "react";
import styles from "./UnsubscribedUserModal.module.scss";
import closeButton from "../../../../static/icons/cross.svg";
import SpinLogoBlack from "../../../../static/images/logo/spinByLablacoLogoBlack.svg";
import crossBtn6 from "../../../../static/icons/crossBtn6.svg";

import Modal from "../../index";
import Button from "../../../Button";
import {useDispatch, useSelector} from "react-redux";
import {unsubscribedActions} from "../../../../actions/errors/unsubscribed";
import {useHistory} from "react-router-dom";

export default () => {
  const reduxDispatch = useDispatch();
  const closeModal = () => reduxDispatch(unsubscribedActions.hideUnsubscribedUserModal());
  const { isRequestError } = useSelector((state) => state.unsubscribedReducer);
  if (!isRequestError.isError) return null;
  const history = useHistory();
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
            <p>Please subscribe to a<br/>
              plan to start uploading <br/>
              in SPIN connect.</p>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              type="button"
              size="large"
              onClick={()=>{
                closeModal();
                history.push('/subscription')
              }
              }
              className={styles.okButton}
            >
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
