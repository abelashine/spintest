import React from "react";
import styles from "./About.module.scss";

import Header from "../../../components/Header";

export default () => {
  return (
    <div className={styles.About}>
      <Header />
      <h1>ABOUT</h1>
      <div className={styles.content}>
        Circular Retail for the fashion industry, lablaco is a universal
        platform connecting all stakeholders in a multi-dimensional circular
        economy. Enabling the evolution of fashion into circularity, impact
        design, and ownership powered by blockchain.
        <br />
        <br /> By digitising fashion, we are redefining the relationships
        between designers, brands, tailors, retailers, content creators, and
        individual customers through transparency and circularity.
        <br />
        <br />
        Empowering art, design, science, and engineering for a new sustainable
        ecosystem.
      </div>
    </div>
  );
};
