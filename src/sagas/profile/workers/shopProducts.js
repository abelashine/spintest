import { call, put } from "redux-saga/effects";

// Api
import { fetchShopSpins } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";

export function* fetchStartShopProducts({ payload: { slug } }) {
  const res = yield call(fetchShopSpins, slug, 0);
  if (res.response) {
    yield put(profileActions.fetchStartShopProductsSucceed(res.response));
  }
}

export function* fetchShopProducts({ payload: { slug, page } }) {
  const res = yield call(fetchShopSpins, slug, page);
  if (res.response) {
    yield put(profileActions.fetchShopProductsSucceeded(res.response.products));
  }
}
