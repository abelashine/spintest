import { types } from "./types";

export const reachedLimitActions = {
  // Sync
  showReachedLimitUserModal() {
    return {
      type: types.SHOW_REACHED_LIMIT_MODAL,
    };
  },
  hideReachedLimitUserModal() {
    return {
      type: types.HIDE_REACHED_LIMIT_MODAL,
    };
  },
};
