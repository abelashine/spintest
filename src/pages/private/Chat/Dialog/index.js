import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IMKitApi, IMKitSocket } from "imkit-js-api-v3";
import styles from "./Dialog.module.scss";
import { authActions } from "../../../../actions/auth";
import { getChatRooms } from "../../../../utils";
import { chatActions } from "../../../../actions/chat";

import { Message } from "../Message/index";
import Avatar from "../../../../components/Avatar";
import ToolTipModal from "../../../../components/Modal/ToolTipModal";
import backArrow from "../../../../static/icons/back-long.png";
import addtion from "../../../../static/icons/addition.svg";
import uparrow from "../../../../static/icons/up-arrow.svg";

const CHAT_SERVER_URL = process.env.REACT_APP_IMKIT_DEV_CHAT_SERVER_URL;
const IMKIT_API_CLIENT_KEY = process.env.REACT_APP_IMKIT_DEV_CLIENT_KEY;

const Dialog = ({ location: { state } }) => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const { all, users } = useSelector((state) => state.chatReducer);
  const lastUrl = sessionStorage.getItem("lastUrl");
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [newMessages, setNewMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(state.chatRoomId);
  const [messagesNumber, setMessagesNumber] = useState(0);
  const [messagesHeight, setMessagesHeight] = useState(0);
  const [wasItPushed, setWasItPushed] = useState("");
  const inputRef = useRef(null);
  const messageContainer = useRef(null);

  // chat settings start
  const apiConfig = {
    domain: CHAT_SERVER_URL,
    clientKey: IMKIT_API_CLIENT_KEY,
    token: userInfo.chat_token,
  };
  const ImkitAPI = new IMKitApi(apiConfig);
  const socketConfig = {
    domain: CHAT_SERVER_URL,
    clientId: state.interlocutor.id,
    token: userInfo.chat_token,
    onReceiveMessage: () => setNewMessages(true),
    onConnect: () => socket.chatIn(),
  };
  const socket = new IMKitSocket(socketConfig);
  // chat settings end

  useEffect(() => {
    ImkitAPI.room
      .getRoomMessagesCount(chatRoomId)
      .then(({ count }) => setMessagesNumber(count));
    return () => {
      if (
        (state.tabType === "all" && all.length) ||
        (state.tabType === "users" && users.length)
      ) {
        dispatch(chatActions.updateRedDot(state.chatRoomId, state.tabType));
      }
    };
  }, []);

  useEffect(() => {
    const height = messageContainer?.current?.getBoundingClientRect()?.height;
    if (messages.length && messages.length < messagesNumber) {
      document.addEventListener("scroll", uploadMessagesOnScroll);
      setMessagesHeight(height);
    } else document.removeEventListener("scroll", uploadMessagesOnScroll);
    window.scrollTo({ top: height - messagesHeight });
    return () => document.removeEventListener("scroll", uploadMessagesOnScroll);
  }, [messages]);

  useEffect(() => {
    if (!chatRoomId && all?.length) {
      const id = all?.find((item) => {
        const isMember = item.members.find(
          (i) => +i.id === +state.interlocutor.id
        );
        return isMember;
      })?.id;
      setChatRoomId(id);
    }
    if (newMessages && chatRoomId) {
      dispatch(authActions.startLoading());
      ImkitAPI.room.getRoomMessages(chatRoomId).then((messages) => {
        setMessagesNumber(messages.totalCount);
        setMessages(messages.data);
        setNewMessages(false);
        window.scrollTo(0, document.body.scrollHeight);
        const last_sent_message = messages.data[0]?.id;
        if (last_sent_message) {
          ImkitAPI.room.updateLastRead(chatRoomId, last_sent_message);
          setTimeout(() => {
            getChatRooms(dispatch, userInfo);
          }, 500);
        }
        dispatch(authActions.finishLoading());
      });
    }
  }, [newMessages, chatRoomId, all]);
  // useEffect hooks end

  const sendMessage = () => {
    inputRef.current.focus();
    if (message) {
      ImkitAPI.room
        .sendMessage({ _id: chatRoomId }, { messageType: "text", message })
        .then(() => {
          setNewMessages(true);
          setMessage("");
        });
    }
  };

  const uploadMessagesOnScroll = () => {
    const bottom = messageContainer?.current?.getBoundingClientRect()?.bottom;
    const height = messageContainer?.current?.getBoundingClientRect()?.height;
    if (!bottom || !height || height - 150 > bottom) return;
    document.removeEventListener("scroll", uploadMessagesOnScroll);
    dispatch(authActions.startLoading());
    ImkitAPI.room
      .getRoomMessages(chatRoomId, 20, messages[messages.length - 1].id)
      .then((messages) => {
        setMessages((prev) => [...prev, ...messages.data]);
        setMessagesNumber(messages.totalCount);
        setNewMessages(false);
        dispatch(authActions.finishLoading());
      });
  };
  const [isInputClicked, setIsInputClicked] = useState(false);

  const backArrowHandler = () => {
    if (lastUrl) {
      history.push(lastUrl);
      sessionStorage.removeItem("lastUrl");
    } else {
      history.goBack();
    }
  };

  return (
    <div className={styles.Dialog}>
      {!!wasItPushed && (
        <ToolTipModal onClose={() => setWasItPushed("")} text={wasItPushed} />
      )}
      <div className={styles.nav}>
        <button className={styles.backButton} onClick={backArrowHandler}>
          <img src={backArrow} alt="back-arrow" />
        </button>
        <div className={styles.interlocutor_container}>
          <div className={styles.interlocutor_avatar}>
            <Link to={`/${state.interlocutor.slug}/profile/`}>
              <Avatar url={state.interlocutor.image.url} />
            </Link>
          </div>
          <div className={styles.interlocutor_slug}>
            @{state.interlocutor.slug}
          </div>
        </div>
      </div>
      <div className={styles.chatbox}>
        <div className={styles.message_container} ref={messageContainer}>
          {messages.map(
            ({
              message,
              messageType,
              originalUrl,
              createdAtMS,
              sender,
              id,
              extra,
            }) => (
              <Message
                key={id}
                content={message}
                messageType={messageType}
                productImage={originalUrl}
                avatar_url={
                  String(userInfo?.id) === String(sender?.id)
                    ? userInfo.image.url
                    : state.interlocutor.image.url
                }
                date={createdAtMS}
                me={String(userInfo.id) === String(sender?.id)}
                chatRoomId={chatRoomId}
                messageId={id}
                clientId={userInfo.id}
                extra={extra}
                slug={
                  String(userInfo.id) === String(sender?.id)
                    ? userInfo.slug
                    : state.interlocutor.slug
                }
                setWasItPushed={setWasItPushed}
              />
            )
          )}
        </div>
      </div>
      <div className={styles.message_sending}>
        <div className={styles.message_sending__wrapper}>
          <div className={styles.fileUpload}>
            <img src={addtion} />
          </div>

          <input
            type="text"
            value={message}
            ref={inputRef}
            onChange={({ target: { value } }) => {
              setMessage(value);
            }}
            className={styles.sendInput}
            onKeyDown={(event) => {
              setIsInputClicked(true);
              event.key === "Enter" && sendMessage();
            }}
            onFocus={(event) => {
              setIsInputClicked(true);
            }}
            onBlur={(event) => {
              setIsInputClicked(false);
            }}
          />

          <button
            className={
              !isInputClicked ? styles.sendButtonClicked : styles.sendButton
            }
            onClick={sendMessage}
          >
            <span>SEND</span>
            <span className={styles.upArrow}>
              <img src={uparrow} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dialog;
