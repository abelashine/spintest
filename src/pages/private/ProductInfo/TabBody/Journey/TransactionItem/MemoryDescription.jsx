import React from "react";
import styles from "./TransactionItem.module.scss";
import { Link } from "react-router-dom";

const MemoryDescription = ({ text }) => {
  const uploadedContent = text.split(" ").map((str, i, array) => {
    const spaceAfter = i === array.length - 1 ? "" : " ";
    if (str[0] === "@" && str.length > 1) {
      const slugName = str.slice(1);
      const updatedStr = (
        <div className={styles.textlink} key={i}>
          <Link to={`/${slugName}/profile/`} className={styles.link}>
            {str}
            {spaceAfter}
          </Link>
        </div>
      );
      return updatedStr;
    }
    return str + spaceAfter;
  });
  return <div>{uploadedContent}</div>;
};

export default MemoryDescription;
