import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserSmall.module.scss";
import Dropdown from "../../../../../../static/icons/dropdown.svg";

import Avatar from "../../../../../../components/Avatar";

const UserSmall = ({ avatar, address, date, slug, comment, photo }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className={styles.UserSmall}>
      {avatar && (
        <div className={styles.avatar}>
          <Link to={`/${slug.split("/").pop()}/profile`}>
            <Avatar url={avatar} isSmall />
          </Link>
        </div>
      )}
      <div className={styles.InfoContainer}>
        <div className={styles.InfoTag}>
          <Link to={`/${slug.split("/").pop()}/profile`}>
            @{slug.split("/").pop()}
          </Link>
        </div>
        <div className={styles.InfoLocationDate}>
          {address}
          {date &&
            `- ${
              new Date(date).getDate() < 10
                ? `0${new Date(date).getDate()}`
                : new Date(date).getDate()
            }.${
              new Date(date).getMonth() + 1 < 10
                ? `0${new Date(date).getMonth() + 1}`
                : new Date(date).getMonth() + 1
            }.${new Date(date).getFullYear()}`}
        </div>
        {(comment || photo) && (
          <div
            className={`${styles.InfoOpenContainer} ${
              isOpened ? styles.InfoOpenContainerExpanded : ""
            }`}
          >
            {photo && (
              <img className={styles.InfoOpenImage} src={photo} alt="full" />
            )}
            {comment && <div className={styles.InfoOpenText}>{comment}</div>}
          </div>
        )}
      </div>
      {(comment || photo) && (
        <div
          className={styles.DropdownBox}
          onClick={() => setIsOpened(!isOpened)}
        >
          <img
            className={isOpened ? styles.DropdownOpen : styles.Dropdown}
            src={Dropdown}
            alt="dropdown"
          />
        </div>
      )}
    </div>
  );
};

export default UserSmall;
