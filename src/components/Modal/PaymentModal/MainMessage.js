import React from "react";
import styles from "./PaymentModal.module.scss";

const MainMessage = ({ isPasswordReset, productInfo }) => {
  return (
    <p className={styles.mainMessage}>
      {isPasswordReset ? (
        <>
          Your password reset <br /> <strong> was processed perfectly!</strong>
        </>
      ) : productInfo.giveaway ? (
        <>Your SWAP request has been sent to the brand!</>
      ) : (
        <>
          Your order has been
          <br />
          <strong>processed perfectly!</strong>
        </>
      )}
    </p>
  );
};

export default MainMessage;
