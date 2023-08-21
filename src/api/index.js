import {
  createFormDataObj,
  getClientId,
  getUserToken,
  statusHelper,
} from "../utils";

const IS_PRODUCTION_BACKEND =
  process.env.REACT_APP_BASE_URL === "https://api.lablaco.com/api";

// Authentication

export const prelogin = (email) =>
  fetch(`${process.env.REACT_APP_BASE_URL}/auth/prelogin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));

export const login = (credentials) =>
  fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...credentials }),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));

export const resetPassword = (credentials) =>
  fetch(`${process.env.REACT_APP_BASE_URL}/auth/reset_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...credentials }),
  })
    .then(statusHelper)
    .catch((error) => error);

export const facebookLogin = (access_token) =>
  fetch(`${process.env.REACT_APP_BASE_URL}/auth/facebook_connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access_token }),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));

export const forgotPassword = (email) =>
  fetch(`${process.env.REACT_APP_BASE_URL}/auth/forgot_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));

export const register = (userInfo) =>
  fetch(`${process.env.REACT_APP_BASE_URL}/auth/signup`, {
    method: "POST",
    body: createFormDataObj(userInfo),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));

// Profile

export const weekSelection = () =>
  fetch(`${process.env.REACT_APP_BASE_URL}/content/random_products`)
    .then(statusHelper)
    .catch((error) => ({ error }));

export const updateWardrobeItem = (wardrobeId, slug, mode = null) => {
  const myHeaders = new Headers();
  getUserToken() &&
    myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }
  return fetch(`${process.env.REACT_APP_BASE_URL}/content/wardrobe`, {
    method: "DELETE",
    headers: myHeaders,
    body: slug
      ? JSON.stringify({
          id: wardrobeId,
          slug: slug,
          mode: mode,
        })
      : "",
  })
    .then(statusHelper)
    .catch((error) => error);
};

export const wardrobe = (slug) => {
  const myHeaders = new Headers();
  getUserToken() &&
    myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/content/wardrobe`, {
    method: "POST",
    headers: myHeaders,
    body: slug ? JSON.stringify({ slug }) : "",
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const fetchAllSpins = (userSlug, page = 0) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/foreign_profilebrand/${userSlug}/products?page=${page}&giveaway=1`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const fetchWearableItemForHomeScreen = async (page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/content/homepage/wearables?page=${page}`,
      {
        headers: myHeaders,
      }
    );
    return statusHelper(res);
  } catch (error) {
    return { error };
  }
};

export const fetchArtItemForHomeScreen = async (page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/content/homepage/art?page=${page}`,
      {
        headers: myHeaders,
      }
    );
    return statusHelper(res);
  } catch (error) {
    return { error };
  }
};

export const fetchShopSpins = (slug, page) => {
  const myHeaders = new Headers();
  getUserToken() &&
    myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/curated_products?slug=${slug}&page=${page}`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const fetchArts = (slug, page) => {
  const myHeaders = new Headers();
  getUserToken() &&
    myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/curated_products?slug=${slug}&page=${page}&art=true`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const fetchSavedProducts = (userSlug, page) => {
  const myHeaders = new Headers();
  getUserToken() &&
    myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/foreign_profilebrand/${userSlug}/posts?page=${page}`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const updateProfile = (info) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/content/me`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(info),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const foreignProfilebrandInfo = (slug) => {
  const myHeaders = new Headers();
  getUserToken() &&
    myHeaders.append("Authorization", `Token ${getUserToken()}`);
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/foreign_profilebrand/${slug}`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

// Following

export const fetchFollowingProfilebrands = (userSlug, page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/foreign_profilebrand/${userSlug}/following?page=${page}&business=0`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const fetchFollowingStores = (userSlug, page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/foreign_profilebrand/${userSlug}/following?page=${page}&business=1`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const follow = (slug) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/content/follow/${slug}`, {
    method: "POST",
    headers: myHeaders,
  })
    .then(statusHelper)
    .catch((error) => error);
};

export const unfollow = (slug) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/content/unfollow/${slug}`, {
    method: "POST",
    headers: myHeaders,
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

// Upload selection

export const uploadNFT = (nftInfo) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/content/nft`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(nftInfo),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const uploadGiveaway = (productInfo) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/content/giveaway`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(productInfo),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const editGiveaway = (productInfo) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/content/giveaway`, {
    method: "PUT",
    headers: myHeaders,
    body: createFormDataObj(productInfo),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const editSellRent = (productInfo, slug) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);

  return fetch(`${process.env.REACT_APP_BASE_URL}/content/product/${slug}`, {
    method: "PATCH",
    headers: myHeaders,
    body: createFormDataObj(productInfo),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const productCharacteristics = (slug) => {
  const myHeaders = new Headers();
  getUserToken() &&
    myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/product${
      slug ? `/${slug}` : ""
    }`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => error);
};

export const uploadSellProduct = (data) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(`${process.env.REACT_APP_BASE_URL}/content/product`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(data),
  })
    .then(statusHelper)
    .catch((err) => err);
};

export const uploadSwapProduct = (data) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(`${process.env.REACT_APP_BASE_URL}/content/giveawayFromData`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(data),
  })
    .then(statusHelper)
    .catch((err) => err);
};

export const uploadRentProduct = (data) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(`${process.env.REACT_APP_BASE_URL}/content/rent/modify`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(data),
  })
    .then(statusHelper)
    .catch((err) => err);
};

export const uploadPassOnProduct = (data) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(`${process.env.REACT_APP_BASE_URL}/content/products/passon`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(data),
  })
    .then(statusHelper)
    .catch((err) => err);
};

export const productCategories = (isArt = false) =>
  fetch(
    `${process.env.REACT_APP_BASE_URL}/content/hashtags?product_category=${
      isArt ? "false" : "1"
    }&everything=1&lang=en${isArt ? "&nft=1" : ""}`,
    {
      headers: {
        Authorization: `Token ${getUserToken()}`,
      },
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));

export const getKeptUsers = (query, userType) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  const endpoint =
    userType === "business"
      ? `data/search_slugs?search=${query}&business_role=brand`
      : `data/search_slugs?search=${query}`;
  return fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, {
    headers: myHeaders,
  })
    .then(statusHelper)
    .catch((error) => error);
};

// Address

export const getAddresses = () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/content/me/address`, {
    headers: myHeaders,
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const addNewAddress = (addressInfo) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/content/me/address`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(addressInfo),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

// Payment

export const getProfileCards = (page = 0) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/card?page=${page}`, {
    headers: myHeaders,
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const addNewCard = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/card`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const getClientSecret = () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/setup_intent`, {
    method: "POST",
    headers: myHeaders,
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const confirmCardSetup = (client_secret) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/setup_intent`, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ customer_secret: client_secret }),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const getPaymentIntentSecret = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/payment_intent`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const confirmPaymentIntent = () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/payment_intent`, {
    method: "PUT",
    headers: myHeaders,
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const buyProduct = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/products/buy`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const rentProduct = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/products/rent`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const requestGiveaway = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/giveaways/buy`, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then(statusHelper)
    .catch((error) => error);
};

export const confirmPassonGiveaway = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/giveaways/buy`, {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

// it has its own error handler, but not found in browser what it does
// on moment, when it is commited
export const declinePassonGiveaway = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/giveaways/buy`, {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const deliveryQuote = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/payment/products/delivery_quote`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

// Create brand/company

export const createBrand = (info) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(`${process.env.REACT_APP_BASE_URL}/content/profile/brand`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(info),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

// Product

export const checkTakeBackRent = (passon_link) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  myHeaders.append("Content-Type", "application/json");
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/payment/check_take_back_confirmation/${passon_link}`,
    { headers: myHeaders }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const tokenizedProductInfo = (token) => {
  const myHeaders = new Headers();
  getUserToken() &&
    myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/uniqueProduct/${token}`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => error);
};

export const tokenizedProductBrandInfo = (token) => {
  const myHeaders = new Headers();
  getUserToken() &&
    myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/factoryBrand/${token}`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const tokenizedProductStatus = (token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/productStatus/${token}`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const transactionHistory = (token) => {
  const myHeaders = new Headers();
  getUserToken() &&
    myHeaders.append("Authorization", `Token ${getUserToken()}`);
  myHeaders.append("Content-Type", "application/json");
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/transactionHistory/${token}`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const editTransactionHistory = (token, data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/transactionHistory/${token}`,
    {
      method: "POST",
      headers: myHeaders,
      body: createFormDataObj(data),
    }
  )
    .then(statusHelper)
    .catch((error) => error);
};

export const deleteTransactionMemory = (id) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  myHeaders.append("Authorization", `Token ${userToken}`);
  myHeaders.append("Content-Type", "application/json");
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/delete_transaction_memory/${id}`,
    {
      method: "DELETE",
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => error);
};

export const switchableProfile = () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/profile/switchable_profilebrand`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => error);
};

export const deleteProduct = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${getUserToken()}`);
  if (getClientId()) {
    myHeaders.append("client-id", getClientId());
  }
  myHeaders.append("Content-Type", "application/json");

  return fetch(`${process.env.REACT_APP_BASE_URL}/content/giveaway`, {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const downloadImage = (url) => {
  const myHeaders = new Headers();
  if (IS_PRODUCTION_BACKEND) myHeaders.append("Cache-Control", "no-cache");
  return fetch(url, {
    headers: myHeaders,
  })
    .then((response) => response.blob())
    .catch((error) => ({ error }));
};

export const takeBackRent = (data) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  myHeaders.append("Authorization", `Token ${userToken}`);
  const clientId = getClientId();
  if (clientId) myHeaders.append("client-id", getClientId());

  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/rent/takeback`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(data),
  })
    .then(statusHelper)
    .catch((error) => ({ error }));
};

export const moveBackToShop = (data) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  myHeaders.append("Authorization", `Token ${userToken}`);
  const clientId = getClientId();
  if (clientId) myHeaders.append("client-id", getClientId());

  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/return_item_to_shop`,
    {
      method: "POST",
      headers: myHeaders,
      body: createFormDataObj(data),
    }
  )
    .then(statusHelper)
    .catch((error) => ({ error }));
};

// ==vouchers start==
export const getVouchersDataReq = () => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/coupon`, {
    headers: myHeaders,
  })
    .then(statusHelper)
    .catch((error) => error);
};
export const createVoucherReq = (data) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/coupon`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(data),
  })
    .then(statusHelper)
    .catch((error) => error);
};

export const editVoucherReq = (data, id) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/coupon/${id}`, {
    method: "PUT",
    headers: myHeaders,
    body: createFormDataObj(data),
  })
    .then(statusHelper)
    .catch((error) => error);
};

export const reactivateVoucherReq = (id) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/payment/coupon/${id}/availability`,
    {
      method: "POST",
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => error);
};
export const deactivateVoucherReq = (id) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/payment/coupon/${id}/availability`,
    {
      method: "DELETE",
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => error);
};
export const checkVoucherCodeReq = (data) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/check_coupon`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(data),
  })
    .then(statusHelper)
    .catch((error) => error);
};
// ==vouchers end==

export const getCloudinaryImageList = () => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(`${process.env.REACT_APP_BASE_URL}/cloudinary/image_list`, {
    headers: myHeaders,
  })
    .then(statusHelper)
    .catch((error) => error);
};

//subscriptions

export const createSubscription = (
  subscription_id,
  card_id,
  already_have_printer,
  already_have_RFID_writer,
  voucherCode
) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  const body = {
    subscription_id: subscription_id,
    already_have_printer: already_have_printer,
    already_have_RFID_writer: already_have_RFID_writer,
  };
  if (voucherCode) {
    body["coupon"] = voucherCode;
  }
  if (!voucherCode || !already_have_printer || !already_have_RFID_writer) {
    body["card_id"] = card_id;
  }
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/payment/stripe-subscription`,
    {
      method: "POST",
      headers: myHeaders,
      body: createFormDataObj(body),
    }
  )
    .then(statusHelper)
    .catch((error) => error);
};

export const updateSubscription = (subscription_id, card_id=null) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  const body = { subscription_id: subscription_id, card_id: card_id };
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/payment/stripe-subscription`,
    {
      method: "PUT",
      headers: myHeaders,
      body: createFormDataObj(body),
    }
  )
    .then(statusHelper)
    .catch((error) => error);
};

export const cancelSubscription = (subscription_id) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  const body = { subscription_id: subscription_id };
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/payment/stripe-subscription`,
    {
      method: "DELETE",
      headers: myHeaders,
      body: createFormDataObj(body),
    }
  )
    .then(statusHelper)
    .catch((error) => error);
};

export const subscriptionShippingAddress = (
  has_printer,
  has_RFID_writer,
  address_id
) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  const body = {
    already_have_printer: has_printer,
    already_have_RFID_writer: has_RFID_writer,
  };
  if (!has_printer || !has_RFID_writer) {
    body["address_id"] = address_id;
  }
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(`${process.env.REACT_APP_BASE_URL}/content/printer`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(body),
  })
    .then(statusHelper)
    .catch((error) => error);
};

export const subscriptionRepay = (invoice_id, card_id) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  const body = { invoice_id: invoice_id, card_id: card_id };
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(`${process.env.REACT_APP_BASE_URL}/payment/repay-subscription`, {
    method: "POST",
    headers: myHeaders,
    body: createFormDataObj(body),
  })
    .then(statusHelper)
    .catch((error) => error);
};

export const getAggregatedMemories = (productSlug) => {
  const myHeaders = new Headers();
  const userToken = getUserToken();
  const clientId = getClientId();
  if (userToken) myHeaders.append("Authorization", `Token ${userToken}`);
  if (clientId) myHeaders.append("client-id", clientId);
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/content/aggregated_memories/${productSlug}`,
    {
      headers: myHeaders,
    }
  )
    .then(statusHelper)
    .catch((error) => error);
};
