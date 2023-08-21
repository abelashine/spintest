import { renderWrapper } from "../../../tests-utils";
import React from "react";
import DateTextFields from ".";
import userEvent from "@testing-library/user-event";

jest.mock("formik", () => {
  return {
    useField: jest.fn(() => [
      { value: "" },
      { error: "", touched: "" },
      { setTouched: jest.fn() },
    ]),
  };
});

test("DateTextFields", () => {
  const { getByLabelText, container } = renderWrapper(<DateTextFields />);
  const fieldBlock = container.querySelector("div[data-invalid]");
  expect(fieldBlock).toBeInTheDocument();
  userEvent.click(fieldBlock);
  const dayField = getByLabelText(/day/i);
  const monthField = getByLabelText(/month/i);
  const yearField = getByLabelText(/year/i);
  expect(dayField).toBeInTheDocument();
  expect(monthField).toBeInTheDocument();
  expect(yearField).toBeInTheDocument();
});
