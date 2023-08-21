import { types } from "../actions/auth/types";
import { getUserToken, getUserInfo } from "../utils/localStorage";

const initialState = {
  email:
    (getUserInfo() && getUserInfo().profile && getUserInfo().profile.email) ||
    "",
  isAuthenticated: !!getUserToken(),
  isUserExists: false,
  loginFailed: false,
  userInfo: getUserInfo(),
  isLoading: false,
  isFirstPopupNeed: false,
  appTitles: {
    spinConnect: "SPIN connect",
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.PRELOGIN_ASYNC:
      return { ...state, email: payload.email };

    case types.ENTER_PASSWORD:
      return { ...state, ...payload, isUserExists: true };

    case types.RETURN_TO_LOGIN:
      return { ...state, isUserExists: false };

    case types.LOGIN_FAILED:
      return { ...state, ...payload, loginFailed: true };

    case types.LOGIN_SUCCESS:
      return { ...state, userInfo: { ...payload }, isAuthenticated: true };

    case types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        email: "",
        isUserExists: false,
        userInfo: null,
      };

    case types.UPDATE_PROFILE_INFO_SUCCEEDED: {
      return { ...state, userInfo: payload.updatedInfo };
    }

    case types.START_LOADING:
      return { ...state, isLoading: true };

    case types.FINISH_LOADING:
      return { ...state, isLoading: false };

    case types.IS_FIRST_POPUP_NEED:
      return { ...state, isFirstPopupNeed: !state.isFirstPopupNeed };

    default:
      return { ...state };
  }
};
