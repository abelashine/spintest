import { call, put } from "redux-saga/effects";

// Api
import { prelogin } from "../../../api";

// Routes
import routes from "../../../routes";

// Actions
import { authActions } from "../../../actions/auth";

export function* preLogin({ payload: { email, history, setStep } }) {
  yield put(authActions.startLoading());
  const { response } = yield call(prelogin, email);
  yield put(authActions.finishLoading());

  if (response) {
    yield put(authActions.enterPassword(response));
    yield call(setStep, 1)
  } else {
    yield call([history, "push"], routes.register);
    yield localStorage.setItem("new_user_email", JSON.stringify(email));
  }
}
