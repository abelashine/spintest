import { IMKitApi } from "imkit-js-api-v3";
import { store } from "../../../store";
import { foreignProfilebrandInfo } from "../../../api";
import { errorsActions } from "../../../actions/errors";
import { authActions } from "../../../actions/auth";

export const followingTabs = [
  {
    name: "profiles",
    label: "Profiles",
  },
  {
    name: "stores",
    label: "Stores",
  },
];

export const followChatHandler = async (
  history,
  userInfo,
  slug = null,
  profileInfo = null
) => {
  if (
    (!profileInfo && !slug) ||
    profileInfo?.slug === userInfo.slug ||
    slug === userInfo.slug
  ) {
    return;
  } else {
    store.dispatch(authActions.startLoading());
    let profileData;
    if (profileInfo) {
      profileData = profileInfo;
    } else {
      try {
        const prof = await foreignProfilebrandInfo(slug);
        profileData = prof.response;
      } catch (err) {
        store.dispatch(
          errorsActions.showErrorRequestModal(
            "Impossible to open chat for the moment."
          )
        );
      }
    }

    const TOKEN = userInfo.chat_token;
    const CHAT_SERVER_URL = process.env.REACT_APP_IMKIT_DEV_CHAT_SERVER_URL;
    const IMKIT_API_CLIENT_KEY = process.env.REACT_APP_IMKIT_DEV_CLIENT_KEY;
    const apiConfig = {
      domain: CHAT_SERVER_URL,
      clientKey: IMKIT_API_CLIENT_KEY,
      token: TOKEN,
    };
    const api = new IMKitApi(apiConfig);
    api.room
      .createAndJoinRoom({
        roomType: "direct",
        invitee: [String(profileData.id)],
      })
      .then((room) => {
        api.room.addMember(room.id, profileData.id).then(() => {
          history.push({
            pathname: `/${profileData.slug}/profile/dialog`,
            state: {
              chatRoomId: room.id,
              interlocutor: profileData,
            },
          });
        });
      });
  }
};
