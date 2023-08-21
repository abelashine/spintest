import { renderWrapper } from "../../../../tests-utils";
import VouchersList from ".";
import React from "react";
import { store } from "../../../../store";
import { profileActions } from "../../../../actions/profile";
import userEvent from "@testing-library/user-event";

describe("VouchersList", () => {
  it("render active tab list items", () => {
    const vouchersData = [
      {
        is_active: true,
        amount: 10,
        currency: { currency: "EUR" },
        type: "PERSONAL",
        for_whom: { slug: "someslug" },
        voucher_code: null,
        discount_type: "PERCENTAGE",
        expiration_date: new Date().toISOString(),
      },
    ];
    store.dispatch(profileActions.setVouchersData(vouchersData));
    const openEditModal = jest.fn();
    const { getByText, queryByText } = renderWrapper(
      <VouchersList voucherTab="active" openEditModal={openEditModal} />
    );
    const editBtn = getByText(/edit/i);
    expect(editBtn).toBeInTheDocument();
    expect(queryByText(/reactivate/i)).not.toBeInTheDocument();
    userEvent.click(editBtn);
    expect(openEditModal).toHaveBeenCalledTimes(1);
  });

  it("render not active tab list items", () => {
    const vouchersData = [
      {
        is_active: false,
        amount: 10,
        currency: { currency: "EUR" },
        type: "PERSONAL",
        for_whom: { slug: "someslug" },
        voucher_code: null,
        discount_type: "PERCENTAGE",
        expiration_date: new Date().toISOString(),
      },
    ];
    store.dispatch(profileActions.setVouchersData(vouchersData));
    const openEditModal = jest.fn();
    const { getByText, queryByText } = renderWrapper(
      <VouchersList voucherTab="" openEditModal={openEditModal} />
    );
    const reactivateBtn = getByText(/reactivate/i);
    expect(reactivateBtn).toBeInTheDocument();
    expect(queryByText(/edit/i)).not.toBeInTheDocument();
    userEvent.click(reactivateBtn);
    expect(openEditModal).toHaveBeenCalledTimes(1);
  });
});
