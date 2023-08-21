import { IMKitSocket } from "imkit-js-api-v3";
import { getChatRooms } from "../../utils/index";

export const watchNewMessages = (dispatch, userInfo, history) => {
  if (!userInfo) return;
  const CHAT_SERVER_URL = process.env.REACT_APP_IMKIT_DEV_CHAT_SERVER_URL;
  const socketConfig = {
    domain: CHAT_SERVER_URL,
    token: userInfo.chat_token,
    onReceiveMessage: () => getChatRooms(history, dispatch, userInfo),
    onConnect: () => socket.chatIn(),
  };
  const socket = new IMKitSocket(socketConfig);
  socket.chatIn();
};

export const isThereUnrMes = (all, requests, setIsUnreadMessage) => {
  const isThereUunread =
    all?.find((el) => el.unread) || requests?.find((el) => el.unread) || false;
  setIsUnreadMessage(isThereUunread);
};
