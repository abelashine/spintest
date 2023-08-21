import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWrapper } from "../../../../tests-utils";
import { useFormikContext } from "formik";
import { store } from "../../../../store";
import { profileActions } from "../../../../actions/profile";

import PickUpForm from "./index";
import BottomButton from "./BottomButton";
import { act } from "react-dom/test-utils";

jest.mock("formik", () => {
  return {
    useFormikContext: jest.fn(() => {
      return {
        values: { card_id: "" },
      };
    }),
  };
});

describe("BottomButton", () => {
  it("render BottomButton for swap", async () => {
    await act(async () => {
      store.dispatch(
        profileActions.setProductInfo({
          currency: {
            symbol: "EUR",
          },
          stocks: [],
          giveaway: true,
        })
      );
    });
    const onClickHandler = jest.fn();
    const { getByText } = renderWrapper(
      <BottomButton onClickHandler={onClickHandler} allowApply={true} />
    );
    const button = getByText(/SEND REQUEST/i);
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });
  it("render BottomButton to buy/rent", async () => {
    await act(async () => {
      store.dispatch(
        profileActions.setProductInfo({
          currency: {
            symbol: "EUR",
          },
          stocks: [],
          giveaway: false,
        })
      );
    });
    const onClickHandler = jest.fn();
    const { getByText } = renderWrapper(
      <BottomButton
        onClickHandler={onClickHandler}
        allowApply={true}
        total={10}
      />
    );
    const button = getByText(/pay/i);
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });
  it("render BottomButton to buy/rent without payment", async () => {
    await act(async () => {
      store.dispatch(
        profileActions.setProductInfo({
          currency: {
            symbol: "EUR",
          },
          stocks: [],
          giveaway: false,
        })
      );
    });
    const onClickHandler = jest.fn();
    const { getByText } = renderWrapper(
      <BottomButton
        onClickHandler={onClickHandler}
        allowApply={true}
        total={0}
      />
    );
    const button = getByText(/get/i);
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });
});
