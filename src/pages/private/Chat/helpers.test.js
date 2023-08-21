import {
  checkTakeBackRent as checkTkBckR,
  dateFormatted,
  optionsHandling,
} from "./helpers";
import {
  takeBackRent,
  declinePassonGiveaway,
  confirmPassonGiveaway,
  checkTakeBackRent,
} from "../../../api";
import { store } from "../../../store";

jest.mock("../../../api", () => {
  return {
    takeBackRent: jest.fn(() => Promise.resolve()),
    declinePassonGiveaway: jest.fn(() => Promise.resolve()),
    confirmPassonGiveaway: jest.fn(() => Promise.resolve()),
    checkTakeBackRent: jest.fn(() => Promise.resolve()),
  };
});
jest.useFakeTimers();

describe("optionsHandling", () => {
  const extra = JSON.stringify("1");
  const dispatch = store.dispatch;
  const chatRoomId = "someroomid";
  const messageId = "somemessageid";
  const clientId = "someclientid";
  const me = false;
  const userInfo = { slug: "someslug" };
  const setWasItPushed = jest.fn();
  it("when accepted returned rental product", async () => {
    const status = "accept";
    const messageType = "rentGiveback";
    optionsHandling(
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
    );
    expect(takeBackRent).toHaveBeenCalledTimes(1);
  });
  it("when refused to swapt product", async () => {
    const status = "decline";
    const messageType = "spinRequest";
    optionsHandling(
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
    );
    expect(declinePassonGiveaway).toHaveBeenCalledTimes(1);
  });
  it("when agreed to swapt product", async () => {
    const status = "accept";
    const messageType = "spinRequest";
    optionsHandling(
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
    );
    expect(confirmPassonGiveaway).toHaveBeenCalledTimes(1);
  });
});

test("dateFormatted", () => {
  const date = new Date(2000, 1, 1, 15, 20).valueOf();
  const formattedDate = dateFormatted(date);
  expect(formattedDate).toBe("15.20 | 01.02.2000");
});

test("checkTakeBackRent", () => {
  const checkDataTimer = {};
  const isGiveBackModalOpened = true;
  const productInfo = { slug: "someslug", passon_link: "somepassonlink" };
  const setCheckDataTimer = jest.fn();
  const setIsGiveBackModalOpened = jest.fn();
  const dispatch = store.dispatch;
  checkTkBckR(
    checkDataTimer,
    isGiveBackModalOpened,
    productInfo,
    setCheckDataTimer,
    setIsGiveBackModalOpened,
    dispatch
  );
  expect(checkTakeBackRent).toHaveBeenCalledTimes(1);
});
