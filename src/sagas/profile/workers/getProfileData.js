import { call, put, select } from "redux-saga/effects";

// Api
import { foreignProfilebrandInfo, switchableProfile } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";
import { authActions } from "../../../actions/auth";

export function* getProfileData({ payload: { slug, history, callback } }) {
  const res = yield call(foreignProfilebrandInfo, slug);
  if (res?.response) {
    yield put(profileActions.setProfileData(res.response));
    if (callback) yield call(callback, res.response.is_following);
  } else if (history) {
    yield call([history, "push"], "/error");
  }
}

export function* fetchProfilesForSwitchPopup({ payload: { history } }) {
  const { response } = yield call(switchableProfile);
  if (response) {
    yield put(profileActions.setProfilesToSwitchPopup(response.profilebrands));
  } else {
    yield call([history, "push"], "/error");
  }
}

export function* switchProfileThroughSwitchPopup({
  payload: { slug, id, history, cb },
}) {
  yield call([localStorage, "setItem"], "client_id", id);
  const { response } = yield call(foreignProfilebrandInfo, slug);
  if (response) {
    const newProfiles = yield call(switchableProfile);
    if (newProfiles.response) {
      const { wardrobeProducts } = yield select(
        (state) => state.profileReducer
      );
      if (wardrobeProducts) {
        yield put(profileActions.fetchWardrobeSucceeded(null));
      }
      yield put(
        profileActions.setProfilesToSwitchPopup(
          newProfiles.response.profilebrands
        )
      );
      yield put(profileActions.setProfileData(response));
      yield put(authActions.updateProfileInfoSucceeded(response));
      yield call(
        [localStorage, "setItem"],
        "user_info",
        JSON.stringify(response)
      );
      if (cb) {
        yield call(cb, response);
      }
    } else {
      yield call([history, "push"], "/error");
    }
  } else if (history) {
    yield call([history, "push"], "/error");
  }
}

export function* switchProfileWhenLogin({
  payload: { slug, id, history, cb },
}) {
  yield call([localStorage, "setItem"], "client_id", id);
  const { response } = yield call(foreignProfilebrandInfo, slug);
  if (response) {
    const newProfiles = yield call(switchableProfile);
    if (newProfiles.response) {
      yield put(
        profileActions.setProfilesToSwitchPopup(
          newProfiles.response.profilebrands
        )
      );
      yield put(authActions.updateProfileInfoSucceeded(response));
      yield call(
        [localStorage, "setItem"],
        "user_info",
        JSON.stringify(response)
      );
      if (cb) {
        yield call(cb, response);
      }
    } else {
      yield call([history, "push"], "/error");
    }
  } else if (history) {
    yield call([history, "push"], "/error");
  }
}
