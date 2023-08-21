import { call, put } from "redux-saga/effects";
import { fetchWearableItemForHomeScreen, fetchArtItemForHomeScreen } from "../../../api";
import { profileActions } from "../../../actions/profile";

export function* fetchWearableDataWorker({ payload: { page, cb } }) {

    if (typeof page === "number") {
        const { response } = yield call(fetchWearableItemForHomeScreen, page);

        if (response) {
            yield put(profileActions.fetchHomepageWearableItem(response));
            if (cb) {
                cb();
            }
        }
    }

    if (cb) {
        cb();
    }
}


export function* fetchArtDataWorker({ payload: { page, cb } }) {

    if (typeof page === "number") {
        const { response } = yield call(fetchArtItemForHomeScreen, page);

        if (response) {
            yield put(profileActions.fetchHomepageArtItem(response));
            if (cb) {
                cb();
            }
        }
    }

    if (cb) {
        cb();
    }
}
