import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonContainer from "./index";
import { store } from "../../../../store";
import { profileActions } from "../../../../actions/profile";
import { authActions } from "../../../../actions/auth";
import { Provider } from "react-redux";
import { moveBackToShop } from "../../../../api";
import { act } from "react-dom/test-utils";

jest.mock("react-router-dom", () => ({
  useRouteMatch: jest.fn(() => {
    return {
      isExact: true,
      params: { slug: "someproduct" },
      path: "/product/:slug",
      url: "/product/someproduct",
    };
  }),
  useHistory: jest.fn(() => ({ push: jest.fn() })),
}));
jest.mock("../../../../api", () => {
  return {
    moveBackToShop: jest.fn(() => Promise.resolve()),
  };
});

afterEach(() => {
  localStorage.clear();
});

describe("action buttons", () => {
  it("render edit/delete buttons", async () => {
    await act(async () => {
      store.dispatch(authActions.loginSuccess({ slug: "poster" }));
    });
    await act(async () => {
      store.dispatch(
        profileActions.setProductInfo({
          stocks: [],
          for_rent: false,
          poster: {
            slug: "poster",
          },
          current_owner: "poster",
          in_wardrobe: false,
          giveaway: false,
        })
      );
    });
    const storageUserInfo = JSON.stringify({ slug: "poster" });
    localStorage.setItem("user_info", storageUserInfo);
    const openUploadPopup = jest.fn();
    const onDeleteBtn = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <ButtonContainer
          openUploadPopup={openUploadPopup}
          setIsConfirmDeleteModalOpened={onDeleteBtn}
        />
      </Provider>
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons[0].innerHTML.toLowerCase()).toBe("edit");
    expect(buttons[1].innerHTML.toLowerCase()).toBe("delete");
    userEvent.click(buttons[0]);
    expect(openUploadPopup).toHaveBeenCalledTimes(1);
    userEvent.click(buttons[1]);
    expect(onDeleteBtn).toHaveBeenCalledTimes(1);
  });
  it("render passon/delete buttons, when product is in the wardrobe and owner wathces it", async () => {
    await act(async () => {
      store.dispatch(authActions.loginSuccess({ slug: "buyer" }));
    });
    await act(async () => {
      store.dispatch(
        profileActions.setProductInfo({
          stocks: [],
          for_rent: false,
          poster: {
            slug: "poster",
          },
          current_owner: "buyer",
          in_wardrobe: true,
          giveaway: false,
        })
      );
    });
    const storageUserInfo = JSON.stringify({ slug: "buyer" });
    localStorage.setItem("user_info", storageUserInfo);
    const openUploadPopup = jest.fn();
    const onDeleteBtn = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <ButtonContainer
          openUploadPopup={openUploadPopup}
          setIsConfirmDeleteModalOpened={onDeleteBtn}
        />
      </Provider>
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons[0].innerHTML.toLowerCase()).toBe("pass on");
    expect(buttons[1].innerHTML.toLowerCase()).toBe("delete");
    userEvent.click(buttons[0]);
    expect(openUploadPopup).toHaveBeenCalledTimes(1);
    userEvent.click(buttons[1]);
    expect(onDeleteBtn).toHaveBeenCalledTimes(1);
  });
  it("render passon/delete buttons, when returned rental product is in the wardrobe and owner watches it", async () => {
    await act(async () => {
      store.dispatch(authActions.loginSuccess({ slug: "poster" }));
    });
    await act(async () => {
      store.dispatch(
        profileActions.setProductInfo({
          stocks: [],
          for_rent: true,
          poster: {
            slug: "poster",
          },
          current_owner: "poster",
          in_wardrobe: true,
          giveaway: false,
        })
      );
    });
    const storageUserInfo = JSON.stringify({ slug: "poster" });
    localStorage.setItem("user_info", storageUserInfo);
    const { getByText } = render(
      <Provider store={store}>
        <ButtonContainer />
      </Provider>
    );
    const button = getByText(/pass on/i);
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(moveBackToShop).toHaveBeenCalledTimes(1);
  });
  it("render passon/delete buttons, when rental product is in the wardrobe and tenant watches it", async () => {
    await act(async () => {
      store.dispatch(authActions.loginSuccess({ slug: "tenant" }));
    });
    await act(async () => {
      store.dispatch(
        profileActions.setProductInfo({
          stocks: [],
          for_rent: true,
          poster: {
            slug: "poster",
          },
          current_owner: "tenant",
          in_wardrobe: true,
          giveaway: false,
        })
      );
    });
    const storageUserInfo = JSON.stringify({ slug: "tenant" });
    localStorage.setItem("user_info", storageUserInfo);
    const giveBackMock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <ButtonContainer setIsGiveBackModalOpened={giveBackMock} />
      </Provider>
    );
    const button = getByText(/give back/i);
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(giveBackMock).toHaveBeenCalledTimes(1);
  });
});
