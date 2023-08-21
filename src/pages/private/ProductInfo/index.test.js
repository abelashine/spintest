import React from "react";
import { act, render } from "@testing-library/react";
import ProductPage from "./index";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { authActions } from "../../../actions/auth";
import {
  wardrobe,
  getAddresses,
  getProfileCards,
  productCharacteristics,
  transactionHistory,
  tokenizedProductBrandInfo,
  tokenizedProductInfo,
} from "../../../api";
import { profileActions } from "../../../actions/profile";

jest.mock("../../../api", () => {
  return {
    wardrobe: jest.fn(() => Promise.resolve({ response: { products: [] } })),
    getProfileCards: jest.fn(() => Promise.resolve({ response: {} })),
    getAddresses: jest.fn(() => Promise.resolve({ response: {} })),
    productCharacteristics: jest.fn(() =>
      Promise.resolve({ response: { uniqueId: "someid" } })
    ),
    transactionHistory: jest.fn(),
    tokenizedProductBrandInfo: jest.fn(),
    tokenizedProductInfo: jest.fn(),
  };
});
jest.mock("react-router-dom", () => ({
  useRouteMatch: jest.fn(() => {
    return {
      isExact: true,
      params: { slug: "someslug" },
      path: "/product/:slug",
      url: "/product/someslug",
    };
  }),
  useParams: jest.fn(() => ({
    slug: "someslug",
  })),
  useHistory: jest.fn(),
}));
jest.mock("@stripe/react-stripe-js", () => {
  return {
    useStripe: jest.fn(),
  };
});
jest.mock("mapbox-gl", () => ({
  Map: () => ({}),
}));

describe("Product Page", () => {
  it("render product page", async () => {
    await act(async () => {
      store.dispatch(authActions.loginSuccess({ slug: "someslug" }));
    });
    let unmount;
    await act(async () => {
      unmount = render(
        <Provider store={store}>
          <ProductPage location={{ state: null }} />
        </Provider>
      ).unmount;
    });
    expect(wardrobe).toBeCalled();
    expect(getProfileCards).toBeCalled();
    expect(getAddresses).toBeCalled();
    expect(productCharacteristics).toBeCalled();
    expect(transactionHistory).toBeCalled();
    expect(tokenizedProductBrandInfo).toBeCalled();
    expect(tokenizedProductInfo).toBeCalled();

    await act(async () => {
      store.dispatch(profileActions.setTransactionHistory([{}]));
    });
    const { transactionHistory: transtHist } = store.getState().profileReducer;
    expect(transtHist).toBeTruthy();
    await act(async () => {
      unmount();
    });
    const {
      productInfo,
      transactionHistory: transatctions,
    } = store.getState().profileReducer;
    expect(productInfo).toBeNull();
    expect(transatctions).toBeNull();
  });
});
