const createProductInfo = (data, category) => {
  const productInfo = {
    name: data?.name,
    category: category || 0,
    description: data?.description,
    composition: data?.composition,
    price: data?.price === undefined ? "": data?.price,
    currency_id: data?.category,
    photos: data?.images?.filter((img) => img),
    card_id: data?.card_id,
    address_id: data?.address_id,
    shippingCosts: data?.shippingCosts,
  };
  return productInfo;
};

export default createProductInfo;
