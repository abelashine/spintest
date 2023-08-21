import { takeLatest, takeEvery, all, call } from "redux-saga/effects";

// Types
import { types } from "../../../actions/auth/types";

// Workers
import { preLogin } from "../workers/prelogin";
import { signIn } from "../workers/signin";
import { forgotOldPassword } from "../workers/forgotPassword";
import { signUp } from "../workers/register";
import { updateProfileInfo } from "../workers/updateProfileInfo";

function* watchPrelogin() {
  yield takeLatest(types.PRELOGIN_ASYNC, preLogin);
}

function* watchLogin() {
  yield takeLatest(types.LOGIN_ASYNC, signIn);
}

function* watchForgotPassword() {
  yield takeLatest(types.FORGOT_PASSWORD, forgotOldPassword);
}

function* watchRegister() {
  yield takeLatest(types.REGISTER_ASYNC, signUp);
}

function* watcUpdateProfileInfo() {
  yield takeEvery(types.UPDATE_PROFILE_INFO_ASYNC, updateProfileInfo);
}

export default function* watchAuth() {
  yield all([
    call(watchPrelogin),
    call(watchLogin),
    call(watchForgotPassword),
    call(watchRegister),
    call(watcUpdateProfileInfo),
  ]);
}
