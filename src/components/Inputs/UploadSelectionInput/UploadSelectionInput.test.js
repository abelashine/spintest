import { renderWrapper } from "../../../tests-utils";
import React from "react";
import UploadSelectionInput from ".";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

jest.mock("formik", () => {
  return {
    useField: jest.fn(() => [
      { onBlur: jest.fn(), value: "", onChange: jest.fn() },
      {},
      { setValue: jest.fn() },
    ]),
  };
});

test("UploadSelectionInput, hashtags", () => {
  const { container, getByText } = renderWrapper(
    <UploadSelectionInput type="hashtags" />
  );
  const span = getByText(/#/);
  const section = container.querySelector("section[class^=hashTags]");
  expect(span).toBeInTheDocument();
  expect(section).toBeInTheDocument();
});

test("UploadSelectionInput, select", () => {
  const { container } = renderWrapper(<UploadSelectionInput type="select" />);
  const div = container.querySelector("div[class^=dropdown]");
  expect(div).toBeInTheDocument();
});

test("UploadSelectionInput, select no editable", async () => {
  const { container } = renderWrapper(
    <UploadSelectionInput type="select" isDisabled={true} />
  );
  const field = container.querySelector("input");
  await act(async () => {
    userEvent.click(field);
  });
  const isDisabledBlock = container.querySelector(
    "div[class^=IsDisabledFieldHOC]"
  );
  expect(isDisabledBlock).toBeInTheDocument();
});
