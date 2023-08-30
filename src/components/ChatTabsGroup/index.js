import React from "react";
import { useSelector } from "react-redux";
import styles from "./ChatTabsGroup.module.scss";

const TabsGroup = ({ tabs, activeTab, onTabChange, className, ...props }) => {
  const { profileInfo } = useSelector((state) => state.profileReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  console.log("p", props);
  return (
    <div
      className={props.productInfo ? styles.TabsGroup1 : styles.TabsGroup}
      role="tablist"
    >
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
              <div className={styles.myLabel}>
                {props.profile == true ? (
                  <span className={styles.icon}>
                    {activeTab === name ? icon[1] : icon[0]}
                  </span>
                ) : (
                  <div>
                    {props.isUnreadMessage == true ? (
                      <span>
                        <div className={styles.circle}></div>
                        <div className={styles.emptyCircle}></div>
                      </span>
                    ) : /* Passes this prop to make a change in the tab if this propery is in tab group
                     it doesn't render an empty circle
                  */
                    props.productInfo ? (
                      <></>
                    ) : (
                      <div className={styles.emptyCircle}></div>
                    )}

                    <span className={styles.icon}>{icon}</span>
                  </div>
                )}

                <span className={styles.labelText}>{label}</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
export default TabsGroup;
