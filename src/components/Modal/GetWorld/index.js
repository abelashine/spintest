import React from "react";
import styles from "./GetWorld.module.scss";
import getworldicon from "../../../static/icons/getworldicon.svg";
import getWorldNewIcon from "../../../static/icons/getWordNewIconRedesign.JPG";

const GetWorld = ({ onClose, world }) => {
  return (
    <div className={styles.GetWorld} onClick={onClose}>
      <div className={styles.GetWorld__popup}>
        <section className={styles.GetWorld__popup_topBlock}>
          <img className={styles.phone} src={getWorldNewIcon} alt="background" />
          <div className={styles.download}>
            <img src={getworldicon} alt="getworldicon" />
          </div>
        </section>
        <section className={styles.GetWorld__popup_bottomBlock}>
          This is an exclusive VR experience, to access worlds please download the SPIN app on Meta Quest Store
        </section>
      </div>
      <div className={styles.GetWorld__overlay}></div>
    </div>
  );
};

export default GetWorld;
