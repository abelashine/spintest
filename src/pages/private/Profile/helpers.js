import routes from "../../../routes";
import { setDialogConnectionHandler } from "../../../utils";

export const followChatEditHandler = (
  isPublic,
  history,
  viewAs,
  userInfo,
  foreignBrandInfo,
  setIsProfileSettingsOpened,
  followUnfollow
) => {
  if (isPublic) {
    history.push(routes.prelogin);
  } else if (userInfo && viewAs !== userInfo.slug) {
    followUnfollow();
    if (userInfo) {
      setDialogConnectionHandler(history, userInfo, foreignBrandInfo);
    }
  } else {
    setIsProfileSettingsOpened(true);
  }
};
