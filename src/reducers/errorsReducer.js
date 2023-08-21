import { types } from "../actions/errors/types";

const initialState = {
  isRequestError: {
    isError: false,
    errorMsg: "",
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SHOW_REQUEST_ERROR_MODAL:
      return {
        ...state,
        isRequestError: {
          isError: true,
          errorMsg: payload.errorMsg,
        },
      };
    case types.HIDE_REQUEST_ERROR_MODAL:
      return {
        ...state,
        isRequestError: {
          isError: false,
          errorMsg: "",
        },
      };
    default:
      return { ...state };
  }
};
