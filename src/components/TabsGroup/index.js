import React from "react";
import { useSelector } from "react-redux";
import styles from "./TabsGroup.module.scss";

const TabsGroup = ({ tabs, activeTab, onTabChange, className }) => {
  const { profileInfo } = useSelector((state) => state.profileReducer);
  const { userInfo } = useSelector((state) => state.authReducer);

  console.log("tabs are", tabs);

  return (
    <div className={styles.TabsGroup} role="tablist">
      {tabs.map(({ name, label, icon, fill }, key) => {
        if (name === "vault" && profileInfo?.slug !== userInfo?.slug) {
          return null;
        }
        return (
          <button
            className={`${
              activeTab === name ? styles.activeTab : styles.notactiveTab 
            } ${fill ? styles.fill : ""} ${className ? className : ""}`}
            key={name}
            role="tab"
            onClick={() => onTabChange(name)}
          >
            <div className={styles.innerContainer}>
              <div className={styles.circle}></div>
              <div className={styles.myLabel}> {label}</div>
              {icon}
            </div>
          </button>
        );
      })}
    </div>
  );
};
export default TabsGroup;
