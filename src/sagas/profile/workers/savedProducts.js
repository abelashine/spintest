import { call, put } from "redux-saga/effects";

// Api
import { fetchSavedProducts } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";

export function* fetchSaved({ payload: { userSlug, page } }) {
  const { response, error } = yield call(fetchSavedProducts, userSlug, page);

  if (response) {
    page === 0
      ? yield put(
          profileActions.fetchSavedProductsAndUpdateSucceeded(response.posts)
        )
      : yield put(
          profileActions.fetchSavedProductsAndAddSucceeded(response.posts)
        );
  } else {
    yield put(profileActions.fetchSavedProductsFailed(error.message));
  }
}
