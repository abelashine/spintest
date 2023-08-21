// used only to display a line
// you may then need to display the tabs

import React from "react";
import styles from "./GalleryTabs.module.scss";

const GalleryTabs = () => {
  return (
    <div className={styles.GalleryTabs}>
      <button data-value="active">
        <span data-value="active" className={styles.underLine} />
      </button>
    </div>
  );
};

export default GalleryTabs;
