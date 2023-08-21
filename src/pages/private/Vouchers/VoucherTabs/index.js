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
        className={voucherTab === "active" ? styles.activeTab : ""}
        data-value="active"
      >
        <span data-value="active">Active</span>
        <span
          data-value="active"
          className={`${styles.underLine} ${
            voucherTab === "active" ? styles.activeTab : ""
          }`}
        />
      </button>
      <button
        className={voucherTab === "inactive" ? styles.activeTab : ""}
        data-value="inactive"
      >
        <span data-value="inactive">Inactive</span>
        <span
          data-value="inactive"
          className={`${styles.underLine} ${
            voucherTab === "inactive" ? styles.activeTab : ""
          }`}
        />
      </button>
    </div>
  );
};

export default VoucherTabs;
