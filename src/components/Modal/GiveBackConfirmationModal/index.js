import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { profileActions } from "../../../actions/profile";
import Modal from "..";
import { tokenizedProductInfo } from "../../../api";
import closeButton from "../../../static/icons/cross.svg";
import Button from "../../Button";
import SpinLogoBlack from "../../../static/images/logo/spinByLablacoLogoBlack.svg";
import styles from "./GiveBackConfirmationModal.module.scss";

const GiveBackConfirmationModal = ({ isOpened, givebackData, onClose }) => {
  const historyReact = useHistory();
  const { product_link } = useParams();
  const dispatch = useDispatch();
  const [productImage, setProductImage] = useState("");
  const [productName, setProductName] = useState("");

  useEffect(() => {
    if (isOpened) {
      tokenizedProductInfo(
        givebackData?.product_link || product_link || ""
      ).then((res) => {
        setProductImage(res?.response?.image?.url);
        setProductName(res?.response?.name);
      });
    }
  }, [isOpened]);

  const confirmHandler = async (isConfirm) => {
    const data = JSON.parse(JSON.stringify(givebackData));
    data.brand_accepted = isConfirm;
    await dispatch(profileActions.takeBackRent(data));
    await dispatch(profileActions.setGiveBackData(null));
    historyReact.push(`/`);
    onClose();
  };
  if (!givebackData) return null;
  return (
    <Modal isOpen={isOpened}>
      <div className={styles.GiveBackConfirmationModal}>
        <div className={styles.header}>
          <div className={styles.backButton} onClick={onClose}>
            <img src={closeButton} alt="Button to close modal window" />
          </div>
          <img
            src={SpinLogoBlack}
            className={styles.logoImg}
            alt="spinLogoBlack"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={productImage} alt="product image" />
          </div>
          <p className={styles.mainMessage}>{productName}</p>
          <p className={styles.mainMessage}>
            <>
              Are you sure you
              <br />
              <strong>want to take this item back?</strong>
            </>
          </p>
          <p className={styles.secondaryMessage}>
            <>
              Check the item carefully, because after confirmation
              <br />
              you will not be able to undo the action
            </>
            <span>i</span>
          </p>
          <div className={styles.buttonContainer}>
            <Button
              type="button"
              size="large"
              onClick={() => confirmHandler(true)}
              className={styles.confirmButton}
            >
              CONFIRM
            </Button>

            <Button
              type="button"
              size="large"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default GiveBackConfirmationModal;
