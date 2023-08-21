import React from "react";
import styles from "./PaymentModal.module.scss";

const SecondaryText = ({ productInfo }) => {
  return (
    <p className={styles.secondaryMessage}>
      {productInfo.giveaway ? (
        <>
          <div>
            When the brand accepts your request, the ownership of this item will
            be assigned to you on the <strong>Blockchain</strong> for higher
            transparency and security.
          </div>
          <span>i</span>
        </>
      ) : (
        <>
          <div>
            The ownership of this item has been assigned to you on the
            <strong> Blockchain</strong> for higher transparency and security.
          </div>
          <span>i</span>
        </>
      )}
    </p>
  );
};

export default SecondaryText;
