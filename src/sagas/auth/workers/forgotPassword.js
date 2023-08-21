import { call } from "redux-saga/effects";

// Api
import { forgotPassword } from "../../../api";

export function* forgotOldPassword({ payload: { email } }) {
  const { response, error } = yield call(forgotPassword, email);

  if (response) {
    //console.log();
  } else {
    //console.log(error);
  }
}
