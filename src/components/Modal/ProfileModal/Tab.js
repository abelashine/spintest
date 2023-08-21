import React from "react";
import styles from "./ProfileModal.module.scss";
import Button from "../../Button";
const Tab = ({ activeTab, handleTabClick }) => {
  const tabs = [
    { title: "Public Detail", content: "This is public detail" },
    { title: "Private Detail", content: "This is private detail" },
  ];
  console.log(activeTab,"active")
  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab ${activeTab === index ? styles.active : styles.notactive}`}
          onClick={() => handleTabClick(index)}
        >

          <Button className={styles.tabButton}>{tab.title}</Button>
        
        </div>
      ))}
    </div>
  );
};

export default Tab;
