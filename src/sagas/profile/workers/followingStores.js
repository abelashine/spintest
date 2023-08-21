import { call, put } from "redux-saga/effects";

// Api
import { fetchFollowingStores } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";

export function* fetchFollowingShops({ payload: { userSlug, page } }) {
  const { response, error } = yield call(fetchFollowingStores, userSlug, page);

  if (response) {
    yield put(profileActions.fetchFollowingStoresSucceeded(response.following));
  } else {
    yield put(profileActions.fetchFollowingStoresFailed(error.message));
  }
}
