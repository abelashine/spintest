export const getInitialValues = (initialValues) => {
  return {
    businessModel: "Sell",
    productType: "Digital",
    photo: null,
    fbx: null,
    raw: null,
    title: "",
    description: "",
    location: "",
    quantity: 1,
    price: "",
    currency_id: "EUR",
    hashtagfield: "",
    hashtags: [],
    royalties: [],
    terms_and_conditions: false,
    itemsku: "",
    itemcategory: "",
  };
};

export const validate = ({
  businessModel,
  productType,
  photo,
  raw,
  fbx,
  title,
  quantity,
  price,
  itemsku,
  itemcategory,
  terms_and_conditions,
  description
}) => {
  const errors = {};

  if (!businessModel) errors.businessModel = "Required";
  if (!productType) errors.productType = "Required";
  if (!photo) errors.photo = "Invalid photo";
  if (!fbx) errors.fbx = "Please select a valid FBX file";
  if (!raw) errors.raw = "Please select a valid RAW file";
  if (!title) errors.title = "Required";
  if (title === "NFT") errors.title = "Pick a more original name";
  if (!quantity) errors.quantity = "Required";
  if (quantity <= 0) errors.quantity = "Can't mint less than one NFT";
  if (!price) errors.price = "Required";
  if (!itemsku) errors.itemsku = "Required";
  if (!itemcategory) errors.itemcategory = "Required";
  if (!terms_and_conditions) errors.terms_and_conditions = "Required";
  if (!description) errors.description = "Required";
  return errors;
};
