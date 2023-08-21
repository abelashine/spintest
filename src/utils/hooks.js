/*eslint-disable */

import { useEffect, useRef } from "react";
import { productCharacteristics } from "../api";
import { isThereHongKongCoincidence } from "./exeptions";

// custom hooks

// search city hook
export const useSetSearchCityHook = (query, setData) => {
  let autocompleteService = useRef(null);
  useEffect(() => {
    let isThereGoogleMapService = document.getElementById("google-map-service");
    if (!isThereGoogleMapService) {
      const script = document.createElement("script");
      script.setAttribute("id", "google-map-service");
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.REACT_APP_GOOGLE_API_KEY}&callback=Function.prototype`;
      document.body.appendChild(script);
      isThereGoogleMapService = script;
    }
    const createAutocompleteService = () => {
      autocompleteService.current =
        window.google && new window.google.maps.places.AutocompleteService();
    };
    isThereGoogleMapService.addEventListener("load", createAutocompleteService);
    return () => {
      isThereGoogleMapService.removeEventListener(
        "load",
        createAutocompleteService
      );
      if (isThereGoogleMapService.parentNode) {
        isThereGoogleMapService.parentNode.removeChild(isThereGoogleMapService);
      } else isThereGoogleMapService.remove();
    };
  }, []);
  useEffect(() => {
    if (
      autocompleteService.current &&
      typeof query === "string" &&
      query.trim()
    ) {
      autocompleteService.current.getPlacePredictions(
        { 
          input: query,
          types: ['(cities)']
         },
        (results) => {
          if (!results) return;
          let hits = results
            .filter(
              (item) =>
                item.types.includes("locality") ||
                item.types.includes("administrative_area_level_1") ||
                item.types.includes("administrative_area_level_2") ||
                item.types.includes("administrative_area_level_3")
            )
            .map(({ description, place_id }) => ({
              name: description,
              value: description,
              shortValue: place_id,
            }));
          const exceptions = isThereHongKongCoincidence(query);
          if (exceptions) hits = hits.concat(exceptions);
          setData(hits);
        }
      );
    }
  }, [query]);
};

export const useSetCurrenciesListHook = (setData) => {
  useEffect(() => {
    productCharacteristics().then(({ response }) => {
      const currencies = response.currencies.map((c) => ({
        id: c.id,
        value: c.currency,
        symbol: c.symbol,
      }));
      setData(currencies);
    });
  }, []);
};

export const usePayPalScriptHook = (
  values,
  paypalcontainer,
  payPalData,
  currentSize = true
) => {
  const envValue =
    process.env.REACT_APP_BASE_URL === "https://api.lablaco.com/api"
      ? "production"
      : "sandbox";

  function addPayPall(url, callback) {
    const payPalScript = document.getElementById("paypalscript");
    if (payPalScript) {
      callback();
      return payPalScript;
    }
    const s = document.createElement("script");
    s.setAttribute("src", url);
    s.setAttribute("id", "paypalscript");
    s.onload = callback;
    document.head.insertBefore(s, document.head.firstElementChild);
    return s;
  }

  useEffect(() => {
    let payPalScript = document.getElementById("paypalscript");
    if (values.card_id === "paypal" && currentSize) {
      const paypalcontainerBlock = document.querySelector(
        "div[data-paypalcontainerblock]"
      );
      if (!paypalcontainerBlock) return;
      paypalcontainerBlock.innerHTML = "";
      payPalScript = addPayPall(
        "https://www.paypalobjects.com/api/checkout.js",
        function () {
          paypal.Button.render(
            {
              // Configure environment
              env: envValue,
              client: {
                sandbox: process.env.REACT_APP_PAYPALL_CLIENT_ID,
                production: process.env.REACT_APP_PAYPALL_CLIENT_ID,
              },
              // Set up a payment
              payment: (data, actions) => {
                return actions.payment.create({
                  transactions: [
                    {
                      amount: {
                        total: payPalData.total,
                        currency: payPalData.currency,
                      },
                    },
                  ],
                });
              },
              // Execute the payment
              onAuthorize: function (data, actions) {
                return actions.payment.execute().then(function () {
                  payPalData.callbackAfterPayment(values);
                });
              },
            },
            paypalcontainer
          );
        }
      );
    }
  }, [values.card_id, currentSize, payPalData]);
};
