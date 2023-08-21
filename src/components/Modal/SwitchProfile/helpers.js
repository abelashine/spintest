import { store } from "../../../store";
import { profileActions } from "../../../actions/profile";

export const setLastUsersData = (response) => {
  const profileSlug = localStorage.getItem("profileSlug");
  const lastUser = {
    id: response.id,
    slug: response.slug,
    profileSlug,
  };
  const lastUsersDataToRememberLastAccounts = JSON.parse(
    localStorage.getItem("lastUsersDataToRememberLastAccounts")
  );
  const lastUserIndex = lastUsersDataToRememberLastAccounts?.findIndex(
    (u) => u.profileSlug === profileSlug
  );
  if (typeof lastUserIndex === "number" && lastUserIndex >= 0) {
    lastUsersDataToRememberLastAccounts[lastUserIndex] = lastUser;
    localStorage.setItem(
      "lastUsersDataToRememberLastAccounts",
      JSON.stringify(lastUsersDataToRememberLastAccounts)
    );
  } else {
    localStorage.setItem(
      "lastUsersDataToRememberLastAccounts",
      JSON.stringify(lastUsersDataToRememberLastAccounts)
    );
  }
};

export const setProfileCB = (response, history, onClose) => {
  let url = "/";
  if (!!response.business_role) {
    url = `/${response.slug}/profile/art`;
  } else {
    url = `/${response.slug}/profile/store`;
  }
  setTimeout(() => {
    history.push(url);
  }, 0);
  store.dispatch(profileActions.setTabKind("art"));
  store.dispatch(profileActions.setUsualTabKind("vault"));
  setLastUsersData(response);
  onClose();
};
