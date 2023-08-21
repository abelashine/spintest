import React from "react";
import styles from "./VoucherTabs.module.scss";

const VoucherTabs = ({ voucherTab, setVoucherTab }) => {
  const tabHandler = (e) => {
    if (!e.target.dataset.value) return;
    setVoucherTab(e.target.dataset.value);
  };
  return (
    <div className={styles.VoucherTabs} onClick={tabHandler}>
      <button
        className={voucherTab === "personal" ? styles.activeTab : ""}
        data-value="personal"
      >
        <span data-value="personal">Personal</span>
        <span
          data-value="personal"
          className={`${styles.underLine} ${
            voucherTab === "personal" ? styles.activeTab : ""
          }`}
        />
      </button>
      <button
        className={voucherTab === "general" ? styles.activeTab : ""}
        data-value="general"
      >
        <span data-value="general">General</span>
        <span
          data-value="general"
          className={`${styles.underLine} ${
            voucherTab === "general" ? styles.activeTab : ""
          }`}
        />
      </button>
    </div>
  );
};

export default VoucherTabs;
