import {
  onReseiveMessageHandler,
  isThereUnrMes,
  checkRoomAnGoToRouteHandler,
} from "./helpers";
import { store } from "./store";
import { foreignProfilebrandInfo } from "./api";
import { useHistory, useLocation } from "react-router-dom";

jest.mock("./api/index.js", () => {
  return {
    foreignProfilebrandInfo: jest.fn((intSlug) => Promise.resolve({})),
  };
});
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
  useLocation: jest.fn().mockImplementation(() => ({
    pathname: "",
  })),
}));

describe("App helpers", () => {
  it("onReseiveMessageHandler, was that confirmed generated message", () => {
    const dispatch = store.dispatch;
    const userInfo = {};
    const props = {
      messageType: "spinRequest",
      extra: JSON.stringify({ requestConfirmStatus: "1" }),
    };
    onReseiveMessageHandler(dispatch, userInfo, props);
    const { isShouldUpdateVault } = store.getState().profileReducer;
    expect(isShouldUpdateVault).toBe(true);
  });

  it("isThereUnrMes, was that called", () => {
    const all = [];
    const requests = [];
    const setIsUnreadMessage = jest.fn();
    isThereUnrMes(all, requests, setIsUnreadMessage);
    expect(setIsUnreadMessage).toHaveBeenCalledTimes(1);
  });

  it("checkRoomAnGoToRouteHandler, check if foreignProfilebrandInfo was called", async () => {
    const userInfo = {};
    const interlocutorSlug = "someslug";
    const history = useHistory();
    const location = useLocation();
    location.pathname = "/error";
    try {
      await checkRoomAnGoToRouteHandler(userInfo, interlocutorSlug, history);
    } catch (err) {
      expect(location.pathname).toBe("/error");
    }
    expect(foreignProfilebrandInfo).toHaveBeenCalledTimes(1);
  });
});
