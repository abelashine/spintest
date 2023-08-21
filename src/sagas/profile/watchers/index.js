import { all, call, takeEvery, takeLatest } from "redux-saga/effects";

// Types
import { types } from "../../../actions/profile/types";

// Workers
import { fetchArtsProducts, fetchStartArtsProducts } from "../workers/artProducts";
import { fetchFollowingBrands } from "../workers/followingBrands";
import { fetchFollowingShops } from "../workers/followingStores";
import { followUser } from "../workers/followUser";
import {
  getProductBySlug, getProductByToken, getTokenizedProductBrandInfo, getTransactionHistory
} from "../workers/getCertainProduct";
import { fetchArtDataWorker, fetchWearableDataWorker } from "../workers/getDataForMainHomeScreen";
import { getGalleryImages } from "../workers/getGalleryImages";
import {
  fetchProfilesForSwitchPopup, getProfileData,
  switchProfileThroughSwitchPopup, switchProfileWhenLogin
} from "../workers/getProfileData";
import { checkVoucherCode, getVouchersData } from "../workers/getVouchersData";
import { getWorldsData } from "../workers/getWorldsData";
import { fetchSaved } from "../workers/savedProducts";
import {
  fetchShopProducts,
  fetchStartShopProducts
} from "../workers/shopProducts";
import {
  checkTakeBackRentalProduct,
  takeBackRentalProduct
} from "../workers/takeBackRent";
import { deleteTransMemory } from "../workers/transactions";
import { unfollowUser } from "../workers/unfollowUser";
import { fetchSpins } from "../workers/userSpins";
import { fetchWardrobe } from "../workers/wardrobe";
import { fetchWeekSelection } from "../workers/weekSelection";

function* watchWardrobe() {
  yield takeLatest(types.FETCH_WARDROBE_PRODUCTS, fetchWardrobe);
}

function* watchWeekSelection() {
  // TODO: fetch only once
  yield takeLatest(types.FETCH_WEEK_SELECTION, fetchWeekSelection);
}

function* watchStartShopProducts() {
  yield takeEvery(types.FETCH_START_SHOP_PRODUCTS, fetchStartShopProducts);
}

function* watchShopProducts() {
  yield takeEvery(types.FETCH_SHOP_PRODUCTS, fetchShopProducts);
}

function* watchStartArtsProducts() {
  yield takeEvery(types.FETCH_START_ARTS_PRODUCTS, fetchStartArtsProducts);
}

function* watchArtsProducts() {
  yield takeEvery(types.FETCH_ARTS_PRODUCTS, fetchArtsProducts);
}

function* watchSavedProducts() {
  yield takeEvery(types.FETCH_SAVED_PRODUCTS, fetchSaved);
}

function* watchFollowingBrands() {
  yield takeEvery(types.FETCH_FOLLOWING_BRANDS_ASYNC, fetchFollowingBrands);
}

function* watchFollowingStores() {
  yield takeEvery(types.FETCH_FOLLOWING_STORES_ASYNC, fetchFollowingShops);
}

function* watchFollowUser() {
  yield takeEvery(types.FOLLOW_USER_ASYNC, followUser);
}

function* watchUnfollowUser() {
  yield takeEvery(types.UNFOLLOW_USER_ASYNC, unfollowUser);
}

function* watchFetchSpins() {
  yield takeEvery(types.FETCH_SPINS_ASYNC, fetchSpins);
}

function* getWearableItems() {
  yield takeEvery(types.FETCH_WEARABLE_DATA_ASYNC, fetchWearableDataWorker);
}

function* getArtItems() {
  yield takeEvery(types.FETCH_ART_DATA_ASYNC, fetchArtDataWorker);
}

function* watchGetProductByToken() {
  yield takeEvery(types.FETCH_PRODUCT_BY_TOKEN, getProductByToken);
}

function* watchGetProductBySlug() {
  yield takeEvery(types.FETCH_PRODUCT_BY_SLUG, getProductBySlug);
}

function* watchGetTransactionHistory() {
  yield takeEvery(types.FETCH_TRANSACTION_HISTORY, getTransactionHistory);
}

function* watchGetTokenizedProductBrandInfo() {
  yield takeEvery(
    types.FETCH_TOKENIZED_BRAND_INFO,
    getTokenizedProductBrandInfo
  );
}

function* watchCheckTakeBackRent() {
  yield takeEvery(types.CHECK_TAKEBACKRENT, checkTakeBackRentalProduct);
}

function* watchTakeBackRent() {
  yield takeEvery(types.TAKEBACKRENT, takeBackRentalProduct);
}

function* watchGetProfileData() {
  yield takeEvery(types.FETCH_PROFILE_DATA, getProfileData);
}

function* watchGetWorldsData() {
  yield takeEvery(types.FETCH_WORLDS_DATA, getWorldsData);
}

function* watchGetVouchersData() {
  yield takeEvery(types.FETCH_VOUCHERS_DATA, getVouchersData);
}

function* watchCheckVoucherCode() {
  yield takeEvery(types.CHECK_VOUCHER_CODE, checkVoucherCode);
}

function* watchDeleteTransactionMamory() {
  yield takeEvery(types.DELETE_TRANSACTION_MEMORY, deleteTransMemory);
}

function* watchGetGalleryImages() {
  yield takeEvery(types.FETCH_GALLERY_IMAGES, getGalleryImages);
}

function* watchSwitchProfileThroughSwitchPopup() {
  yield takeEvery(
    types.FETCH_PROFILES_TO_SWITCH_POPUP,
    switchProfileThroughSwitchPopup
  );
}

function* watchFetchProfilesForSwitchPopup() {
  yield takeEvery(
    types.FETCH_PROFILES_FOR_SWITCH_POPUP,
    fetchProfilesForSwitchPopup
  );
}

function* watchSwitchProfileWhenLogin() {
  yield takeEvery(types.SWITCH_PROFILE_WHEN_LOGIN, switchProfileWhenLogin);
}

export default function* watchProfile() {
  yield all([
    call(watchWardrobe),
    call(watchWeekSelection),
    call(watchStartShopProducts),
    call(watchShopProducts),
    call(watchSavedProducts),
    call(watchFollowingBrands),
    call(watchFollowUser),
    call(watchUnfollowUser),
    call(watchFetchSpins),
    call(watchFollowingStores),
    call(watchGetProductByToken),
    call(watchGetProductBySlug),
    call(watchGetTransactionHistory),
    call(watchGetTokenizedProductBrandInfo),
    call(watchCheckTakeBackRent),
    call(watchTakeBackRent),
    call(watchGetProfileData),
    call(watchGetWorldsData),
    call(watchGetVouchersData),
    call(watchCheckVoucherCode),
    call(watchDeleteTransactionMamory),
    call(watchGetGalleryImages),
    call(watchSwitchProfileThroughSwitchPopup),
    call(watchFetchProfilesForSwitchPopup),
    call(watchSwitchProfileWhenLogin),
    call(getWearableItems),
    call(getArtItems),
    call(watchStartArtsProducts),
    call(watchArtsProducts),
  ]);
}
