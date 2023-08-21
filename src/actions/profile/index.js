import { types } from "./types";

export const profileActions = {
  // Async
  fetchWardrobeProducts(slug, cb) {
    return {
      type: types.FETCH_WARDROBE_PRODUCTS,
      payload: { slug, cb },
    };
  },
  fetchWeekSelection() {
    return {
      type: types.FETCH_WEEK_SELECTION,
    };
  },
  fetchStartShopProducts(slug) {
    return {
      type: types.FETCH_START_SHOP_PRODUCTS,
      payload: { slug },
    };
  },
  fetchShopProducts(slug, page) {
    return {
      type: types.FETCH_SHOP_PRODUCTS,
      payload: { slug, page },
    };
  },
  fetchStartArtsProducts(slug) {
    return {
      type: types.FETCH_START_ARTS_PRODUCTS,
      payload: { slug }
    }
  },
  fetchStartArtsProductsSucceed(productsData) {
    return {
      type: types.FETCH_START_ARTS_PRODUCTS_SUCCEED,
      payload: { productsData },
    };
  },
  fetchArtsProducts(slug, page) {
    return {
      type: types.FETCH_ARTS_PRODUCTS,
      payload: { slug, page }
    }
  },
  fetchArtsProductsSucceed(products) {
    return {
      type: types.FETCH_ARTS_PRODUCTS_SUCCEED,
      payload: { products },
    };
  },
  setArtsPageNumber(pageNumber) {
    return {
      type: types.SET_ARTS_PAGE_NUMBER,
      payload: { pageNumber },
    };
  },
  fetchSavedProducts(userSlug, page) {
    return {
      type: types.FETCH_SAVED_PRODUCTS,
      payload: { userSlug, page },
    };
  },
  fetchFollowingBrands(userSlug, page) {
    return {
      type: types.FETCH_FOLLOWING_BRANDS_ASYNC,
      payload: { userSlug, page },
    };
  },
  fetchFollowingStores(userSlug, page) {
    return {
      type: types.FETCH_FOLLOWING_STORES_ASYNC,
      payload: { userSlug, page },
    };
  },
  followUser(slug, changeStatus) {
    return {
      type: types.FOLLOW_USER_ASYNC,
      payload: { slug, changeStatus },
    };
  },
  unfollowUser(slug, changeStatus) {
    return {
      type: types.UNFOLLOW_USER_ASYNC,
      payload: { slug, changeStatus },
    };
  },
  fetchSpins(slug, page) {
    return {
      type: types.FETCH_SPINS_ASYNC,
      payload: { slug, page },
    };
  },
  checkTakeBackRent(passon_link, callback) {
    return {
      type: types.CHECK_TAKEBACKRENT,
      payload: { passon_link, callback },
    };
  },
  takeBackRent(data, callback) {
    return {
      type: types.TAKEBACKRENT,
      payload: { data, callback },
    };
  },
  fetchProdByToken(token, cb, history) {
    return {
      type: types.FETCH_PRODUCT_BY_TOKEN,
      payload: { token, cb, history },
    };
  },
  fetchProdBySlug(slug, callback, history) {
    return {
      type: types.FETCH_PRODUCT_BY_SLUG,
      payload: { slug, callback, history },
    };
  },
  fetchTransactionHistory(token) {
    return {
      type: types.FETCH_TRANSACTION_HISTORY,
      payload: { token },
    };
  },
  fetchTokenizedBrandInfo(token) {
    return {
      type: types.FETCH_TOKENIZED_BRAND_INFO,
      payload: { token },
    };
  },
  fetchProfileData(slug, history, callback) {
    return {
      type: types.FETCH_PROFILE_DATA,
      payload: { slug, history, callback },
    };
  },
  fetchWorldsData(history, isBusinessRole) {
    return {
      type: types.FETCH_WORLDS_DATA,
      payload: { history, isBusinessRole },
    };
  },
  fetchVouchersData() {
    return {
      type: types.FETCH_VOUCHERS_DATA,
    };
  },
  checkVoucherCode(data, cb) {
    return {
      type: types.CHECK_VOUCHER_CODE,
      payload: { data, cb },
    };
  },
  deleteTransactionMemory(id, slug) {
    return {
      type: types.DELETE_TRANSACTION_MEMORY,
      payload: { id, slug },
    };
  },
  fetchGalleryImages() {
    return {
      type: types.FETCH_GALLERY_IMAGES,
    };
  },
  fetchProfilesForSwitchPopup(history) {
    return {
      type: types.FETCH_PROFILES_FOR_SWITCH_POPUP,
      payload: { history },
    };
  },
  switchProfileThroughPopup(slug, id, history, cb) {
    return {
      type: types.FETCH_PROFILES_TO_SWITCH_POPUP,
      payload: { slug, id, history, cb },
    };
  },
  switchProfileWhenLogin(slug, id, history, cb) {
    return {
      type: types.SWITCH_PROFILE_WHEN_LOGIN,
      payload: { slug, id, history, cb },
    };
  },
  fetchHomepageWearableItem(page, cb) {
    return {
      type: types.FETCH_WEARABLE_DATA_ASYNC,
      payload: { page, cb }
    };
  },
  fetchHomepageArtItem(page, cb) {
    return {
      type: types.FETCH_ART_DATA_ASYNC,
      payload: { page, cb }
    };
  },
  // Sync
  changeIsLoadingProfile(isLoading) {
    return {
      type: types.FETCH_PROFILE_IS_LOADING,
      payload: isLoading
    }
  },
  fetchWardrobeSucceeded(products) {
    return {
      type: types.FETCH_WARDROBE_SUCCEEDED,
      payload: { products },
    };
  },
  fetchWardrobeFailed(error) {
    return {
      type: types.FETCH_WARDROBE_FAILED,
      payload: { error },
    };
  },
  fetchWeekSelectionSucceeded(products) {
    return {
      type: types.FETCH_WEEK_SELECTION_SUCCEEDED,
      payload: { products },
    };
  },
  fetchWeekSelectionFailed(error) {
    return {
      type: types.FETCH_WEEK_SELECTION_FAILED,
      payload: { error },
    };
  },
  fetchStartShopProductsSucceed(productsData) {
    return {
      type: types.FETCH_START_SHOP_PRODUCTS_SUCCEEDED,
      payload: { productsData },
    };
  },
  fetchShopProductsSucceeded(products) {
    return {
      type: types.FETCH_SHOP_PRODUCTS_SUCCEEDED,
      payload: { products },
    };
  },
  fetchShopProductsFailed(error) {
    return {
      type: types.FETCH_SHOP_PRODUCTS_FAILED,
      payload: { error },
    };
  },
  fetchSavedProductsAndUpdateSucceeded(products) {
    return {
      type: types.FETCH_SAVED_PRODUCTS_AND_UPDATE_SUCCEEDED,
      payload: { products },
    };
  },
  fetchSavedProductsAndAddSucceeded(products) {
    return {
      type: types.FETCH_SAVED_PRODUCTS_AND_ADD_SUCCEEDED,
      payload: { products },
    };
  },
  fetchSavedProductsFailed(error) {
    return {
      type: types.FETCH_SAVED_PRODUCTS_FAILED,
      payload: { error },
    };
  },
  fetchFollowingBrandsSecceeded(following) {
    return {
      type: types.FETCH_FOLLOWING_BRANDS_SUCCEEDED,
      payload: following,
    };
  },
  fetchFollowingBrandsFailed(error) {
    return {
      type: types.FETCH_FOLLOWING_BRANDS_FAILED,
      payload: { error },
    };
  },
  followUserSucceeded() {
    return {
      type: types.FOLLOW_USER_SUCCEEDED,
    };
  },
  followUserFailed() {
    return {
      type: types.FOLLOW_USER_FAILED,
    };
  },
  unfollowUserSucceeded() {
    return {
      type: types.UNFOLLOW_USER_SUCCEEDED,
    };
  },
  unfollowUserFailed() {
    return {
      type: types.UNFOLLOW_USER_FAILED,
    };
  },
  fetchSpinsSucceeded(spins) {
    return {
      type: types.FETCH_SPINS_SUCCEEDED,
      payload: spins,
    };
  },
  fetchSpinsFailed(spins) {
    return {
      type: types.FETCH_SPINS_FAILED,
      payload: spins,
    };
  },
  fetchFollowingStoresSucceeded(following) {
    return {
      type: types.FETCH_FOLLOWING_STORES_SUCCEEDED,
      payload: following,
    };
  },
  fetchFollowingStoresFailed(error) {
    return {
      type: types.FETCH_FOLLOWING_STORES_FAILED,
      payload: { error },
    };
  },
  removeFollowing() {
    return {
      type: types.REMOVE_FOLLOWING,
    };
  },
  removeSaved() {
    return {
      type: types.REMOVE_SAVED,
    };
  },
  removeSpins() {
    return {
      type: types.REMOVE_SPINS,
    };
  },
  removeShopProducts() {
    return {
      type: types.REMOVE_SHOP_PRODUCTS,
    };
  },
  setTabKind(tabname) {
    return {
      type: types.BRAND_TAB_KIND,
      payload: { tabname },
    };
  },
  setUsualTabKind(tabname) {
    return {
      type: types.USUAL_TAB_KIND,
      payload: { tabname },
    };
  },
  saveScrollState(scrollState) {
    return {
      type: types.SAVE_SCROLL_STATE,
      payload: { scrollState },
    };
  },
  setPageNumber(pageNumber) {
    return {
      type: types.SET_PAGE_NUMBER,
      payload: { pageNumber },
    };
  },
  setGiveBackData(data) {
    return {
      type: types.SET_GIVEBACK_DATA,
      payload: { data },
    };
  },
  setProductInfo(product) {
    return {
      type: types.SET_PRODUCT_INFO,
      payload: { product },
    };
  },
  setTransactionHistory(data) {
    return {
      type: types.SET_TRANSACTION_HISTORY,
      payload: { data },
    };
  },
  setTokenizedProductBrandInfo(data) {
    return {
      type: types.SET_TOKENIZED_BRAND_INFO,
      payload: { data },
    };
  },
  setProfileData(data) {
    return {
      type: types.SET_PROFILE_DATA,
      payload: { data },
    };
  },
  setWorldsData(data) {
    return {
      type: types.SET_WORLDS_DATA,
      payload: { data },
    };
  },
  setProductToken(token) {
    return {
      type: types.SET_PRODUCT_TOKEN,
      payload: { token },
    };
  },
  setVouchersData(vouchers) {
    return {
      type: types.SET_VOUCHERS_DATA,
      payload: { vouchers },
    };
  },
  setCertainDiscount(data) {
    return {
      type: types.SET_DISCOUNT_FOR_CERTAIN_PRODUCT,
      payload: { data },
    };
  },
  setIsProductOpen(value) {
    return {
      type: types.SET_IS_PRODUCT_OPEN,
      payload: { value },
    };
  },
  deleteMemoryLocally(id, slug) {
    return {
      type: types.DELETE_MEMORY_LOCALLY,
      payload: { id, slug },
    };
  },
  shouldUpdateVault(value) {
    return {
      type: types.SHOULD_UPDATE_VAULT,
      payload: { value },
    };
  },
  setGalleryImages(images) {
    return {
      type: types.SET_GALLERY_IMAGES,
      payload: { images },
    };
  },
  saveGalleryImageIdToScroll(value) {
    return {
      type: types.SET_GALLERY_IMAGE_ID_TO_SCROLL,
      payload: { value },
    };
  },
  setProfilesToSwitchPopup(data) {
    return {
      type: types.SET_PROFILES_TO_SWITCH_POPUP,
      payload: { data },
    };
  },
};
