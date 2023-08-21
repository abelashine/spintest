import { call, put } from "redux-saga/effects";

// Api
import { fetchFollowingProfilebrands } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";

export function* fetchFollowingBrands({ payload: { userSlug, page } }) {
  const { response, error } = yield call(
    fetchFollowingProfilebrands,
    userSlug,
    page
  );

  if (response) {
    yield put(profileActions.fetchFollowingBrandsSecceeded(response.following));
  } else {
    yield put(profileActions.fetchFollowingBrandsFailed(error.message));
  }
}
