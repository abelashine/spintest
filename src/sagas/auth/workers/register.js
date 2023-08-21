import { call, put, select } from "redux-saga/effects";
import { Mixpanel } from "../../../services/Mixpanel";

import { authActions } from "../../../actions/auth";

// Api
import { register } from "../../../api";

export function* signUp({ payload: { userInfo, history } }) {
  yield put(authActions.startLoading());
  const { response } = yield call(register, userInfo);
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
      "firsttime",
      "true"
      
    );
    yield call(
      [localStorage, "setItem"],
      "user_info",
      JSON.stringify(response)
    );
    if (lastUrl) {
      yield call([history, "push"], lastUrl);
    } else {
      yield call([history, "push"], `/${response.slug}/profile`);
    }

    Mixpanel.identify(response.profile.email);
    Mixpanel.track("Sign Up");
    Mixpanel.people.set({
      $name: response.profile.first_name,
      $email: response.profile.email,
    });
  } else {
  }
}
