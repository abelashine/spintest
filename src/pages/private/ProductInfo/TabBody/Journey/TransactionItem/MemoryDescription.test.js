import React from "react";
import MemoryDescription from "./MemoryDescription";
import { renderWrapper } from "../../../../../../tests-utils";

test("Render text with slug link", () => {
  const { container } = renderWrapper(
    <MemoryDescription text="ghgh @dfg fg" />
  );
  const link = container.querySelector("a");
  expect(link).toBeInTheDocument();
});
test("can not be the slug link if only one '@' symbol", () => {
  const { container } = renderWrapper(<MemoryDescription text="ghgh @ fg" />);
  const link = container.querySelector("a");
  expect(link).not.toBeInTheDocument();
});
