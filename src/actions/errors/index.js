import { types } from "./types";

export const errorsActions = {
  // Sync
  showErrorRequestModal(message) {
    return {
      type: types.SHOW_REQUEST_ERROR_MODAL,
      payload: { errorMsg: message },
    };
  },
  hideErrorRequestModal() {
    return {
      type: types.HIDE_REQUEST_ERROR_MODAL,
    };
  },
};
