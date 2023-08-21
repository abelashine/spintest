import React from "react";
import styles from "./VaultTabs.module.scss";
import { tabs } from "../helpers";

const VaultTabs = ({ vaultTab, setVaultTab }) => {
  const tabHandler = (e) => {
    if (!e.target.dataset.value) return;
    setVaultTab(e.target.dataset.value);
  };
  return (
    <div className={styles.VaultTabs} onClick={tabHandler}>
      {tabs.map(({ value, text }) => {
        return (
          <button
            key={value}
            className={vaultTab === value ? styles.activeTab : ""}
            data-value={value}
          >
            <span data-value={value}>{text}</span>
            <span
              data-value={value}
              className={`${styles.underLine} ${
                vaultTab === value ? styles.activeTab : ""
              }`}
            ></span>
          </button>
        );
      })}
    </div>
  );
};

export default VaultTabs;
