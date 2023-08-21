export const getUserToken = () => localStorage.getItem("access_token");

export const getUserInfo = () => JSON.parse(localStorage.getItem("user_info"));

export const deleteUserInfo = () => localStorage.clear();

export const getClientId = () => localStorage.getItem("client_id");