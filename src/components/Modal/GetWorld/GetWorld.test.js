import { renderWrapper } from "../../../tests-utils";
import React from "react";
import GetWorld from ".";
import userEvent from "@testing-library/user-event";

test("GetWorld", () => {
  const onClose = jest.fn();
  const { container } = renderWrapper(
    <GetWorld onClose={onClose} world={{ image: "" }} />
  );
  const block = container.querySelector("div[class^=GetWorld]");
  userEvent.click(block);
  expect(onClose).toBeCalled();
});
