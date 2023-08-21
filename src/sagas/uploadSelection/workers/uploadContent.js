import { call, put, select } from "redux-saga/effects";

// Api
import { uploadNFT } from "../../../api";

// Actions
import { uploadSelectionActions } from "../../../actions/uploadSelection";
import { profileActions } from "../../../actions/profile";
import { authActions } from "../../../actions/auth";

export function* uploadContent({ payload: { info, callback } }) {
  yield put(authActions.startLoading());
  const { response, error } = yield call(uploadNFT, info);
  yield put(authActions.finishLoading());

  const slug = yield select((state) => state.authReducer.userInfo.slug);

  if (response) {
    yield put(uploadSelectionActions.uploadContentSuccess());
    yield put(profileActions.fetchSavedProducts(slug, 0));
    yield call(callback);
  } else {
    yield put(uploadSelectionActions.uploadContentFailed(error.message));
  }
}
