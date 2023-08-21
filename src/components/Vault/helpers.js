import { profileActions } from "../../actions/profile";

export const checkTkBckR = (
  viewAs,
  checkDataTimer,
  isGiveBackModalOpened,
  productInfo,
  userInfo,
  setCheckDataTimer,
  setIsGiveBackModalOpened,
  dispatch
) => {
  const slug = viewAs || userInfo.slug;
  if (isGiveBackModalOpened && productInfo?.passon_link) {
    dispatch(
      profileActions.checkTakeBackRent(productInfo?.passon_link, (response) => {
        if (response?.brandAccepted) {
          setIsGiveBackModalOpened(false);
          clearInterval(checkDataTimer);
          setCheckDataTimer(null);
          dispatch(profileActions.fetchWardrobeProducts(slug));
        }
      })
    );
    const timer = setInterval(() => {
      dispatch(
        profileActions.checkTakeBackRent(
          productInfo?.passon_link,
          (response) => {
            if (response?.brandAccepted) {
              setIsGiveBackModalOpened(false);
              clearInterval(checkDataTimer);
              setCheckDataTimer(null);
              dispatch(profileActions.fetchWardrobeProducts(slug));
            }
          }
        )
      );
    }, 3000);
    setCheckDataTimer(timer);
  } else clearInterval(checkDataTimer);
};

export const setTimeToEnd = (endDate, setTime) => {
  const endTime = new Date(endDate);
  const today = new Date();
  const ONE_DAY_MILLISECONDS = 24 * 60 * 60 * 1000;
  let timeToEnd = "";
  const diff = Math.abs(endTime - today);
  let strType;
  const days = Math.floor(diff / ONE_DAY_MILLISECONDS);
  const hours = Math.floor(
    (diff - days * ONE_DAY_MILLISECONDS) / 1000 / 60 / 60
  );
  const minutes = Math.floor(
    (diff - days * ONE_DAY_MILLISECONDS - hours * 60 * 60 * 1000) / 1000 / 60
  );
  if (endTime >= today) {
    strType = "left";
  } else strType = "overdue";
  const dayStr = days > 1 ? "days" : "day";
  const andStr = days >= 1 ? "" : " and ";
  const timeStr = !andStr
    ? ""
    : hours === 1
    ? "hour"
    : hours > 1
    ? "hours"
    : "minutes";
  const time = !andStr ? "" : hours >= 1 && days < 1 ? hours : minutes;
  timeToEnd +=
    days + " " + dayStr + andStr + time + " " + timeStr + " " + strType;
  setTime(timeToEnd);
};
