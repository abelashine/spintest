/*eslint-disable */
import { IMKitSocket } from "imkit-js-api-v3";
import { getChatRooms } from "../src/utils/index";
import { profileActions } from "./actions/profile";
import { store } from "./store";
import { foreignProfilebrandInfo } from "./api";
import { setDialogConnectionHandler } from "./utils";

export const onReseiveMessageHandler = (dispatch, userInfo, props) => {
  if (props.messageType === "spinRequest") {
    const extra = JSON.parse(props.extra);
    const isConfirmed = !!+extra.requestConfirmStatus;
    if (isConfirmed) {
      dispatch(profileActions.shouldUpdateVault(true));
    }
  }
  getChatRooms(history, dispatch, userInfo);
};

export const watchNewMessages = (dispatch, userInfo) => {
  if (!userInfo) return;
  const CHAT_SERVER_URL = process.env.REACT_APP_IMKIT_DEV_CHAT_SERVER_URL;
  const socketConfig = {
    domain: CHAT_SERVER_URL,
    token: userInfo.chat_token,
    onReceiveMessage: (props) =>
      onReseiveMessageHandler(dispatch, userInfo, props),
    onConnect: () => socket.chatIn(),
  };
  const socket = new IMKitSocket(socketConfig);
  socket.chatIn();
};

export const isThereUnrMes = (all, requests, setIsUnreadMessage) => {
  const isThereUunread =
    all?.find((el) => el.unread) || requests?.find((el) => el.unread) || false;
  setIsUnreadMessage(!!isThereUunread);
};

export const checkRoomAnGoToRouteHandler = async (
  userInfo,
  interlocutorSlug,
  history
) => {
  const { error, response } = await foreignProfilebrandInfo(interlocutorSlug);
  if (error) {
    history.push("/error");
  } else {
    setDialogConnectionHandler(history, userInfo, response, () => {
      sessionStorage.removeItem("toChatRouteData");
      sessionStorage.setItem("lastUrl", "/");
    });
  }
};

export const catchGoToChatRoute = (location, history) => {
  const queryParams = location.search.slice(1).split("&");
  let isRouteToChat = false;
  if (
    queryParams[0].includes("interlocutor") &&
    queryParams[1].includes("profileSlug") &&
    queryParams[2].includes("accountSlug") &&
    queryParams[3].includes("accountID")
  ) {
    isRouteToChat = true;
  }
  if (!isRouteToChat) {
    // if no from push on REPLY button
    return;
  }
  const toChatRouteData = {
    interlocutorSlug: queryParams[0].split("=")[1],
    rootProfileSlug: queryParams[1].split("=")[1],
    choosenAccountSlug: queryParams[2].split("=")[1],
    choosenAccountId: queryParams[3].split("=")[1],
  };
  const { userInfo } = store.getState().authReducer;
  const profileSlug = localStorage.getItem("profileSlug");
  if (!userInfo) {
    sessionStorage.setItem("toChatRouteData", JSON.stringify(toChatRouteData));
    return;
  }
  const isSameProfile = profileSlug === toChatRouteData.rootProfileSlug;
  if (!isSameProfile) {
    return;
  }
  if (userInfo.slug === toChatRouteData.choosenAccountSlug) {
    checkRoomAnGoToRouteHandler(
      userInfo,
      toChatRouteData.interlocutorSlug,
      history
    );
  } else {
    store.dispatch(
      profileActions.switchProfileWhenLogin(
        toChatRouteData.choosenAccountSlug,
        toChatRouteData.choosenAccountId,
        history,
        (response) => {
          checkRoomAnGoToRouteHandler(
            response,
            toChatRouteData.interlocutorSlug,
            history
          );
        }
      )
    );
  }
};
