import { call, put } from "redux-saga/effects";

// Api
import { unfollow } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";

export function* unfollowUser({ payload: { slug, changeStatus } }) {
  const { response } = yield call(unfollow, slug);
  if (response) {
    yield changeStatus();
    yield put(profileActions.unfollowUserSucceeded());
  } else {
    yield put(profileActions.unfollowUserFailed("Error"));
  }
}
