import { renderWrapper } from "../../../tests-utils";
import React from "react";
import TextField from ".";

jest.mock("formik", () => {
  return {
    useField: jest.fn(() => [{}, {}, {}]),
  };
});

test("TextField", () => {
  const { container } = renderWrapper(<TextField area={true} />);
  const textarea = container.querySelector("textarea");
  expect(textarea).toBeInTheDocument();
});

test("TextField", () => {
  const { container } = renderWrapper(<TextField />);
  const textarea = container.querySelector("input");
  expect(textarea).toBeInTheDocument();
});
