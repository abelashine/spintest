import { renderWrapper } from "../../../../tests-utils";
import React from "react";
import RentalBlock from ".";
import userEvent from "@testing-library/user-event";
import { wardrobe } from "../../../../api";
import { store } from "../../../../store";
import { authActions } from "../../../../actions/auth";

jest.mock("../../../../api", () => {
  return {
    wardrobe: jest.fn(() => Promise.resolve({ products: [] })),
  };
});

test("RentalBlock, when owner watches", () => {
  const extra = JSON.stringify({ day_count: 1 });
  const { queryByText } = renderWrapper(
    <RentalBlock extra={extra} me={true} />
  );
  const giveBackBtn = queryByText(/give back/i);
  expect(giveBackBtn).not.toBeInTheDocument();
});

test("RentalBlock, when no owner watches", async () => {
  store.dispatch(authActions.loginSuccess({ slug: "someuserslug" }));
  const extra = JSON.stringify({
    day_count: 1,
    productLink: "some product link",
  });
  const { getByText } = renderWrapper(<RentalBlock extra={extra} me={false} />);
  const giveBackBtn = getByText(/give back/i);
  expect(giveBackBtn).toBeInTheDocument();
  userEvent.click(giveBackBtn);
  expect(wardrobe).toHaveBeenCalledTimes(1);
});
