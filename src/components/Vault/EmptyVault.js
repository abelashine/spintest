import React from "react";
import styles from "./Vault.module.scss";
import vaulticonemptypage from "../../static/icons/empty-vault.png";

const EmptyVault = () => {
  return (
    <div className={styles.EmptyVault}>
      <img  className={styles.emptyValutImage} src={vaulticonemptypage} alt="vaulticonemptypage" />
      <p className={styles.emptyVaultMessage}>
        Your vault is where all your <br />
        phygital NFTs are stored
      </p>
    </div>
  );
};

export default EmptyVault;
