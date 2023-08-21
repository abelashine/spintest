import userEvent from "@testing-library/user-event";
import React from "react";
import Options from "./index";
import { renderWrapper } from "../../../../tests-utils";

describe("Options component", () => {
  it("render component", async () => {
    const optionsHandler = jest.fn();
    const { container, getByText } = renderWrapper(
      <Options optionsHandler={optionsHandler} />
    );
    expect(getByText(/accept/i)).toBeInTheDocument();
    expect(getByText(/decline/i)).toBeInTheDocument();
    const btns = container.querySelectorAll("button");
    expect(btns.length).toBe(2);
    userEvent.click(btns[0]);
    expect(optionsHandler).toBeCalledWith("decline");
    userEvent.click(btns[1]);
    expect(optionsHandler).toBeCalledWith("accept");
  });
});
