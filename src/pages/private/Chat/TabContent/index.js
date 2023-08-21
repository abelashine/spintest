import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { chatActions } from "../../../../actions/chat";
import { getChatRooms } from "../../../../utils";

import ChatRoom from "../ChatRoom";
import styles from "./TabContent.module.scss";

const TabContent = ({ activeTab, users, all, requests }) => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const { totalRooms, roomsPage } = useSelector((state) => state.chatReducer);
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory()

  const onScrollRooms = () => {
    if (roomsPage * 20 > totalRooms) {
      document.removeEventListener("scroll", onScrollRooms);
      return;
    }
    const height = contentRef?.current?.getBoundingClientRect()?.height;
    const windHeightPercent = window.scrollY / height;
    if (windHeightPercent + 0.3 >= 1) {
      document.removeEventListener("scroll", onScrollRooms);
      dispatch(chatActions.setRoomSkipNum(roomsPage + 1));
    }
  };
  useEffect(() => {
    dispatch(chatActions.setRoomsViewStatus(true));
  }, []);
  useEffect(() => {
    if (all.length) {
      document.addEventListener("scroll", onScrollRooms);
    }
    return () => {
      document.removeEventListener("scroll", onScrollRooms);
    };
  }, [all]);
  useEffect(() => {
    if (all.length < totalRooms && roomsPage) {
      setTimeout(() => {
        document.addEventListener("scroll", onScrollRooms);
      }, 300);
      getChatRooms(history, dispatch, userInfo, roomsPage * 20, false);
    }
  }, [roomsPage]);

  if (activeTab === "All") {
    return (
      <div className={styles.TabContent} ref={contentRef}>
        {users &&
          all.map((data) => {
            const { _id, members, lastMessage, unread } = data;
            return (
              members.length >= 2 && (
                <ChatRoom
                  key={_id}
                  chatRoomId={_id}
                  interlocutor={
                    String(userInfo.id) === String(members[0].id)
                      ? users[members[1].id]
                      : users[members[0].id]
                  }
                  lastMessage={lastMessage ? lastMessage : ""}
                  isUnread={unread !== 0}
                  tabType="all"
                />
              )
            );
          })}
      </div>
    );
  }
  if (activeTab) {
    return (
      <div className={styles.TabContent} ref={contentRef}>
        {users &&
          all.map((data) => {
            const { _id, members, lastMessage, unread } = data;
            return (
              members.length >= 2 && (
                <ChatRoom
                  key={_id}
                  chatRoomId={_id}
                  interlocutor={
                    String(userInfo.id) === String(members[0].id)
                      ? users[members[1].id]
                      : users[members[0].id]
                  }
                  lastMessage={lastMessage ? lastMessage : ""}
                  isUnread={unread !== 0}
                  tabType="all"
                />
              )
            );
          })}
      </div>
    );
  }
  // if (activeTab === "Requests") {
  //   return (
  //     <div className={styles.TabContent}>
  //       {users &&
  //         requests.map(({ _id, members, lastMessage, unread }) => {
  //           return (
  //             members.length >= 2 && (
  //               <ChatRoom
  //                 key={_id}
  //                 chatRoomId={_id}
  //                 interlocutor={
  //                   String(userInfo.id) === String(members[0].id)
  //                     ? users[members[1].id]
  //                     : users[members[0].id]
  //                 }
  //                 lastMessage={lastMessage ? lastMessage : ""}
  //                 isUnread={unread !== 0}
  //                 tabType="users"
  //               />
  //             )
  //           );
  //         })}
  //     </div>
  //   );
  // }

};

export default TabContent;
