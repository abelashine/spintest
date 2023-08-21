import React from "react";
import storeiconemptypage from "../../static/icons/storeiconemptypage.svg";
import styles from "./Arts.module.scss";

const EmptyArts = () => {
  return (
    <div className={styles.EmptyArts}>
      <img src={storeiconemptypage} alt="storeiconemptypage" />
      <p className={styles.emptyArtsDescription}>
        Your store is where you can trade <br />
        the NFTs you own in your vault
      </p>
    </div>
  );
};

export default EmptyArts;
