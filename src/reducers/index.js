import { combineReducers } from "redux";

import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import chatReducer from "./chatReducer";
import errorsReducer from "./errorsReducer";
import unsubscribedReducer from "./unsubscribedReducer";
import reachedLimitReducer from "./reachedLimitReducer";

const rootReducer = combineReducers({
  authReducer,
  profileReducer,
  chatReducer,
  errorsReducer,
  unsubscribedReducer,
  reachedLimitReducer,
});

export default rootReducer;
