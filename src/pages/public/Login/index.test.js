import React from "react";
import { renderWrapper } from "../../../tests-utils";
import { render, act, fireEvent } from "@testing-library/react";
import Login from "./index";
import FormPart from "./FormPart";
import TopPart from "./TopPart";
import { validate } from "./initForm";
import { store } from "../../../store";
import { authActions } from "../../../actions/auth";

import { prelogin, login } from "../../../api";

jest.mock("../../../api", () => {
  return {
    login: jest.fn(() => Promise.resolve()),
    prelogin: jest.fn(() => Promise.resolve()),
  };
});

describe("Login", () => {
  it("render Login page and first part od form", async () => {
    const { getByLabelText, queryByLabelText, container } = renderWrapper(
      <Login />
    );
    expect(window.location.hash).toBe("#email");
    const emailInput = getByLabelText(/email/i);
    const passwordInput = queryByLabelText(/Password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeNull();
    expect(emailInput).toBeEmpty();
    const form = container.querySelector("form");
    const onLoginSubmit = jest.fn(() => prelogin());
    form.onsubmit = onLoginSubmit;
    await act(async () => fireEvent.submit(form));
    expect(onLoginSubmit).toHaveBeenCalledTimes(1);
    expect(prelogin).toHaveBeenCalledTimes(1);
  });

  it("it renders second part of form", async () => {
    const onLoginSubmit = jest.fn(() => login());
    const { container, getByLabelText, queryByLabelText } = render(
      <FormPart step={1} />
    );
    const form = container.querySelector("form");
    form.onsubmit = onLoginSubmit;
    const passwordInput = getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
    const emailInput = queryByLabelText(/email/i);
    expect(emailInput).toBeNull();
    await act(async () => fireEvent.submit(form));
    expect(onLoginSubmit).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledTimes(1);
  });
});

describe("initForm", () => {
  it("validate, invalid email", () => {
    const values = {
      email: "test",
      password: "111111",
    };
    const step = 0;
    const errors = validate(values, step);
    expect(errors.email).toBe("Invalid email");
  });
  it("validate, invalid password", () => {
    const values = {
      email: "test@gmail.com",
      password: "   ",
    };
    const step = 1;
    const errors = validate(values, step);
    expect(errors.password).toBe("Required");
  });
});

describe("TopPart", () => {
  it("it render TopPart, when step is - 0", () => {
    const { getByText } = renderWrapper(<TopPart step={0} />);
    expect(getByText(/login/i)).toBeInTheDocument();
  });
  it("it render TopPart, when step is - 1", () => {
    const userInfo = { image: { url: "" }, name: "Bob" };
    const toFirstLoginStep = jest.fn();
    store.dispatch(authActions.updateProfileInfoSucceeded(userInfo));
    const { getByAltText, getByText } = renderWrapper(
      <TopPart step={1} toFirstLoginStep={toFirstLoginStep} />
    );
    expect(getByText(/Great to see you/i)).toBeInTheDocument();
    const backArrow = getByAltText(/Back arrow/i);
    fireEvent.click(backArrow);
    expect(toFirstLoginStep).toHaveBeenCalledTimes(1);
  });
});
