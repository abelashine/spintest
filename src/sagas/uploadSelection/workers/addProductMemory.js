import { call, put } from "redux-saga/effects";

// Api
import { editTransactionHistory } from "../../../api";

// Actions
import { authActions } from "../../../actions/auth";
import { uploadSelectionActions } from '../../../actions/uploadSelection'

export function* addProductMemory({ payload: { token, data, cb } }) {
    yield put(authActions.startLoading());
    const { response } = yield call(editTransactionHistory, token, data);
    yield put(authActions.finishLoading());
    if (response) {
        yield put(uploadSelectionActions.setProductMemory(response))
    } else {
        // yield put() // in here it is possible to write something for case of error
    }
    yield call(cb)
}
