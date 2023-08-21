import { call, put, select } from "redux-saga/effects";
import { Mixpanel } from "../../../services/Mixpanel";

// Api
import {
  uploadGiveaway,
  uploadSellProduct,
  uploadSwapProduct,
  uploadRentProduct,
} from "../../../api";

// Actions
import { uploadSelectionActions } from "../../../actions/uploadSelection";
import { profileActions } from "../../../actions/profile";
import { authActions } from "../../../actions/auth";
import { errorsActions } from "../../../actions/errors";
import { unsubscribedActions } from "../../../actions/errors/unsubscribed";
import { reachedLimitActions } from "../../../actions/errors/reachedLimit";

export function* uploadBrandSwapProduct({ payload: { data, callback } }) {
  yield put(authActions.startLoading());
  const res = yield call(uploadSwapProduct, data);
  yield put(authActions.finishLoading());
  if (res.response) {
    const slug = yield select((state) => state.authReducer.userInfo.slug);
    yield put(profileActions.fetchStartShopProducts(slug));
    Mixpanel.track("New Product");
  } else {
    if (res.message === "Please subscribe to upload products") {
      yield put(unsubscribedActions.showUnsubscribedUserModal());
    } else if (
      res.message ===
      "You have reached the limit of items in your subscription plan"
    ) {
      yield put(reachedLimitActions.showReachedLimitUserModal());
    } else {
      yield put(
        errorsActions.showErrorRequestModal("Failed to upload product")
      );
    }
  }
  yield call(callback);
}

export function* uploadBrandSellProduct({ payload: { data, callback } }) {
  yield put(authActions.startLoading());
  const res = yield call(uploadSellProduct, data);
  yield put(authActions.finishLoading());
  if (res?.response) {
    const slug = yield select((state) => state.authReducer.userInfo.slug);
    yield put(profileActions.fetchStartShopProducts(slug));
    Mixpanel.track("New Product");
  } else {
    if (res.message === "Please subscribe to upload products") {
      yield put(unsubscribedActions.showUnsubscribedUserModal());
    } else if (
      res.message ===
      "You have reached the limit of items in your subscription plan"
    ) {
      yield put(reachedLimitActions.showReachedLimitUserModal());
    } else {
      yield put(
        errorsActions.showErrorRequestModal("Failed to upload product")
      );
    }
  }
  yield call(callback);
}

export function* uploadBrandRentProduct({ payload: { data, callback } }) {
  yield put(authActions.startLoading());
  const res = yield call(uploadRentProduct, data);
  yield put(authActions.finishLoading());
  if (res.response) {
    const slug = yield select((state) => state.authReducer.userInfo.slug);
    yield put(profileActions.fetchStartShopProducts(slug));
    Mixpanel.track("New Product");
  } else {
    if (res.message === "Please subscribe to upload products") {
      yield put(unsubscribedActions.showUnsubscribedUserModal());
    } else if (
      res.message ===
      "You have reached the limit of items in your subscription plan"
    ) {
      yield put(reachedLimitActions.showReachedLimitUserModal());
    } else {
      yield put(
        errorsActions.showErrorRequestModal("Failed to upload product")
      );
    }
  }
  yield call(callback);
}

export function* uploadProduct({ payload: { info, callback } }) {
  const resultPayload = {
    photos: info.photos,
    name: info.name,
    description: info.description,
    composition: info.composition,
    address_id: info.address_id,
    price: info.price,
    currency_id: info.currency_id,
    hashtag_ids: info.hashtag_ids,
    isPassOn: info.isPassOn,
    product_slug: info.slug,
    product_link_id: info.productLinkId,
  };

  if (info.card_id) {
    resultPayload.card_id = info.card_id;
  }
  yield put(authActions.startLoading());
  const res = yield call(uploadGiveaway, resultPayload);
  yield put(authActions.finishLoading());

  if (res.response) {
    yield put(uploadSelectionActions.uploadProductSuccess());
    yield put(profileActions.fetchStartShopProducts(info.slug));
    yield call(callback);
    Mixpanel.track("New Product");
  }
}
