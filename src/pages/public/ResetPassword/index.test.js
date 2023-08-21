import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWrapper } from "../../../tests-utils";
import { resetPassword, login } from "../../../api";
import * as handlers from "./initForm";

jest.mock("../../../api/index.js", () => {
  return {
    resetPassword: jest.fn(() => Promise.resolve()),
    login: jest.fn(() => Promise.resolve()),
  };
});

import ResetPassword from "./index";

describe("ResetPassword", () => {
  it("render ResetPassword and submit", async () => {
    const { container } = renderWrapper(
      <ResetPassword location={{ search: "" }} />
    );
    const onSubmit = jest.fn(async () => {
      await resetPassword();
      login();
    });
    const form = container.querySelector("form");
    form.onsubmit = onSubmit;
    await act(async () => {
      fireEvent.submit(form);
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
  it("fields", async () => {
    const { container } = renderWrapper(
      <ResetPassword location={{ search: "" }} />
    );
    const newPassword = container.querySelector("input[name=new_password]");
    const confirmPassword = container.querySelector(
      "input[name=confirmPassword]"
    );
    expect(newPassword).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    const spyOnChange = jest.spyOn(handlers, "validate");
    newPassword.onchange = spyOnChange.bind(null, handlers.initialValues);
    confirmPassword.onchange = spyOnChange.bind(null, handlers.initialValues);
    await act(async () => {
      fireEvent.change(newPassword, {
        target: { value: "a" },
      });
    });
    await act(async () => {
      fireEvent.change(confirmPassword, {
        target: { value: "a" },
      });
    });
    expect(spyOnChange).toHaveBeenCalledTimes(2);
  });
});

describe("initForm, check validation", () => {
  const values = handlers.initialValues;
  const validate = handlers.validate;
  let errors;
  it("check new password", () => {
    values.new_password = "";
    errors = validate(values);
    expect(errors.new_password).toBe("too short password");
  });
  it("check confirm password", () => {
    values.new_password = "111111";
    values.confirmPassword = "sdfsdf";
    errors = validate(values);
    expect(errors.new_password).toBe("invalid password");
    expect(errors.confirmPassword).toBe("invalid password");
  });
});
