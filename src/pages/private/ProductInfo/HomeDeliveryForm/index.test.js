import React from "react";
import { render } from "@testing-library/react";
import { renderWrapper } from "../../../../tests-utils";
import HomeDelivery from "./index";
import { store } from "../../../../store";

describe("HomeDelivery", () => {
  it("render HomeDelivery", () => {
    const productInfo = {
      out_of_stock: false,
      currency: {
        symbol: "EUR",
      },
    };
    const setTotal = jest.fn();
    const onSubmit = jest.fn();
    renderWrapper(
      <HomeDelivery
        productInfo={productInfo}
        setTotal={setTotal}
        onSubmit={onSubmit}
      />
    );
    // ren
  });
});
