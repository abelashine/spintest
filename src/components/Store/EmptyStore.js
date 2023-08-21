import React from "react";
import styles from "./Store.module.scss";
import storeiconemptypage from "../../static/icons/storeiconemptypage.svg";

const EmptyStore = () => {
  return (
    <div className={styles.EmptyStore}>
      <img src={storeiconemptypage} alt="storeiconemptypage" />
      <p className={styles.emptyShopDescription}>
        Your store is where you can trade <br />
        the NFTs you own in your vault
      </p>
    </div>
  );
};

export default EmptyStore;
