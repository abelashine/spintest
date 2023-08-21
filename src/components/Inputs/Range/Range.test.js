import { renderWrapper } from "../../../tests-utils";
import React from "react";
import Range from ".";
import { fireEvent } from "@testing-library/react";

test("Range", () => {
  const onChange = jest.fn();
  const { container } = renderWrapper(<Range onChange={onChange} />);
  const rangeInput = container.querySelector("input[type=range]");
  fireEvent.change(rangeInput, {
    target: { value: "" },
  });
  expect(onChange).toHaveBeenCalledTimes(1);
});
