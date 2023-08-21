import { call, put, select } from "redux-saga/effects";
import { Mixpanel } from "../../../services/Mixpanel";

// Api
import { login } from "../../../api";

// Actions
import { authActions } from "../../../actions/auth";

export function* signIn({ payload: { credentials, history, setFieldError, cb } }) {
  yield put(authActions.startLoading());
  const { response, error } = yield call(login, credentials);
  yield put(authActions.finishLoading());

  const lastUrl = sessionStorage.getItem("lastUrl");

  if (response) {
    yield put(authActions.loginSuccess(response));
    yield call(
      [localStorage, "setItem"],
      "access_token",
      response.profile.token
    );
    yield call(
      [localStorage, "setItem"],
      "user_info",
      JSON.stringify(response)
    );
    if (cb) yield call(cb,response, history);
    if (lastUrl) {
      yield call([history, "push"], lastUrl);
    } else {
      if (response.business_role) {
        yield call([history, "push"], `/${response.slug}/profile/art`);
      } else {
        yield call([history, "push"], `/${response.slug}/profile`);
      }
    }

    Mixpanel.identify(response.profile.email);
    Mixpanel.track("Login");
    Mixpanel.people.set({
      $name: response.profile.first_name,
      $email: response.profile.email,
    });
  } else {
    yield put(authActions.loginFailed(error.message));
    yield call(setFieldError, "password", "Incorrect Password");
  }
}
