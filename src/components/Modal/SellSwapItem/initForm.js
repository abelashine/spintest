import { validateRentalPeriods, getDateValue } from "./helpers";
import { gendersData } from "../../../static/data/dataForForms";

export const getInitialValues = (productInfo, isEdit) => {
  let itemsizes;
  if (isEdit === "isPassOn" && productInfo) {
    itemsizes = Boolean(productInfo?.size) ? [{ size: productInfo.size.description, quantity: "1" }] : [];
  } else {
    itemsizes =
      productInfo?.stocks.map((el) => {
        return {
          quantity: String(el.quantity),
          size: el.size.description,
        };
      }) || [];
  }
  const gender = gendersData.find((item) => item.id === productInfo?.gender)
    ?.name;
  const minValue = getDateValue(productInfo?.minimum_rental_period) || "01";
  const minPeriod = productInfo?.minimum_rental_time || "Days";
  const maxValue = getDateValue(productInfo?.maximum_rental_period) || "01";
  const maxPeriod = productInfo?.maximum_rental_time || "Days";

  const designCriteria = productInfo
    ? JSON.parse(productInfo.product_benefits)
    : null;

  const returnAddress = !!productInfo?.return_address ? true : "";
  const pickupAddress = !!productInfo?.pickup_address ? true : "";

  const canFetchInStore = productInfo ? productInfo.can_fetch_in_store : true;
  const canReturnInStore = productInfo ? productInfo.can_return_to_store : true;
  const itemStatus =
    isEdit === "isPassOn" ? "Secondhand" : productInfo?.status || "";
  return {
    images: [null, null, null, null, null],
    // first part of form
    brandname: productInfo?.brand || "",
    itemname: productInfo?.name || "",
    itemsku: productInfo?.sku_code || "",
    itemcategory: productInfo?.category || "",
    itemcomposition: productInfo?.composition || "",
    itemdescription: productInfo?.description || "",
    itemsizes: productInfo ? itemsizes : [{ size: "", quantity: "1" }],
    itemgender: productInfo ? gender : "",
    itemstatus: itemStatus,
    itemprice: productInfo?.price || "",
    itempriceperday: productInfo?.price_per_day || "",
    itemcurrency: productInfo?.currency?.currency || "EUR",
    itemhashtagfield: "",
    itemhashtags: productInfo?.hashtags || [],
    rentalPeriods: {
      min: { value: minValue, type: minPeriod },
      max: { value: maxValue, type: maxPeriod },
    },
    // second part of form
    designcriteria: {
      sustainable_materials: designCriteria?.sustainable_materials || false,
      respecting_the_environment:
        designCriteria?.respecting_the_environment || false,
      fair_working_conditions: designCriteria?.fair_working_conditions || false,
      innovative_processing: designCriteria?.innovative_processing || false,
    },
    pickupaddress: pickupAddress, // default value here in case of 'true' is set in LogisticDetails component
    returnaddress: returnAddress, // default value here in case of 'true' is set in LogisticDetails component
    shippingcost: "Receiver will pay",
    paymentmethod: "",
    pickupinstore: canFetchInStore,
    canreturninstore: canReturnInStore,
  };
};
export const validate = (
  {
    images,
    brandname,
    itemname,
    itemsku,
    itemcategory,
    itemcomposition,
    itemdescription,
    itemsizes,
    itemgender,
    itemstatus,
    itemprice,
    itempriceperday,
    rentalPeriods,
    pickupaddress,
    returnaddress,
    shippingcost,
    paymentmethod,
  },
  formNum,
  topTitle,
  categories,
  addresses
) => {
  const errors = {};
  // here we check if uploaded first (main) and second photos
  const imageErrors = [];
  if (!images[0]) {
    imageErrors[0] = "First photo is required";
    errors.images = imageErrors;
  }
  if (!images[1]) {
    imageErrors[1] = "Second photo is required";
    errors.images = imageErrors;
  }

  // ==============
  // first form part
  // ==============
  /* TODO:
          "Brand name" ('brandname') was commented here, because there is no enough
              functionality, which provides its workflow fully
          Also was commented validation of this field in file FirstFormPart/index.js
            on one more level up
         */
  // if (!brandname) errors.brandname = "Empty brand name";

  if (!itemname) {
    errors.itemname = "Empty item name";
  } else {
    const isValidItemName = /[a-zA-Z0-9]/.test(itemname);
    if (!isValidItemName) {
      errors.itemname =
        "Item name should include either a number or an English letter!";
    }
  }
  if (!itemsku) errors.itemsku = "Empty item SKU";
  if (!itemcategory.trim()) {
    errors.itemcategory = "Required";
  } else {
    const isCategory = categories?.find((c) => c.en === itemcategory.trim());
    if (!isCategory && itemcategory) {
      errors.itemcategory = "No such category in list";
    }
  }

  if (!itemcomposition) errors.itemcomposition = "Empty item composition";
  if (!itemdescription) errors.itemdescription = "Empty item description";

  // here we check if size field is emty or invalid, there is prevention adding new field in respective component if previous one is empty
  const sizesErrors = [];
  itemsizes.forEach((itemsize, index) => {
    if (!itemsize.size) {
      sizesErrors[index] = { size: "Required" };
      errors.itemsizes = sizesErrors;
    }
    if (!itemsize.quantity) {
      sizesErrors[index] = sizesErrors[index]
        ? { ...sizesErrors[index], quantity: "Required" }
        : { quantity: "Required" };
      errors.itemsizes = sizesErrors;
    }
  });

  if (!itemgender) errors.itemgender = "Required";
  if (!itemstatus && topTitle === "Sell item") errors.itemstatus = "Required";
  if (!itemprice && (topTitle === "Sell item" || topTitle === "Rent item")) {
    errors.itemprice = "Required";
  } else if (
    +itemprice <= 0 &&
    (topTitle === "Sell item" || topTitle === "Rent item")
  ) {
    errors.itemprice = "This value should be over zero";
  }
  if (topTitle === "Rent item") {
    if (!itempriceperday) {
      errors.itempriceperday = "Required";
    } else if (+itemprice < +itempriceperday) {
      errors.itempriceperday = "Price per day can't be larger than item value";
    }
  }

  // check if min period is not bigger then max period
  const periodsError = validateRentalPeriods(rentalPeriods);
  if (periodsError) {
    errors.rentalPeriods = periodsError;
  }

  // ===============
  // second form part
  // ===============
  if (
    (!pickupaddress && formNum !== 0 && addresses.length <= 1) ||
    pickupaddress === "+ Add new address"
  ) {
    errors.pickupaddress = "Required";
  }
  if (!returnaddress && formNum !== 0 && addresses.length <= 1) {
    errors.returnaddress = "Required";
  }
  if (!paymentmethod && formNum !== 0 && shippingcost === "I will pay") {
    errors.paymentmethod = "Required";
  }

  return errors;
};
