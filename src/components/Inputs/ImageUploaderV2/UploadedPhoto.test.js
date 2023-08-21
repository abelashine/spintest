import { renderWrapper } from "../../../tests-utils";
import React from "react";
import UploadedPhoto from "./UploadedPhoto";
import userEvent from "@testing-library/user-event";

test("UploadedPhoto", () => {
  const editFunc = jest.fn();
  const resetFunc = jest.fn();
  const { container } = renderWrapper(
    <UploadedPhoto resetValue={resetFunc} editImage={editFunc} />
  );
  const crossButton = container.querySelector("button");
  const image = container.querySelector("img[class^=uploadedImage]");
  userEvent.click(crossButton);
  expect(resetFunc).toHaveBeenCalledTimes(1);
  userEvent.click(image);
  expect(editFunc).toHaveBeenCalledTimes(1);
});
