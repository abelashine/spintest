import {
  periodsValues,
  periodsOptions,
} from "../../../static/data/dataForForms";
import { profileActions } from "../../../actions/profile";
import { errorsActions } from "../../../actions/errors";
import {
  buyProduct,
  rentProduct,
  deliveryQuote,
  confirmPaymentIntent,
  requestGiveaway,
  updateWardrobeItem,
  deleteProduct,
} from "../../../api";
import { store } from "../../../store";

export const getDateValue = (date) => {
  const str = String(date);
  if (str.length < 2) {
    return "0" + str;
  } else return str;
};

const getVals = (values, periodsValues) =>
  periodsValues.find(
    (periodData) => periodData.type === values.rentalPeriod.type
  ).nums;

export const getPeriodLimits = (
  values,
  minValue,
  minPeriodOption,
  maxValue,
  maxPeriodOption
) => {
  const limitsData = {
    periodsOptions,
    valueOptions: getVals(values, periodsValues),
  };
  const limitedPeriodOptions = [];
  for (let i = 0; i < limitsData.periodsOptions.length; i++) {
    if (limitsData.periodsOptions[i].name === maxPeriodOption) {
      limitedPeriodOptions.push(limitsData.periodsOptions[i]);
      break;
    } else limitedPeriodOptions.push(limitsData.periodsOptions[i]);
  }
  limitsData.periodsOptions = limitedPeriodOptions;
  if (minPeriodOption === maxPeriodOption) {
    limitsData.valueOptions = limitsData.valueOptions.filter(
      (opt) => +opt.name >= minValue && +opt.name <= maxValue
    );
  } else if (values.rentalPeriod.type === maxPeriodOption) {
    limitsData.valueOptions = limitsData.valueOptions.filter(
      (opt) => +opt.name <= maxValue
    );
  } else if (values.rentalPeriod.type === "Days") {
    limitsData.valueOptions = limitsData.valueOptions.filter(
      (opt) => +opt.name >= minValue
    );
  }
  return limitsData;
};

export const getRentTotalPrice = (
  periodType,
  periodValue,
  pricePerDay,
  currentQuantity,
  setTotal,
  certainDiscount,
  setTotalPrice
) => {
  let totalSum = 0;
  if (periodType === "Days") {
    totalSum = periodValue * pricePerDay;
  } else if (periodType === "Weeks") {
    const days = periodValue * 7;
    totalSum = days * pricePerDay;
  } else if (periodType === "Months") {
    const nowDate = new Date();
    const nowDateForCalc = new Date();
    const rentLatDate = nowDateForCalc.setMonth(
      nowDateForCalc.getMonth() + periodValue
    );
    const days = Math.ceil((rentLatDate - nowDate) / 1000 / 60 / 60 / 24);
    totalSum = days * pricePerDay;
  }
  totalSum = +(totalSum * currentQuantity).toFixed(2);
  setTotalPrice(totalSum);

  if (!certainDiscount) {
    setTotal(totalSum);
  } else if (certainDiscount.discount_type === "FREE") {
    setTotal(0);
  } else if (certainDiscount.discount_type === "PERCENTAGE") {
    const discontValue = +certainDiscount.amount;
    const sumWithDiscount = +(
      totalSum - +(totalSum * (discontValue / 100)).toFixed(2)
    ).toFixed(2);
    setTotal(sumWithDiscount);
  } else {
    const discontValue = +certainDiscount.amount;
    const sumWithDiscount = +(totalSum - discontValue).toFixed(2);
    if (sumWithDiscount <= 0) {
      setTotal(0);
    } else setTotal(sumWithDiscount);
  }
};

export const getProdV1 = (
  response,
  setAllowApply,
  setIsStockFull,
  isPublic
) => {
  if (response) {
    setAllowApply(response.allowApply);
    const stocks = response.stocks;
    if (stocks) {
      for (let i = 0; i < stocks.length; ++i) {
        if (stocks[i].is_stock_full === false) {
          setIsStockFull(stocks[i].is_stock_full);
          break;
        }
      }
    }
    if (isPublic) setAllowApply(true);
  }
};

export const getProdV2 = (res, setTotalPrice, setWardrobeItem) => {
  if (res) {
    setTotalPrice(res.price + 9);
    setWardrobeItem((prev) => ({
      ...prev,
      inWardrobe: res.in_wardrobe,
    }));
  }
};

export const checkTkBckR = (
  checkDataTimer,
  isGiveBackModalOpened,
  productInfo,
  setCheckDataTimer,
  setIsGiveBackModalOpened,
  dispatch,
  history
) => {
  if (isGiveBackModalOpened && productInfo?.passon_link) {
    dispatch(
      profileActions.checkTakeBackRent(productInfo?.passon_link, (response) => {
        if (response?.brandAccepted) {
          setIsGiveBackModalOpened(false);
          clearInterval(checkDataTimer);
          setCheckDataTimer(null);
          history.push("/");
        }
      })
    );
    const timer = setInterval(() => {
      dispatch(
        profileActions.checkTakeBackRent(
          productInfo?.passon_link,
          (response) => {
            if (response?.brandAccepted) {
              setIsGiveBackModalOpened(false);
              clearInterval(checkDataTimer);
              setCheckDataTimer(null);
              history.push("/");
            }
          }
        )
      );
    }, 3000);
    setCheckDataTimer(timer);
  } else clearInterval(checkDataTimer);
};

export const backBtnHandler = (history, setIsOrderDetailsOpened) => {
  const lastUrl = sessionStorage.getItem("lastUrl");
  const isCheckoutStep = history.location.pathname
    .split("/")
    .find((str) => str === "checkoutProduct");
  if (isCheckoutStep && lastUrl) {
    setIsOrderDetailsOpened(false);
    history.push(lastUrl);
    sessionStorage.setItem("lastUrl", "/");
  } else if (lastUrl) {
    history.push(lastUrl);
    sessionStorage.removeItem("lastUrl");
  } else {
    history.push("/");
    sessionStorage.removeItem("lastUrl");
  }
};

export const getSizesString = (stocks, params) => {
  if (params.slug) {
    const sizes = new Set(stocks.filter(item => item.size).map(item => item.size.name));
    return `Physical item size${sizes.size === 1 ? "" : "s"}: ${Array.from(sizes).join(", ")}`;
  }
  return "";
};

export const getDiscountTypes = (coupons, productInfo) => {
  const arrayToRender = coupons
    .filter((c) => {
      if (c.discount_type === "CASH") {
        return productInfo.currency.currency === c.currency.currency;
      } else return true;
    })
    .map((c) => {
      if (c.discount_type === "PERCENTAGE") {
        c.value = String(c.amount) + " " + "% DISCOUNT";
        c.name = String(c.amount) + " " + "% DISCOUNT";
      } else if (c.discount_type === "CASH") {
        c.value =
          String(c.amount) + " " + c.currency.currency + " " + "DISCOUNT";
        c.name =
          String(c.amount) + " " + c.currency.currency + " " + "DISCOUNT";
      } else if (c.discount_type === "FREE") {
        c.value = "FREE";
        c.name = "FREE";
      }
      return c;
    });
  arrayToRender.push({ value: "VOUCHER CODE", name: "VOUCHER CODE" });
  return arrayToRender;
};

export const checkVoucherCode = (
  res,
  dispatch,
  setIsCorrectVoucherCode,
  setIsSpinner
) => {
  const { response } = res;
  if (response) {
    dispatch(profileActions.setCertainDiscount(response.coupon));
    setIsCorrectVoucherCode(true);
  } else {
    dispatch(profileActions.setCertainDiscount(null));
    setIsCorrectVoucherCode(false);
  }
  setIsSpinner(false);
};

export const getRentalProduct = (
  productInfo,
  certainDiscount,
  realPrice,
  submitFailed,
  submitSuccess,
  currentSizeId,
  currentQuantity,
  clientSecret,
  cardSource,
  values,
  stripe
) => {
  const data = {};
  data.product_dict = {
    product_id: productInfo.id,
    size_id: currentSizeId,
    quantity: currentQuantity,
  };
  data.card_id = values.card_id;
  data.rental_time = values.rentalPeriod.type;
  data.rental_period = +values.rentalPeriod.value;
  const isVoucher = certainDiscount ? { ...certainDiscount } : null;
  delete isVoucher?.name;
  delete isVoucher?.value;
  data.coupon = isVoucher;
  data.amount = realPrice;
  if (realPrice && cardSource) {
    stripe
      .confirmCardPayment(clientSecret.response.client_secret, {
        payment_method: cardSource,
      })
      .then((resp) => {
        if (resp.error) {
          submitFailed();
        } else {
          confirmPaymentIntent();
          rentProduct(data).then((response) => {
            if (response?.response) {
              submitSuccess(response, "Rent product");
            }
          });
        }
      });
  } else {
    rentProduct(data).then((response) => {
      if (response?.response) {
        submitSuccess(response, "Rent product");
      }
    });
  }
};

export const getSoldProduct = (
  resultData,
  productInfo,
  certainDiscount,
  realPrice,
  submitFailed,
  submitSuccess,
  clientSecret,
  cardSource,
  stripe,
  activeCheckoutTab
) => {
  const isVoucher = certainDiscount ? { ...certainDiscount } : null;
  delete isVoucher?.name;
  delete isVoucher?.value;
  resultData.coupon = isVoucher;
  resultData.amount = realPrice;
  if (activeCheckoutTab === "pickup_store") {
    resultData.meetInPerson = true;
    resultData.giveawayDelivery = false;
    resultData.delivery_options = "fetch_in_store";
    resultData.meetInPersonMessage = "";

    if (productInfo.price === 0) {
      buyProduct(resultData).then((response) => {
        if (response.response) {
          submitSuccess(response, "Request Giveaway");
        }
      });
    } else if (!realPrice || (realPrice && !cardSource)) {
      buyProduct(resultData).then((response) => {
        if (response.response) {
          submitSuccess(response, "Buy product");
        }
      });
    } else {
      stripe
        .confirmCardPayment(clientSecret.response.client_secret, {
          payment_method: cardSource,
        })
        .then((resp) => {
          if (resp.error) {
            submitFailed();
          } else {
            confirmPaymentIntent();
            buyProduct(resultData).then((response) => {
              if (response.response) {
                submitSuccess(response, "Buy product");
              }
            });
          }
        });
    }
  } else {
    resultData.meetInPerson = false;
    resultData.giveawayDelivery = true;
    deliveryQuote({
      products: resultData.products,
      address_id: resultData.address_id,
    }).then((res) => {
      if (res.response) {
        for (const quote in res.response.quotes) {
          resultData.delivery_options = {
            [quote]:
              res.response.quotes[quote].delivery_options[0].product_short_name,
          };
        }
        if (productInfo.price === 0) {
          buyProduct(resultData).then((response) => {
            if (response.response) {
              submitSuccess(response, "Request Giveaway");
            }
          });
        } else if (!realPrice || (realPrice && !cardSource)) {
          buyProduct(resultData).then((response) => {
            if (response.response) {
              submitSuccess(response, "Buy product");
            }
          });
        } else {
          stripe
            .confirmCardPayment(clientSecret.response.client_secret, {
              payment_method: cardSource,
            })
            .then((resp) => {
              if (resp.error) {
                submitFailed();
              } else {
                confirmPaymentIntent();
                buyProduct(resultData).then((response) => {
                  if (response.response && response.response.uniqueLinks) {
                    submitSuccess("Buy Product");
                  } else {
                    submitFailed();
                  }
                });
              }
            });
        }
      }
    });
  }
};

export const getSwappedProduct = (
  resultData,
  productInfo,
  submitFailed,
  submitSuccess,
  activeCheckoutTab
) => {
  resultData.price = {
    price: Number(productInfo.price) || 0,
    currency: productInfo.currency.symbol || "€",
  };
  if (activeCheckoutTab === "pickup_store") {
    resultData.meetInPerson = true;
    resultData.meetInPersonMessage = "";
    resultData.giveawayDelivery = false;
    resultData.delivery_options = "meet_in_person";
  } else if (activeCheckoutTab === "home_delivery") {
    resultData.meetInPerson = false;
    resultData.giveawayDelivery = true;
  }

  if (activeCheckoutTab === "pickup_store") {
    requestGiveaway(resultData).then((response) => {
      if (response.response && response.response.uniqueLinks) {
        submitSuccess(response, "Request Giveaway");
      } else {
        submitFailed();
      }
    });
  } else {
    deliveryQuote({
      products: resultData.products,
      address_id: resultData.address_id,
    }).then((res) => {
      if (res.response) {
        for (const quote in res.response.quotes) {
          resultData.delivery_options = {
            [quote]:
              res.response.quotes[quote].delivery_options[0].product_short_name,
          };
        }

        requestGiveaway(resultData).then((response) => {
          if (response.response && response.response.uniqueLinks) {
            submitSuccess();
          } else {
            submitFailed();
          }
        });
      }
    });
  }
};

export const closeConfirmDeleteProd = (
  wardrobeId,
  setIsConfirmDeleteModalOpened,
  history
) => {
  const { productInfo, wardrobeProducts } = store.getState().profileReducer;
  const { userInfo } = store.getState().authReducer;
  setIsConfirmDeleteModalOpened(false);
  if (productInfo.in_wardrobe) {
    const vaultPage = userInfo.business_role ? "brandvault" : "vault";
    updateWardrobeItem(wardrobeId, userInfo.slug, "deleteWardrobeItem")
      .then(() => {
        if (wardrobeProducts) {
          const updatedVault = wardrobeProducts.filter((p) => {
            return +p.wardrobe_id !== +wardrobeId;
          });
          store.dispatch(profileActions.fetchWardrobeSucceeded(updatedVault));
        }
        history.push(`/${userInfo.slug}/profile/${vaultPage}`);
      })
      .catch(() => {
        store.dispatch(
          errorsActions.showErrorRequestModal("Imposible to delete product")
        );
        history.push(`/${userInfo.slug}/profile/${vaultPage}`);
      });
  } else {
    deleteProduct({ product_id: productInfo.id })
      .then(() => {
        store.dispatch(profileActions.setIsProductOpen(false));
        history.push(`/${userInfo.slug}/profile/store`);
      })
      .catch(() =>
        store.dispatch(
          errorsActions.showErrorRequestModal("Imposible to delete product")
        )
      );
  }
};
