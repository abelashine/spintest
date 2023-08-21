import React from "react";
import styles from "./WorldItem.module.scss";

const WorldItem = ({ openWorld, world }) => {
  return (
    <li className={styles.WorldItem} onClick={openWorld}>
      <figure>
        <img src={world.image} alt="world" />
        {/*<figcaption>{world.title}</figcaption>*/}
      </figure>
    </li>
  );
};

export default WorldItem;
