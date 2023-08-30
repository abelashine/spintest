import React from "react";
import styles from "./Item.module.scss";

const Item = ({
  icon,
  saved,
  water,
  color = "black",
  train = null,
  glass = null,
  style = null,
  waterIconStyle = null,
}) => {
  const co2 = (saved) => {
    return (
      <>
        <span>{(saved / 8).toFixed(1)}</span> miles driven by car
      </>
    );
  };

  return (
    <div style={style} className={styles.Item}>
      <div
        style={{ border: `2px solid ${color}`, ...waterIconStyle }}
        className={styles.waterIcon}
      >
        {icon}
      </div>
      <div className={styles.ItemText}>
        <div className={styles.ItemFrom}>
          <span>
            {water
              ? saved > 999
                ? `${(saved / 1000).toFixed(1)}K`
                : saved
              : `${saved}kg`}
          </span>{" "}
          {water ? (
            "Liters of Water"
          ) : (
            <>
              of CO<sub>2</sub>
            </>
          )}
        </div>
        {!water ? co2(saved) && "" : ""}
        <div className={styles.ItemTo}>
          {water ? (
            <div className={styles.info}>
              <div>
                <span>{`${(saved / 365).toFixed(0)}`} </span> years of drinking
                water
                <br /> for 1 person
              </div>
              <div>
                
              </div>
            </div>
          ) : (
            <div className={styles.info}>
              <div>{co2(saved)}</div>
              <div>
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
