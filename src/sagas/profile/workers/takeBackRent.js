import { call } from "redux-saga/effects";

// Api
import { checkTakeBackRent, takeBackRent } from "../../../api";

export function* checkTakeBackRentalProduct({
  payload: { passon_link, callback },
}) {
  const res = yield call(checkTakeBackRent, passon_link);
  if (res?.response && callback) {
    yield call(callback, res.response);
  }
}

export function* takeBackRentalProduct({ payload: { data, callback } }) {
  const res = yield call(takeBackRent, data);
  if (callback) yield call(callback, res);
}
