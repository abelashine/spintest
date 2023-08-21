import { renderWrapper } from "../../../tests-utils";
import React from "react";
import MainButton from "./MainButton";
import { createBrand } from "../../../api";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

jest.mock("../../../api", () => {
  return {
    createBrand: jest.fn(() => Promise.resolve()),
  };
});

jest.mock("formik", () => {
  return {
    useFormikContext: jest.fn(),
  };
});

test("MainButton, should show first step button", () => {
  const { container } = renderWrapper(<MainButton page={0} />);
  const button = container.querySelector("button");
  expect(button.innerHTML).toBe("Next");
});

test("MainButton, should show last step button", async () => {
  const { container } = renderWrapper(<MainButton page={2} />);
  const button = container.querySelector("button");
  expect(button.innerHTML).toBe("Submit");
});
