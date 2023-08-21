import React from "react";
import { renderWrapper } from "../../../tests-utils";
import BrandVault from "./index";
import { act } from "@testing-library/react";
import { store } from "../../../store";
import { authActions } from "../../../actions/auth";
import { foreignProfilebrandInfo, wardrobe } from "../../../api";

window.scrollTo = jest.fn();
jest.mock("../../../api", () => {
  return {
    foreignProfilebrandInfo: jest.fn(() => Promise.resolve()),
    wardrobe: jest.fn(() => Promise.resolve({ response: { products: [] } })),
  };
});

describe("BrandVault", () => {
  it("call profile data, if it is undefined", async () => {
    await act(async () => {
      store.dispatch(authActions.loginSuccess({ slug: "someuser" }));
    });
    renderWrapper(<BrandVault />);
    expect(wardrobe).toBeCalled(); 
    expect(foreignProfilebrandInfo).toBeCalled();
  });

  afterEach(() => {
    jest.resetAllMocks(); 
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
