import { all, call } from "redux-saga/effects";

// // Watchers
import watchAuth from "./auth/watchers";
import watchProfile from "./profile/watchers";
import watchUploadSelection from "./uploadSelection/watchers";

export default function* rootSaga() {
  yield all([call(watchAuth), call(watchProfile), call(watchUploadSelection)]);
}
