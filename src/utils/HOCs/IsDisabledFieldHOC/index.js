/*eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import styles from "./IsDisabledFieldHOC.module.scss";

const index = ({ children, isDisabled = false, inlineStyle, tooltipStyle }) => {
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  const disabledElemRef = useRef(null);
  useEffect(() => {
    const input = disabledElemRef.current.querySelector("input");
    const textarea = disabledElemRef.current.querySelector("textarea");
    if (isDisabled) {
      if (input) input.setAttribute("readonly", true);
      if (textarea) textarea.setAttribute("readonly", true);
      disabledElemRef.current.addEventListener("click", showToolTip);
    }
    return () =>
      disabledElemRef.current.removeEventListener("click", showToolTip);
  }, []);
  useEffect(() => {
    if (isToolTipVisible) {
      setTimeout(() => {
        setIsToolTipVisible(false);
      }, 1000);
    }
  }, [isToolTipVisible]);
  const showToolTip = (e) => {
    setIsToolTipVisible(true);
    e.stopPropagation();
  };
  return (
    <div
      ref={disabledElemRef}
      className={styles.IsDisabledFieldHOC}
      style={inlineStyle}
    >
      {isToolTipVisible && (
        <span
          className={styles.IsDisabledFieldHOC__tooltip}
          style={tooltipStyle}
        >
          Impossible to edit in this case
        </span>
      )}
      {children}
    </div>
  );
};

export default React.memo(index);
