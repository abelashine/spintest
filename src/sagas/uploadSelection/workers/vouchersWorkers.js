import { call, put } from "redux-saga/effects";

// Api
import {
  createVoucherReq,
  deactivateVoucherReq,
  reactivateVoucherReq,
  editVoucherReq,
} from "../../../api";

// Actions
import { authActions } from "../../../actions/auth";
import { uploadSelectionActions } from "../../../actions/uploadSelection";

export function* createVoucher({ payload: { data, cb } }) {
  yield put(authActions.startLoading());
  const { response } = yield call(createVoucherReq, data);
  yield put(authActions.finishLoading());
  if (response?.coupon) {
    yield put(uploadSelectionActions.addCreatedVoucher(response?.coupon));
    yield call(cb);
  }
}

export function* editVoucher({ payload: { data, id, cb } }) {
  yield put(authActions.startLoading());
  const { response } = yield call(editVoucherReq, data, id);
  yield put(authActions.finishLoading());
  if (response?.coupon) {
    yield put(uploadSelectionActions.setEditedVoucher(id, response.coupon));
    yield call(cb);
  }
}

export function* deactivateVoucher({ payload: { id, cb } }) {
  yield put(authActions.startLoading());
  const { response } = yield call(deactivateVoucherReq, id);
  yield put(authActions.finishLoading());
  if (response) {
    yield put(uploadSelectionActions.removeActiveVoucher(id));
    yield call(cb);
  }
}

export function* reactivateVoucher({ payload: { id, cb } }) {
  yield put(authActions.startLoading());
  const { response } = yield call(reactivateVoucherReq, id);
  yield put(authActions.finishLoading());
  if (response) {
    yield put(uploadSelectionActions.makeVoucherActive(id, response));
    yield call(cb);
  }
}
