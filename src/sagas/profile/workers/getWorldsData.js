import { call, put } from "redux-saga/effects";
import myWorldForBusiness from "../../../static/images/my_world.png";
import myWorld from '../../../static/images/my-world.png'


// Api
// here should be import fetch method from 'api' folder

// Actions
import { profileActions } from "../../../actions/profile";
import { authActions } from "../../../actions/auth";

// moch data until server returns data, after that remove it
const mochaWordsData = {
  response: [
    {
      title: "My world",
      id: 0,
      image: myWorld
    },
  ],
};

export function* getWorldsData({ payload: { history, isBusinessRole } }) {
  yield put(authActions.finishLoading());
  // here shoulbe the call of method to the server
  // const res = yield call(<method to the server>);
  const res = mochaWordsData; // moch data here, after makinf method, remove this
  yield put(authActions.finishLoading());
  if (res?.response) {
    if (isBusinessRole) {
      res.response[0].image = myWorldForBusiness;
    }
    yield put(profileActions.setWorldsData(res.response));
  } else if (history) {
    yield call([history, "push"], "/error");
  }
}
