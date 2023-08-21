import { call, put } from "redux-saga/effects";

// Api
import { weekSelection } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";

export function* fetchWeekSelection() {
  const { response, error } = yield call(weekSelection);

  if (response) {
    yield put(profileActions.fetchWeekSelectionSucceeded(response.products));
  } else {
    yield put(profileActions.fetchWeekSelectionFailed(error.message));
  }
}
