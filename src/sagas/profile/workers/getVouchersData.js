import { put, call } from "redux-saga/effects";

// Api
import { getVouchersDataReq } from "../../../api";
import { checkVoucherCodeReq } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";
import { authActions } from "../../../actions/auth";

export function* getVouchersData() {
  yield put(authActions.startLoading());
  const { response } = yield call(getVouchersDataReq);
  yield put(authActions.finishLoading());
  if (response?.coupons) {
    yield put(profileActions.setVouchersData(response.coupons));
  }
}

export function* checkVoucherCode({ payload: { data, cb } }) {
  const gottendata = yield call(checkVoucherCodeReq, data);
  yield call(cb, gottendata);
}
