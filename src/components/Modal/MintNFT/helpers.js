export const createNFTInfo = (data) => {
  const NFTInfo = {
    photo: data?.photo,
    raw: data?.raw,
    fbx: data?.fbx,
    title: data?.name,
    description: data?.description,
    location: data?.description,
    quantity: data?.quantity || 1,
    price: data?.price,
    currency_id: data?.currency,
    hashtagfield: data?.hashtagfield,
    hashtags: data?.hashtags,
  };
  return NFTInfo;
};

export const createHistoryLayers = (transactionHistory) => {
  let transactions = [];
  if (transactionHistory) {
    transactions = transactionHistory[0].history.map((item) => {
      const updatedItem = {
        isAutocompleted: false,
        avatar: item.avatar,
        username: item.slug,
        url: item.avatar,
        currentUser: false,
        noDeletable: true,
        isBrand: item.blue_check,
      };
      return updatedItem;
    });
  }
  return transactions;
};