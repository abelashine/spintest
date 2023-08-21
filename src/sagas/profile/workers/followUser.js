import { call, put } from "redux-saga/effects";

// Api
import { follow } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";

export function* followUser({ payload: { slug, changeStatus } }) {
  const { response } = yield call(follow, slug);

  if (response) {
    yield changeStatus();
    yield put(profileActions.followUserSucceeded());
  } else {
    yield put(profileActions.followUserFailed("Error"));
  }
}
