import { authActions } from "../../../actions/auth";
import { profileActions } from "../../../actions/profile";
import { declinePassonGiveaway, confirmPassonGiveaway } from "../../../api";

export const optionsHandling = (
  status,
  extra,
  dispatch,
  chatRoomId,
  messageId,
  clientId,
  messageType,
  me,
  userInfo,
  setWasItPushed
) => {
  if (me) return;
  dispatch(authActions.startLoading());
  const info = { ...JSON.parse(extra) };
  const data = {
    roomId: chatRoomId,
    messageId,
    clientId,
    ...info,
  };
  if (messageType === "rentGiveback" && status === "accept") {
    const givebackData = {
      product_link: JSON.parse(extra).productLink,
      old_owner: userInfo.slug,
    };
    const data = JSON.parse(JSON.stringify(givebackData));
    data.brand_accepted = true;
    data.clientId = clientId;
    data.messageId = messageId;
    dispatch(
      profileActions.takeBackRent(data, (res) => {
        if (res?.error?.message === "Return confirmation already exists") {
          dispatch(authActions.finishLoading());
          setWasItPushed(
            "Yoy have already pushed one of the buttons in this message. No need to  push again it."
          );
          return;
        }
        dispatch(profileActions.setGiveBackData(null));
        dispatch(authActions.finishLoading());
      })
    );
  } else if (messageType === "spinRequest" && status === "decline") {
    declinePassonGiveaway(data).then((res) =>
      dispatch(authActions.finishLoading())
    );
  } else if (messageType === "spinRequest" && status === "accept") {
    confirmPassonGiveaway(data).then((res) =>
      dispatch(authActions.finishLoading())
    );
  } else dispatch(authActions.finishLoading());
};

export const dateFormatted = (date) => {
  const dateObj = new Date(date);
  return `${
    dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours()
  }.${dateObj.getMinutes()} | ${
    dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate()
  }.${
    dateObj.getMonth() + 1 < 10
      ? `0${dateObj.getMonth() + 1}`
      : dateObj.getMonth() + 1
  }.${dateObj.getFullYear()}`;
};

export const checkTakeBackRent = (
  checkDataTimer,
  isGiveBackModalOpened,
  productInfo,
  setCheckDataTimer,
  setIsGiveBackModalOpened,
  dispatch
) => {
  if (isGiveBackModalOpened && productInfo?.passon_link) {
    dispatch(
      profileActions.checkTakeBackRent(productInfo?.passon_link, (response) => {
        if (response?.brandAccepted) {
          setIsGiveBackModalOpened(false);
          clearInterval(checkDataTimer);
          setCheckDataTimer(null);
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
            }
          }
        )
      );
    }, 3000);
    setCheckDataTimer(timer);
  } else clearInterval(checkDataTimer);
};
