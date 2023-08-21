import React from "react";
import { render } from "@testing-library/react";
import { store } from "./store";
import { loadStripe } from "@stripe/stripe-js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const renderWrapper = (component) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>{component}</Elements>
      </BrowserRouter>
    </Provider>
  );
};

