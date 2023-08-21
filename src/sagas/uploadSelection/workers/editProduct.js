import { call, put, select } from "redux-saga/effects";
import { Mixpanel } from "../../../services/Mixpanel";

// Api
import { editGiveaway, editSellRent } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";
import { authActions } from "../../../actions/auth";

export function* editSwapProduct({ payload: { info, callback } }) {
  yield put(authActions.startLoading());
  const { response } = yield call(editGiveaway, info);
  yield put(authActions.finishLoading());
  if (response) {
    const slug = yield select((state) => state.profileReducer.productInfo.slug);
    yield put(profileActions.fetchProdBySlug(slug));
    yield call(callback);
    Mixpanel.track("New Product");
  }
}

export function* editSellRentProduct({ payload: { info, callback } }) {
  yield put(authActions.startLoading());
  const slug = yield select((state) => state.profileReducer.productInfo.slug);
  const { response } = yield call(editSellRent, info, slug);
  yield put(authActions.finishLoading());
  if (response) {
    yield put(profileActions.fetchProdBySlug(slug));
    yield call(callback);
    Mixpanel.track("New Product");
  }
}
