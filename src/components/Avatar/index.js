import React from "react";
import styles from "./Avatar.module.scss";
import solid_black from "../../static/icons/solid_black.svg";

export default ({ url, isBrand, isSmall }) => {
  return (
    <div className={styles.Avatar}>
      <img
        src={url}
        alt=""
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = solid_black;
        }}
      />
      {!!isBrand && (
        <span className={isSmall ? styles.small : ""} data-icon="bluemark">
          <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(.4 .5)" fill="none" fillRule="evenodd">
              <ellipse fill="#239EFE" cx="7.1" cy="6.9" rx="7.1" ry="6.9" />
              <path
                d="M9.3 5l.5.5a.6.6 0 010 .8L7.2 8.8l-.4.4-.2.1h-.2L6 9.2 4.3 7.6a.6.6 0 010-.9l.4-.4c.3-.2.6-.2.9 0l.8.8 2.1-2c.2-.2.6-.2.8 0z"
                fill="#FFF"
              />
            </g>
          </svg>
        </span>
      )}
    </div>
  );
};
