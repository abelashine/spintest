import types from "../actions/chat/types";

const initialState = {
  requestCounter: 0,
  requests: [],
  all: [],
  users: [],
  isChatDialogOpen: false,
  isRoomsOpen: false,
  totalRooms: 0,
  roomsPage: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_CHAT_REQUEST_COUNTER:
      return { ...state, requestCounter: payload.value };
    case types.SET_CHAT_REQUESTS:
      return {
        ...state,
        requests: [...state.requests, ...payload.data.data],
        totalRooms: payload.data.totalCount,
      };

    case types.SET_START_ALL_DATA: {
      return {
        ...state,
        all: payload.data.data,
        totalRooms: payload.data.totalCount,
        roomsPage: 0,
      };
    }
    case types.UPDATE_ALL_DATA: {
      return {
        ...state,
        all: [...state.all, ...payload.data.data],
        totalRooms: payload.data.totalCount,
      };
    }
    case types.SET_START_CHAT_USERS: {
      return { ...state, users: payload.data };
    }
    case types.UPDATE_CHAT_USERS: {
      return { ...state, users: { ...state.users, ...payload.data } };
    }
    case types.UPDATE_RED_DOT: {
      const updatedAll = JSON.parse(JSON.stringify(state[payload.tabType]));
      const updatedElIndex = updatedAll.findIndex(
        (el) => el.id === payload.chatRoomId
      );
      if (updatedElIndex >= 0) {
        updatedAll[updatedElIndex].unread = 0;
      }
      return {
        ...state,
        [payload.tabType]: updatedAll,
      };
    }
    case types.SET_CHAT_DIALOG_STATUS:
      return { ...state, isChatDialogOpen: payload.isOpen };
    case types.SET_ROOM_SKIP_NUM:
      return { ...state, roomsPage: payload.value };
    case types.CLEAR_CHAT_DATA:
      return {
        ...state,
        all: [],
        requests: [],
        totalRooms: 0,
        users: [],
        roomsPage: 0,
      };
    case types.SET_ROOMS_VIEW_STATUS:
      return { ...state, isRoomsOpen: payload.value };
    default:
      return { ...state };
  }
};
