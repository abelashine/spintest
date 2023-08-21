import React from "react";
import { Link } from "react-router-dom";
import styles from "./Message.module.scss";

const MessageText = ({ content }) => {
  const uploadedContent = content.split(" ").map((str, i, array) => {
    const spaceAfter = i === array.length - 1 ? "" : " ";
    if (str[0] === "@" && str.length > 1) {
      const slugName = str.slice(1);

      const updatedStr = (
        <Link key={i} to={`/${slugName}/profile/`} className={styles.link}>
          {str}
          {spaceAfter}
        </Link>
      );
      return updatedStr;
    }
    return str + spaceAfter;
  });
  return <div className={styles.textBlock}>{uploadedContent}</div>;
};

export default MessageText;
