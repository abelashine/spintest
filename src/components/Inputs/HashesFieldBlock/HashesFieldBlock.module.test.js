import { renderWrapper } from "../../../tests-utils";
import React from "react";
import HashesFieldBlock from ".";
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

test("HashesFieldBlock", () => {
  const values = {
    hashtagfield: "",
    hashtags: ["#hashtag"],
  };
  const { container } = renderWrapper(
    <HashesFieldBlock
      values={values}
      name="hashtagfield"
      totalNames="hashtags"
      label="Hashtags"
    />
  );
  const hashTagsSpans = container.querySelectorAll(
    "span[class^='hashtagsBlock__hashtags_hashtag']"
  );
  expect(hashTagsSpans.length).toBe(1);
  userEvent.click(hashTagsSpans[0]);
  const hashTagsSpans1AfterClick = container.querySelectorAll(
    "span[class^='hashtagsBlock__hashtags_hashtag']"
  );
  expect(hashTagsSpans1AfterClick.length).toBe(0);
});
