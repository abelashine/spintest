import { call, put } from "redux-saga/effects";

// Api
import { updateProfile } from "../../../api";

// Actions
import { authActions } from "../../../actions/auth";
import { profileActions } from "../../../actions/profile";

export function* updateProfileInfo({ payload: { info, userInfo, callback } }) {
  yield put(authActions.startLoading());
  const { response } = yield call(updateProfile, info);
  yield put(authActions.finishLoading());

  if (response) {
    const updatedUserInfo = {...userInfo, ...response}
    yield put(authActions.updateProfileInfoSucceeded(updatedUserInfo));
    yield put(profileActions.fetchProfileData(info.slug));
    yield call(
      [localStorage, "setItem"],
      "user_info",
      JSON.stringify(updatedUserInfo)
    );
    yield call(callback);
  } else {
    yield put(authActions.updateProfileInfoFailed());
  }
}
