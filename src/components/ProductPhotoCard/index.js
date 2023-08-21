import React from "react";
import styles from "./ProductPhotoCard.module.scss";
import solid_black from "../../static/icons/solid_black.svg";

export default ({ photo }) => {
  return (
    <figure className={styles.ProductPhotoCard}>
      <img
        src={photo}
        alt="product"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = solid_black;
        }}
      />
    </figure>
  );
};
