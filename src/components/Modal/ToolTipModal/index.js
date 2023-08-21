import React from "react";
import Modal from "..";
import styles from "./ToolTipModal.module.scss";
import closeButton from "../../../static/icons/cross.svg";

const ToolTipModal = ({ onClose, text }) => {
  return (
    <div className={styles.toolTipModal}>
      <Modal isOpen={true}>
        <img
          src={closeButton}
          className={styles.toolTipModal__closeBtn}
          alt="Cross button"
          onClick={onClose}
        />
        <p className={styles.toolTipModal__text}>{text}</p>
      </Modal>
    </div>
  );
};

export default ToolTipModal;
