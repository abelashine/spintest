import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../../../components/Avatar";
import styles from "./ChatRoom.module.scss";

export default ({
  chatRoomId,
  interlocutor,
  lastMessage,
  isUnread,
  tabType,
}) => {
  return chatRoomId && interlocutor ? (
    <Link
      to={{
        pathname: `/${interlocutor.slug}/profile/dialog`,
        state: {
          chatRoomId: chatRoomId,
          interlocutor: interlocutor,
          tabType,
        },
      }}
    >
      <div className={styles.ChatRoom}>
        {isUnread && <span className={styles.unread_marker} />}
        <figure className={styles.room_image}>
          <Avatar
            url={interlocutor.image.url}
            isBrand={Boolean(interlocutor.business_role)}
          />
        </figure>
        <div className={styles.content}>
          <p className={styles.interlocutorSlug}>@{interlocutor.slug}</p>
          <p className={styles.lastMessage}>
            {lastMessage && lastMessage.message.length > 23
              ? `${lastMessage.message.slice(0, 23)}...`
              : lastMessage.message}....
              <div className={styles.hour}>.</div>
          </p>
        </div>
      </div>
    </Link>
  ) : null;
};
