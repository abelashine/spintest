import React from "react";
import styles from "./Landing.module.scss";

const Landing = ({ name = "Landing", text = "Lorem ipsum" }) => {
  return (
    <div className={styles.Landing}>
      <div className={styles.ComponentName}>{name}</div>
      <div className={styles.ImageContainer}>
        <img
          className={styles.Image}
          src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
          alt={`main ${name}`}
        />
      </div>
      <div className={styles.TextContainer}>{text}</div>
    </div>
  );
};

export default Landing;
