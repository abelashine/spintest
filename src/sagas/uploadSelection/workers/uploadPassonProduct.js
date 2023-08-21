import { call, put } from "redux-saga/effects";

// Api
import { uploadPassOnProduct } from "../../../api";

// Actions
import { uploadSelectionActions } from "../../../actions/uploadSelection";
import { authActions } from "../../../actions/auth";
import { errorsActions } from "../../../actions/errors";

export function* uploadPassonProduct({ payload: { data, callback } }) {
  yield put(authActions.startLoading());
  const res = yield call(uploadPassOnProduct, data);
  yield put(authActions.finishLoading());
  if (res.response) {
    yield put(uploadSelectionActions.removePassedOnProduct(data.passonLink));
  } else {
    yield put(errorsActions.showErrorRequestModal("Failed to pass on product"));
  }
  yield call(callback, res);
}
