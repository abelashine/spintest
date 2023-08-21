import { types } from "../actions/errors/reachedLimit/types";

const initialState = {
  reachedLimitModalOpen: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SHOW_REACHED_LIMIT_MODAL:
      return {
        ...state,
        reachedLimitModalOpen: true,
      };
    case types.HIDE_REACHED_LIMIT_MODAL:
      return {
        ...state,
        reachedLimitModalOpen: false,
      };
    default:
      return { ...state };
  }
};
