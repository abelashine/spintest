import { put, call } from "redux-saga/effects";

// Api
import { getCloudinaryImageList } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";

export function* getGalleryImages() {
  const { response } = yield call(getCloudinaryImageList);
  if (response?.images) {
    yield put(profileActions.setGalleryImages(response.images));
  }
}
