import { renderWrapper } from "../../../tests-utils";
import React from "react";
import UploadTextarea from ".";
import userEvent from "@testing-library/user-event";
import { act, fireEvent } from "@testing-library/react";

jest.mock("formik", () => {
  return {
    useField: jest.fn(() => [
      { value: "", onChange: jest.fn() },
      { error: "", touched: false },
      { setError: jest.fn(), setTouched: jest.fn(), setValue: jest.fn() },
    ]),
  };
});

test("UploadTextarea", async () => {
  const { container } = renderWrapper(<UploadTextarea />);
  const textarea = container.querySelector("textarea");
  expect(textarea).toBeInTheDocument();
  userEvent.tab();
  expect(textarea).toHaveFocus();
});
