import { types } from "./types";

export const authActions = {
  // Async

  preloginAsync(email, history, setStep) {
    return {
      type: types.PRELOGIN_ASYNC,
      payload: { email, history, setStep },
    };
  },
  loginAsync(credentials, history, setFieldError, cb) {
    return {
      type: types.LOGIN_ASYNC,
      payload: { credentials, history, setFieldError, cb },
    };
  },

  forgotPasswordAsync(email) {
    return {
      type: types.FORGOT_PASSWORD,
      payload: { email },
    };
  },

  registerAsync(userInfo, history) {
    return {
      type: types.REGISTER_ASYNC,
      payload: { userInfo, history },
    };
  },
  updateProfileInfo(info, userInfo, callback) {
    return {
      type: types.UPDATE_PROFILE_INFO_ASYNC,
      payload: { info, userInfo, callback },
    };
  },

  // Sync

  loginSuccess(userInfo) {
    return {
      type: types.LOGIN_SUCCESS,
      payload: userInfo,
    };
  },

  enterPassword(userInfo) {
    return {
      type: types.ENTER_PASSWORD,
      payload: { userInfo },
    };
  },

  returnToLogin() {
    return {
      type: types.RETURN_TO_LOGIN,
    };
  },

  loginFailed(errorMessage) {
    return {
      type: types.LOGIN_FAILED,
      payload: { errorMessage },
    };
  },

  logout() {
    return {
      type: types.LOGOUT,
    };
  },
  updateProfileInfoSucceeded(updatedInfo) {
    return {
      type: types.UPDATE_PROFILE_INFO_SUCCEEDED,
      payload: { updatedInfo },
    };
  },
  updateProfileInfoFailed() {
    return {
      type: types.UPDATE_PROFILE_INFO_FAILED,
    };
  },
  startLoading() {
    return {
      type: types.START_LOADING,
    };
  },
  finishLoading() {
    return {
      type: types.FINISH_LOADING,
    };
  },
  setPopupNeedInfo(isFirstUserPopupNeed) {
    return {
      type: types.IS_FIRST_POPUP_NEED,
      payload: isFirstUserPopupNeed,
    };
  },
};
