import { types } from "../actions/errors/unsubscribed/types";

const initialState = {
    isRequestError: {
        isError: false,
    },
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.SHOW_UNSUBSCRIBED_USER_MODAL:
            return {
                ...state,
                isRequestError: {
                    isError: true,
                },
            };
        case types.HIDE_UNSUBSCRIBED_USER_MODAL:
            return {
                ...state,
                isRequestError: {
                    isError: false,
                },
            };
        default:
            return { ...state };
    }
};
