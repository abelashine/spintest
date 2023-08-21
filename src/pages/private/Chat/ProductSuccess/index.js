import React from "react";
import checked from "../../../../static/icons/checked2@2x.png";
import cross from "../../../../static/icons/crossBtn3.svg";
import styles from "./ProductSuccess.module.scss";

const ProductSuccess = ({ src, messageType, requestStatusCode }) => {
  return (
    <div className={styles.ProductSuccess}>
      <img
        className={styles.ProductSuccess__productImage}
        src={src}
        alt="Product image"
      />
      {messageType === "rentSuccessful" && (
        <div className={`${styles.circle} ${styles.passed}`}>
          <img src={checked} alt="Green icon" />
        </div>
      )}
      {messageType === "spinRequest" && requestStatusCode === "1" && (
        <div className={`${styles.circle} ${styles.passed}`}>
          <img src={checked} alt="Green icon" />
        </div>
      )}
    </div>
  );
};

export default ProductSuccess;
