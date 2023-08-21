import { types } from "./types";

export const unsubscribedActions = {
    // Sync
    showUnsubscribedUserModal() {
        return {
            type: types.SHOW_UNSUBSCRIBED_USER_MODAL,
        };
    },
    hideUnsubscribedUserModal() {
        return {
            type: types.HIDE_UNSUBSCRIBED_USER_MODAL,
        };
    },
};
