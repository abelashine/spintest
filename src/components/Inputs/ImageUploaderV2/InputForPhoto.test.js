import { renderWrapper } from "../../../tests-utils";
import React from "react";
import InputForPhoto from "./InputForPhoto";
import { fireEvent } from "@testing-library/react";

jest.mock("formik", () => {
  return {
    useField: jest.fn(() => [
      { value: "" },
      { error: "", touched: "" },
      { setTouched: jest.fn(), setValue: jest.fn(() => "somevalue") },
    ]),
  };
});

test("InputForPhoto", () => {
  const onChange = jest.fn();
  const { container } = renderWrapper(<InputForPhoto attachImage={onChange} />);
  const fileInput = container.querySelector("input[type=file]");
  const emptyBlock = container.querySelector(
    "div[data-label-text='labelBlock']"
  );
  expect(fileInput).toBeInTheDocument();
  expect(emptyBlock).toBeInTheDocument();
  fireEvent.change(fileInput, {
    target: { value: "" },
  });
  expect(onChange).toBeCalled();
});
