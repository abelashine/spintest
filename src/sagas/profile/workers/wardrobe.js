import { call, put } from "redux-saga/effects";

// Api
import { wardrobe } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";

export function* fetchWardrobe({ payload: { slug, cb } }) {
  const { response, error } = yield call(wardrobe, slug);
  if (response) {
    yield put(profileActions.fetchWardrobeSucceeded(response.products));
    if (cb) yield call(cb, response);
  } else {
    yield put(profileActions.fetchWardrobeFailed(error.message));
  }
}
