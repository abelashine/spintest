import { call, put } from "redux-saga/effects";
import { Mixpanel } from "../../../services/Mixpanel";

// Api
import {
  tokenizedProductInfo,
  productCharacteristics,
  transactionHistory,
  tokenizedProductBrandInfo,
} from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";
import { authActions } from "../../../actions/auth";
import { errorsActions } from "../../../actions/errors";

export function* getProductBySlug({ payload: { slug, callback, history } }) {
  yield put(authActions.startLoading());
  const res = yield call(productCharacteristics, slug);
  yield put(authActions.finishLoading());
  if (res?.response && res?.response?.uniqueId) {
    yield put(profileActions.fetchProdByToken(res.response.uniqueId));
    yield put(profileActions.fetchTransactionHistory(res.response.uniqueId));
    yield put(profileActions.fetchTokenizedBrandInfo(res.response.uniqueId));
    if (callback) yield call(callback, res.response);
    Mixpanel.track("New Product");
  } else {
    yield put(
      errorsActions.showErrorRequestModal("Failed to get product data")
    );
    yield call([history, "push"], "/profile");
  }
}

export function* getProductByToken({ payload: { token, cb, history } }) {
  yield put(authActions.startLoading());
  const res = yield call(tokenizedProductInfo, token);
  yield put(authActions.finishLoading());
  if (res?.response) {
    yield put(profileActions.setProductInfo(res.response));
    Mixpanel.track("New Product");
  } else {
    yield put(
      errorsActions.showErrorRequestModal("Failed to get product data")
    );
    if (history) yield call([history, "push"], "/profile");
  }
  if (cb) yield call(cb);
}

export function* getTransactionHistory({ payload: { token } }) {
  yield put(authActions.startLoading());
  const res = yield call(transactionHistory, token);
  yield put(authActions.finishLoading());
  if (res?.response) {
    yield put(profileActions.setTransactionHistory(res.response));
    Mixpanel.track("New Product");
  }
}

export function* getTokenizedProductBrandInfo({ payload: { token } }) {
  yield put(authActions.startLoading());
  const res = yield call(tokenizedProductBrandInfo, token);
  yield put(authActions.finishLoading());
  if (res?.response) {
    yield put(profileActions.setTokenizedProductBrandInfo(res.response));
    Mixpanel.track("New Product");
  }
}
