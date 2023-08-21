import React from "react";
import styles from "./BusinessProfileModal.module.scss";

const ModalHeader = ({ onClickFunction }) => {
  return (
    <div className={styles.modalHeader}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="14"
        onClick={onClickFunction}
      >
        <path
          fill="var(--black)"
          fillRule="evenodd"
          d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
        />
      </svg>
    </div>
  );
};

export default ModalHeader;
