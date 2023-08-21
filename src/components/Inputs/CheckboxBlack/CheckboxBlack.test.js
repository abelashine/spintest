import { renderWrapper } from "../../../tests-utils";
import userEvent from "@testing-library/user-event";
import CheckboxBlack from ".";
import React from "react";
import { useField } from "formik";

jest.mock("formik", () => {
  return {
    useField: jest.fn(() => [
      { onChange: jest.fn() },
      {},
      { setTouched: jest.fn() },
    ]),
  };
});

test("CheckboxBlack", () => {
  const { container } = renderWrapper(<CheckboxBlack />);
  expect(useField).toBeCalled();
  const checkbox = container.querySelector("input[type=checkbox]");
  userEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
});
