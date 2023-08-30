import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import styles from "./Chat.module.scss";

import ProfileHeader from "../../../components/ProfileHeader";
import Avatar from "../../../components/Avatar";
import TabsGroup from "../../../components/TabsGroup";
import ChatTabsGroup from "../../../components/ChatTabsGroup";
import TabContent from "./TabContent";

const Chat = ({ match, isUnreadMessage }) => {
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const [activeTab, setTab] = useState("All");
  const viewAs = useCallback(() => match.params.slug, [match.params.slug]);
  const { all, requests, users } = useSelector((state) => state.chatReducer);
  // const { requestCounter } = useSelector((state) => state.chatReducer);

  return (
    <div className={styles.Chat}>
      <div className={styles.profileInfo}>
        <ProfileHeader viewAs={viewAs()} isUnreadMessage={isUnreadMessage} />
        <div className={styles.profileSummaryWrapper}>
          <div className={styles.profileSummaryInfo}>
            <span className={styles.profileFullName}>INBOX</span>
            <ul className={styles.impactInfo}>
              {/* The bottom comment shows how much chat does a user have */}
              {/* <li>{all && all.length} Chats</li> */}
              {/* TODO: in here we temporarly commet until getting messages separately will work*/}
              {/* <li>{requestCounter} Requests</li> */}
            </ul>
          </div>
          
        </div>
      </div>

      <ChatTabsGroup
        activeTab={activeTab}
        tabs={
          [
            // TODO: in here we temporarly commet until getting messages separately will work
            { name: "All", label: "ALL", fill: true },
            { name: "DMS", label: "DMS" ,fill:true},
          ]
        }
        isUnreadMessage={isUnreadMessage}
        onTabChange={setTab}
      />
      <TabContent
        className={styles.tabContent}
        activeTab={activeTab}
        users={users}
        all={all}
        requests={requests}
      />
    </div>
  );
};
export default Chat;
