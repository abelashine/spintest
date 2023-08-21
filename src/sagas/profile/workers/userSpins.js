import { call, put, select } from "redux-saga/effects";

// Api
import { fetchAllSpins } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";

export function* fetchSpins({ payload: { slug, page } }) {
  const currentSlug = yield select((state) => state.authReducer.userInfo.slug);
  const { response } = yield call(fetchAllSpins, slug || currentSlug, page);

  if (response) {
    yield put(profileActions.fetchSpinsSucceeded(response.products));
  } else {
    yield put(profileActions.fetchSpinsFailed("Error"));
  }
}
