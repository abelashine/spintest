import React from "react";
import { Link } from "react-router-dom";
import styles from "./PaymentModal.module.scss";
import Button from "../../Button";

const SuccessButtons = ({ productInfo, chatRoomId, onClose, goToVault }) => {
  return (
    <>
      {productInfo.giveaway ? (
        <Link
          to={{
            pathname: `/${productInfo.poster.slug}/profile/dialog`,
            state: {
              chatRoomId: chatRoomId,
              interlocutor: productInfo.poster,
            },
          }}
        >
          <Button type="button" size="large" onClick={onClose}>
            OPEN CONVERSATION
          </Button>
        </Link>
      ) : (
        <button className={styles.viewBtn} type="button" onClick={goToVault}>
          View your vault
        </button>
      )}
    </>
  );
};

export default SuccessButtons;
