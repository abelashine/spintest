import { call, put } from "redux-saga/effects";

// Api
import { fetchArts } from "../../../api";

// Actions
import { profileActions } from "../../../actions/profile";

export function* fetchStartArtsProducts({ payload: { slug } }) {
    const res = yield call(fetchArts, slug, 0);
    if (res.response) {
        yield put(profileActions.fetchStartArtsProductsSucceed(res.response))
    }
}

export function* fetchArtsProducts({ payload: { slug, page } }) {
    const res = yield call(fetchArts, slug, page);
    if (res.response) {
        yield put(profileActions.fetchArtsProductsSucceed(res.response.products))
    }
}
