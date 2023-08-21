import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ErrorRequestModal.module.scss";
import { cross, info } from "../icons";
import Modal from "../index";
import Button from "../../Button";
import { errorsActions } from "../../../actions/errors";

const ErrorRequestModal = () => {
  const reduxDispatch = useDispatch();
  const closeModal = () => reduxDispatch(errorsActions.hideErrorRequestModal());
  const { isRequestError } = useSelector((state) => state.errorsReducer);
  if (!isRequestError.isError) return null;
  return (
    <div className={styles.ErrorRequestModal}>
      <Modal isOpen>
        <div className={styles.modalHeader}>
          <button
            className={styles.closeButton}
            type="button"
            onClick={closeModal}
          >
            {cross}
          </button>
          <h1>ERROR!</h1>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.bodyContent}>
            <p className={styles.bodyMessage}>
              Oops, seems like <br /> <strong> there was a problem.</strong>
              <br />
              {isRequestError.errorMsg}
              <br />
              Try later or apply to support service, please.
            </p>
            <div className={styles.info}>{info}</div>
          </div>
          <div className={styles.button}>
            <Button
              type="button"
              size="large"
              color="black"
              onClick={closeModal}
            >
              OK
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ErrorRequestModal;
