import types from "./types";

export const chatActions = {
  // Sync
  setRequestCounter(value) {
    return {
      type: types.SET_CHAT_REQUEST_COUNTER,
      payload: { value },
    };
  },
  setChatRequests(data) {
    return {
      type: types.SET_CHAT_REQUESTS,
      payload: { data },
    };
  },
  setStartAllChatData(data) {
    return {
      type: types.SET_START_ALL_DATA,
      payload: { data },
    };
  },
  updateAllChatData(data) {
    return {
      type: types.UPDATE_ALL_DATA,
      payload: { data },
    };
  },
  setStartChatUsers(data) {
    return {
      type: types.SET_START_CHAT_USERS,
      payload: { data },
    };
  },
  updateChatUsers(data) {
    return {
      type: types.UPDATE_CHAT_USERS,
      payload: { data },
    };
  },
  updateRedDot(chatRoomId, tabType) {
    return {
      type: types.UPDATE_RED_DOT,
      payload: { chatRoomId, tabType },
    };
  },
  setChatDialogStatus(isOpen) {
    return {
      type: types.SET_CHAT_DIALOG_STATUS,
      payload: { isOpen },
    };
  },
  setRoomSkipNum(value) {
    return {
      type: types.SET_ROOM_SKIP_NUM,
      payload: { value },
    };
  },
  setRoomsViewStatus(value) {
    return {
      type: types.SET_ROOMS_VIEW_STATUS,
      payload: { value },
    };
  },
};
