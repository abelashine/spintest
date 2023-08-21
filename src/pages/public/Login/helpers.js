import { store } from "../../../store";
import { profileActions } from "../../../actions/profile";
import { foreignProfilebrandInfo } from "../../../api";
import { setDialogConnectionHandler } from "../../../utils";

const checkRoomAnGoToRouteHandler = async (
  userInfo,
  interlocutorSlug,
  history
) => {
  const { error, response } = await foreignProfilebrandInfo(interlocutorSlug);
  if (error) {
    history.push("/error");
  } else {
    setDialogConnectionHandler(history, userInfo, response, () => {
      sessionStorage.removeItem("toChatRouteData");
      sessionStorage.setItem("lastUrl", "/");
    });
  }
};

// this function hadles the case, when user pushed REPLY button from email message
// and no authorized
const chatFromEmailHandler = (
  isThereSavedData,
  toChatRouteData,
  userInfo,
  history,
  lastUsersDataToRememberLastAccounts
) => {
  if (!isThereSavedData) {
    // if localeStorage does not contain data about last account,
    // where user was earlier
    const arrayUsersData = [
      {
        slug: toChatRouteData.choosenAccountSlug,
        id: toChatRouteData.choosenAccountId,
        profileSlug: toChatRouteData.rootProfileSlug,
      },
    ];
    localStorage.setItem(
      "lastUsersDataToRememberLastAccounts",
      JSON.stringify(arrayUsersData)
    );
    if (
      toChatRouteData.choosenAccountSlug === toChatRouteData.rootProfileSlug
    ) {
      // when account slug and profile slug are the same,
      // profile - the user, who got the unread message
      history.push(`/${toChatRouteData.choosenAccountSlug}/profile/chat`);
    } else {
      // when account, who got the unread message is not the profile
      store.dispatch(
        profileActions.switchProfileThroughPopup(
          toChatRouteData.choosenAccountSlug,
          toChatRouteData.choosenAccountId,
          history,
          () => {
            history.push(`/${toChatRouteData.choosenAccountSlug}/profile/chat`);
          }
        )
      );
    }
  } else {
    // if localeStorage contains data about last account
    const lastUserIndex = lastUsersDataToRememberLastAccounts?.findIndex(
      (u) => u.profileSlug === userInfo.slug
    );
    const userData = {
      slug: toChatRouteData.choosenAccountSlug,
      id: toChatRouteData.choosenAccountId,
      profileSlug: toChatRouteData.rootProfileSlug,
    };
    const arrayUsersData = JSON.parse(
      localStorage.getItem("lastUsersDataToRememberLastAccounts")
    );
    if (lastUserIndex < 0) {
      arrayUsersData.push(userData);
    } else {
      arrayUsersData[lastUserIndex] = userData;
    }
    localStorage.setItem(
      "lastUsersDataToRememberLastAccounts",
      JSON.stringify(arrayUsersData)
    );

    if (
      toChatRouteData.choosenAccountSlug === toChatRouteData.rootProfileSlug
    ) {
      checkRoomAnGoToRouteHandler(
        userInfo,
        toChatRouteData.interlocutorSlug,
        history
      );
    } else {
      // when account, who git the unread message is not the profile
      store.dispatch(
        profileActions.switchProfileWhenLogin(
          toChatRouteData.choosenAccountSlug,
          toChatRouteData.choosenAccountId,
          history,
          (response) => {
            checkRoomAnGoToRouteHandler(
              response,
              toChatRouteData.interlocutorSlug,
              history
            );
          }
        )
      );
    }
  }
};

// this function is for setting last account, which was, when there was log out
export const setCorrectUserInfo = (userInfo, history) => {
  localStorage.setItem("profileSlug", userInfo.slug);
  const lastUsersDataToRememberLastAccounts = JSON.parse(
    localStorage.getItem("lastUsersDataToRememberLastAccounts")
  );
  const lastUrl = sessionStorage.getItem("lastUrl");
  const toChatRouteData = JSON.parse(sessionStorage.getItem("toChatRouteData"));
  const isThereSavedData =
    lastUsersDataToRememberLastAccounts &&
    lastUsersDataToRememberLastAccounts.length;

  if (toChatRouteData?.rootProfileSlug === userInfo.slug && !lastUrl) {
    // when user pushed REPLY button from email message
    // if login page from email, where user pushed on REPLY button to go to the chat
    // and user wasn't authorized
    chatFromEmailHandler(
      isThereSavedData,
      toChatRouteData,
      userInfo,
      history,
      lastUsersDataToRememberLastAccounts
    );
  } else {
    if (toChatRouteData) {
      sessionStorage.removeItem("toChatRouteData");
    }
    if (!isThereSavedData) {
      // if localeStorage does not contain data about last account,
      // where user was earlier
      const arrayUsersData = [
        {
          slug: userInfo.slug,
          id: userInfo.id,
          profileSlug: userInfo.slug,
        },
      ];
      localStorage.setItem(
        "lastUsersDataToRememberLastAccounts",
        JSON.stringify(arrayUsersData)
      );
    } else {
      // if localeStorage contains data about last account,
      const lastUser = lastUsersDataToRememberLastAccounts?.find(
        (u) => u.profileSlug === userInfo.slug
      );
      if (!lastUser) {
        // when user authorized first time authorized under this account
        // and it is absent in localStorage
        const userData = {
          slug: userInfo.slug,
          id: userInfo.id,
          profileSlug: userInfo.slug,
        };
        const arrayUsersData = JSON.parse(
          localStorage.getItem("lastUsersDataToRememberLastAccounts")
        );
        arrayUsersData.push(userData);
        localStorage.setItem(
          "lastUsersDataToRememberLastAccounts",
          JSON.stringify(arrayUsersData)
        );
      } else if (lastUser && lastUser.slug !== lastUser.profileSlug) {
        // when last account was found in localStorage and it is not the same as its profile
        const url = lastUrl ? lastUrl : `/${lastUser.slug}/profile`;
        const action = lastUrl
          ? "switchProfileWhenLogin"
          : "switchProfileThroughPopup";
        store.dispatch(
          profileActions[action](lastUser.slug, lastUser.id, history, () =>
            history.push(url)
          )
        );
      }
    }
  }
};
