import { profileActions } from "../../../actions/profile";
import { uploadSelectionActions } from "../../../actions/uploadSelection";
import { getAddresses, getProfileCards } from "../../../api";
import { gendersData } from "../../../static/data/dataForForms";
import { store } from "../../../store";

export const createDataToRequest = (
  data,
  categories,
  characteristics,
  prevLayers,
  productInfo,
  isPassonLink
) => {
  const photos = data.images.filter((img) => img);

  let stocks = data.itemsizes.map((item) => {
    const id = characteristics.sizes.find((s) => s.description === item.size)
      .id;
    return { size_id: id, quantity: +item.quantity };
  });
  if (Boolean(isPassonLink) && Array.isArray(stocks) && stocks.length === 0) {
    stocks = [{ size_id: null, quantity: 1 }]
  }

  const curId = characteristics.currencies.find(
    (cur) => cur.currency === data.itemcurrency
  ).id;

  const hashtag_ids = categories.find((c) => c.en === data.itemcategory).id;

  const product_benefits = {
    fair_working_conditions: data.designcriteria.fair_working_conditions,
    innovative_processing: data.designcriteria.innovative_processing,
    respecting_the_environment: data.designcriteria.respecting_the_environment,
    sustainable_materials: data.designcriteria.sustainable_materials,
  };

  const genderId = gendersData.find((g) => g.value === data.itemgender)?.id || null;

  const productData = {
    name: data.itemname,
    sku_code: data.itemsku,
    description: data.itemdescription,
    composition: data.itemcomposition,
    gender_id: genderId,
    price: data.itemprice || 0,
    price_per_day: data.itempriceperday || 0,
    address_id: data.pickupaddress === true ? "" : data.pickupaddress,
    can_fetch_in_store: data.pickupinstore,
    photos,
    stocks: JSON.stringify(stocks),
    currency_id: String(curId),
    product_benefits: JSON.stringify(product_benefits),
    hashtag_ids: [hashtag_ids],
    minimum_rental_period: +data.rentalPeriods.min.value,
    minimum_rental_time: data.rentalPeriods.min.type,
    maximum_rental_period: +data.rentalPeriods.max.value,
    maximum_rental_time: data.rentalPeriods.max.type,
    return_address_id: data.returnaddress === true ? "" : data.returnaddress,
    can_return_to_store: data.canreturninstore,
    status: data.itemstatus,
  };

  if (data.shippingcost === "I will pay" && data.paymentmethod)
    productData.card_id = data.paymentmethod;

  const addedLayers = prevLayers.filter((l) => !l.noDeletable);
  addedLayers.push([...prevLayers].pop());

  if (addedLayers.length > 1) {
    let memories = [];
    const photosForMemories = [];
    const history_items = addedLayers.map((item, index) => {
      const history = {
        owner_id: index,
        FactoryName: item.prevlayerusername,
        city_of_transaction:
          item.cityoftransaction.name || item.cityoftransaction,
        date: item.transactiondate,
        photo_factory: item.url,
        isAutocompleted: item.isAutocompleted,
      };

      if (typeof item.cityoftransaction === "object") {
        const memory = {
          id: index,
          title: item.title,
          description: item.description,
          location: item.location.name,
          hashtags: JSON.stringify(item.hashtags),
        };
        memories.push(memory);
        photosForMemories.push(item.memoryphoto);
      }
      return history;
    });

    productData.history_items = JSON.stringify(history_items);

    productData.memories = JSON.stringify(memories);
    productData.photos_for_memories = photosForMemories;

    const transactionData = addedLayers[0];
    productData.date = transactionData.transactiondate;

    const cityOfTransactionData = transactionData.cityoftransaction;
    cityOfTransactionData.isAutocompleted = transactionData.isAutocompleted;
    productData.city_of_transaction = cityOfTransactionData;
  }

  for (const key in data.designcriteria) {
    if (data.designcriteria[key]) productData[key] = data.designcriteria[key];
  }

  if (productInfo) {
    productData.giveaway = productInfo.giveaway;
    productData.product_slug = productInfo.slug;
  }

  if (isPassonLink) {
    productData.product_link = isPassonLink;
  }

  return productData;
};

export const validateRentalPeriods = (rentalPeriods) => {
  const { min, max } = rentalPeriods;
  let errorText = "";
  const errorMinText = "Minimum period can't be more than maximum one";
  if (
    (min.type === "Months" && (max.type === "Weeks" || max.type === "Days")) ||
    (min.type === "Weeks" && max.type === "Days")
  ) {
    errorText = errorMinText;
  } else if (
    (min.type === "Months" && max.type === "Months") ||
    (min.type === "Weeks" && max.type === "Weeks") ||
    (min.type === "Days" && max.type === "Days")
  ) {
    if (+max.value < +min.value) errorText = errorMinText;
  }
  return errorText;
};

export const getDateValue = (date) => {
  if (!date) return "01";
  const str = String(date);
  if (str.length < 2) {
    return "0" + str;
  } else return str;
};

export const createHistoryLayers = (transactionHistory) => {
  let transactions = [];
  if (transactionHistory) {
    transactions = transactionHistory[0].history.map((item) => {
      const updatedItem = {
        cityoftransaction: item.address,
        isAutocompleted: false,
        prevlayeravatar: item.avatar,
        prevlayerusername: item.slug,
        transactiondate: new Date(item.timestamp).toISOString(),
        url: item.avatar,
        currentUser: false,
        noDeletable: true,
        memories: item.memories,
        isBrand: item.blue_check,
      };
      return updatedItem;
    });
  }
  return transactions;
};

export const fetchAddresses = (
  setAddresses,
  setAddAddressModal,
  setAddressField
) => {
  getAddresses().then(({ response }) => {
    const gottenAddresses = response.addresses;
    gottenAddresses.push({
      name: "+ Add new address",
      btnItem: (fieldType) => {
        setAddAddressModal(true);
        setAddressField(fieldType);
      },
    });
    setAddresses(gottenAddresses);
  });
};

export const fetchCards = (setCards, setAddCardModal) => {
  getProfileCards().then(({ response }) => {
    const gottenCards = response.cards;
    gottenCards.push({
      name: "+ Add new card",
      btnItem: () => setAddCardModal(true),
    });
    setCards(gottenCards);
  });
};

export const addPrevItemLayer = (
  data,
  prevLayers,
  setPrevLayers,
  setIsAddPrevLayerModal
) => {
  const newPrevLayer = { ...data };
  newPrevLayer.noDeletable = false;
  const correctDate = new Date(...newPrevLayer.transactiondate).toISOString();
  newPrevLayer.transactiondate = correctDate;
  newPrevLayer.isBrand = true;
  const updatedPrevLayers = [...prevLayers, newPrevLayer].sort(
    (a, b) => new Date(a.transactiondate) - new Date(b.transactiondate)
  );
  setPrevLayers(updatedPrevLayers);
  setIsAddPrevLayerModal(false);
};

export const getCertainAction = (isEdit, kindProdString) => {
  return isEdit === "isPassOn"
    ? "uploadPassOnProduct"
    : isEdit &&
      (kindProdString === "Rent item" || kindProdString === "Sell item")
      ? "editSellRentProductAsync"
      : isEdit && kindProdString === "Swap item"
        ? "editSwapProductAsync"
        : kindProdString === "Rent item"
          ? "uploadRentProductAsync"
          : kindProdString === "Sell item"
            ? "uploadSellProductAsync"
            : "uploadSwapProductAsync";
};

export const onSubmitFinish = (
  isEdit,
  onClose,
  onSubmit,
  history,
  userInfo,
  isPassonLink,
  res
) => {
  if (isEdit === "isPassOn" && res?.response) {
    store.dispatch(uploadSelectionActions.removePassedOnProduct(isPassonLink));
    if (userInfo.business_role) {
      history.push(`/${userInfo.slug}/profile/brandvault`);
    } else {
      history.push(`/${userInfo.slug}/profile/vault`);
    }
    onClose();
  } else if (isEdit) {
    onClose();
  } else {
    store.dispatch(profileActions.setTabKind("store"));
    onSubmit();
    history.push(`/${userInfo.slug}/profile/store`);
  }
};

export const setDefaultValues = (
  addresses,
  values,
  productInfo,
  setFieldValue,
  topTitle,
  cards,
  addressField,
  setDefaultPickUpAddress,
  setDefaultReturnAddresses,
  setDefaultCard,
  setFieldTouched
) => {
  const startDefault =
    addresses.length > 1
      ? `${addresses[0]?.address}, ${addresses[0]?.city?.city}`
      : addresses[0].name || addresses[0];
  let pickupAddress = "";
  let returnAddress = "";

  if (topTitle === "Rent item") {
    if (values.returnaddress && productInfo) {
      const defReturnData = addresses.find(
        (el) => el.id === productInfo.return_address?.id
      );
      if (defReturnData) {
        setFieldValue("returnaddress", defReturnData.id);
        returnAddress = `${defReturnData.address}, ${defReturnData.city?.city}`;
      } else {
        setFieldValue("returnaddress", addresses[0].id || "");
        returnAddress = startDefault;
      }
    } else {
      setFieldValue("returnaddress", addresses[0].id || "");
      returnAddress = startDefault;
    }
  }

  if (values.pickupaddress && productInfo) {
    const defPickupData = addresses.find(
      (el) => el.id === productInfo.pickup_address?.id
    );
    if (defPickupData) {
      setFieldValue("pickupaddress", defPickupData.id);
      pickupAddress = `${defPickupData.address}, ${defPickupData.city?.city}`;
    } else {
      setFieldValue("pickupaddress", addresses[0].id || "");
      pickupAddress = startDefault;
    }
  } else {
    setFieldValue("pickupaddress", addresses[0].id || "");
    pickupAddress = startDefault;
  }

  if (cards.length) setFieldValue("paymentmethod", cards[0].id || "");

  // TODO: for the moment of the commit here, default data about card
  // in case of editing product, doesn't come from the server
  // so, it is set in default value for start upload the product
  const defaultCard =
    cards.length >= 1 ? `****${cards[0].card_last_digits}` : cards[0];
  setDefaultCard(defaultCard);

  // the variable 'addressField' is set in case,
  // when user opens the modal to add new address
  // otherwise, it is set to null by default
  // callback is set in the 'fetchAddresses' function in this file
  if (topTitle === "Rent item" && !addressField) {
    setDefaultPickUpAddress(pickupAddress);
    setDefaultReturnAddresses(returnAddress);
    setFieldTouched("pickupaddress", false);
    setFieldTouched("returnaddress", false);
  } else if (topTitle !== "Rent item" && !addressField) {
    setDefaultPickUpAddress(pickupAddress);
    setFieldTouched("pickupaddress", false);
  } else if (addressField === "pickupaddress") {
    setDefaultPickUpAddress(pickupAddress);
    setFieldTouched("pickupaddress", false);
  } else if (addressField === "returnaddress") {
    setDefaultReturnAddresses(returnAddress);
    setFieldTouched("returnaddress", false);
  }
};
