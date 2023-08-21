export const getInitialValues = (initialValues) => {
  return {
    images: [null, null, null, null, null],
    name: initialValues.name || "",
    category: initialValues.category || null,
    description: initialValues.description || "",
    composition: initialValues.composition || "",
    price: initialValues.price === "" ? "" : initialValues.price,
    currency_id: initialValues.currency_id || 6, // "EUR"
    card_id: initialValues.card_id || "",
    address_id: initialValues.address_id || "",
    shippingCosts: initialValues.shippingCosts || "Receiver will pay"
  };
};
export const validate = (
  {
    images,
    name,
    category,
    price,
    address_id,
    description,
    shippingCosts,
    card_id
  },
  categories
) => {
  const errors = {};

  // Checks if user uploaded at least one image
  const imageErrors = [];
  if (!images[0]) {
    imageErrors[0] = "Primary image should not be empty";
    errors.images = imageErrors;
  }

  if (!name) {
    errors.name = "Required";
  } else {
    const isValidName = /[a-zA-Z0-9]/.test(name);
    if (!isValidName)
      errors.name =
        "Item name should include either a number or an English letter!";
  }

  // Checks if category list includes the value
  const isCategory = categories?.find((c) => c.en === category);
  if (!isCategory && category) errors.category = "No such category in the list";

  if (!category) errors.category = "Required";
  if (!description) errors.description = "Required";
  if (!price) errors.price = "Required";
  if (!address_id) errors.address_id = "Required";
  if (shippingCosts === "I will pay" && !card_id) errors.card_id = "Required";

  return errors;
};
