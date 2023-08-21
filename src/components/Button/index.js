import React from "react";
import styles from "./Button.module.scss";

export default ({
  disabled,
  children,
  className,
  type,
  size,
  color,
  icon,
  onClick,
  title,
  id
}) => {
  return (
    <button
      className={`${styles.Button} ${styles[size]} ${styles[color]} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-tooltip={title}
      id={id}
    >
      {children}
    </button>
  );
};
