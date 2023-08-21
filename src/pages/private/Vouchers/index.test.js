import { renderWrapper } from "../../../tests-utils";
import Vouchers from ".";
import React from "react";
import { getVouchersDataReq } from "../../../api";
import { store } from "../../../store";
import { authActions } from "../../../actions/auth";

jest.mock("../../../api", () => {
  return {
    getVouchersDataReq: jest.fn(() => Promise.resolve({ response: {} })),
    foreignProfilebrandInfo: jest.fn(() => Promise.resolve({ response: {} })),
  };
});

test("fetch vouchers", () => {
  const userInfo = { slug: "someslug" };
  store.dispatch(authActions.loginSuccess(userInfo));
  renderWrapper(<Vouchers />);
  expect(getVouchersDataReq).toHaveBeenCalledTimes(1);
});
