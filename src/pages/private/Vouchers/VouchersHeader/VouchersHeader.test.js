import { renderWrapper } from "../../../../tests-utils";
import React from "react";
import VouchersHeader from ".";
import { store } from "../../../../store";
import { authActions } from "../../../../actions/auth";

test("render header", () => {
  store.dispatch(authActions.loginSuccess({ slug: "someslug" }));
  const { getByText } = renderWrapper(<VouchersHeader />);
  expect(getByText("someslug")).toBeInTheDocument();
});
