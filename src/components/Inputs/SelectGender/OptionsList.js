import React from "react";
import styles from "./SelectGender.module.scss";

const OptionsList = ({ options, onChooseHandler }) => {
  return (
    <ul className={styles.OptionsList}>
      {options.map(({ value }, index) => (
        <li key={index} onMouseDown={() => onChooseHandler(value)}>
          {value}
        </li>
      ))}
    </ul>
  );
};

export default OptionsList;
