import { call, put } from "redux-saga/effects";

// API
import { deleteTransactionMemory } from "../../../api";

// actions
import { authActions } from "../../../actions/auth";
import { profileActions } from "../../../actions/profile";

export function* deleteTransMemory({ payload: { id, slug } }) {
  yield put(authActions.startLoading());
  const { response } = yield call(deleteTransactionMemory, String(id));
  yield put(authActions.finishLoading());
  if (response) {
    yield put(profileActions.deleteMemoryLocally(id, slug));
  }
}
