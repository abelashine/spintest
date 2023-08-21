import React from "react";
import { renderWrapper } from "./tests-utils";
import App from "./App";
import { watchNewMessages, isThereUnrMes, catchGoToChatRoute } from "./helpers";

jest.mock("./helpers.js", () => {
  return {
    watchNewMessages: jest.fn(),
    isThereUnrMes: jest.fn(),
    catchGoToChatRoute: jest.fn(),
  };
});
describe("App", () => {
  it("render App", () => {
    renderWrapper(<App />);
    expect(watchNewMessages).toHaveBeenCalledTimes(1);
    expect(isThereUnrMes).toHaveBeenCalledTimes(1);
    expect(catchGoToChatRoute).toHaveBeenCalledTimes(1);
  });
});
