import React from "react";
import styles from "./Range.module.scss";

const Range = ({ min = 10, step = 1, onChange, ref, max = 50, childen }) => {
  const changeValue = (e) => onChange(e.target.value);
  return (
    <div className={styles.Range}>
      <input
        onChange={changeValue}
        id="rangeInput"
        type="range"
        defaultValue={1}
        min={min}
        step={step}
        max={max}
      />
    </div>
  );
};

export default Range;
