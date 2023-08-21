import { types } from "../actions/profile/types";
import { types as uploadSelectioTypes } from "../actions/uploadSelection/types";

const initialState = {
  isLoading: false,
  wardrobeProducts: null,
  isShouldUpdateVault: false,
  weekSelectionProducts: null,
  shopProducts: [],
  savedProducts: [],
  followingBrands: [],
  followingStores: [],
  totalSpins: [],
  homePageWearableContent: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  homePageArtContent: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  productsCount: 0,
  tabKind: "store",
  usualTabKind: "vault",
  scrollTop: 0,
  pageNumber: 0,
  givebackData: null,
  productInfo: null,
  isProductOpen: false,
  productToken: "",
  transactionHistory: null,
  tokenizedBrandInfo: null,
  profileInfo: null,
  worldsData: null,
  vouchersData: null,
  certainDiscount: null,
  lastUrl: null,
  galleryImages: null,
  scrollToImageId: null,
  profilesToSwitch: [],
  artsProducts: [],
  artsCount: 0,
  artPageNumber: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_PROFILE_IS_LOADING:
      return { ...state, isLoading: payload };

    case types.FETCH_WARDROBE_SUCCEEDED:
      return { ...state, wardrobeProducts: payload.products };

    case types.FETCH_WEEK_SELECTION_SUCCEEDED:
      return { ...state, weekSelectionProducts: payload.products };

    case types.FETCH_START_SHOP_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        shopProducts: payload.productsData.products,
        productsCount: payload.productsData.products_count,
        scrollTop: 0,
        pageNumber: 0,
      };

    case types.FETCH_START_ARTS_PRODUCTS_SUCCEED:
      return {
        ...state,
        artsProducts: payload.productsData.products,
        artsCount: payload.productsData.products_count,
        scrollTop: 0,
        artPageNumber: 0,
      };

    case types.FETCH_ARTS_PRODUCTS_SUCCEED:
      return {
        ...state,
        artsProducts: [...state.artsProducts, ...payload.products],
      };

    case types.FETCH_SHOP_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        shopProducts: [...state.shopProducts, ...payload.products],
      };

    case types.FETCH_SAVED_PRODUCTS_AND_UPDATE_SUCCEEDED:
      return {
        ...state,
        savedProducts: [...payload.products],
      };
    case types.FETCH_SAVED_PRODUCTS_AND_ADD_SUCCEEDED:
      return {
        ...state,
        savedProducts: [...state.savedProducts, ...payload.products],
      };

    case types.FETCH_FOLLOWING_BRANDS_SUCCEEDED:
      return {
        ...state,
        followingBrands: [...state.followingBrands, ...payload],
      };

    case types.FETCH_FOLLOWING_STORES_SUCCEEDED:
      return {
        ...state,
        followingStores: [...state.followingStores, ...payload],
      };

    case types.FETCH_SPINS_SUCCEEDED:
      return { ...state, totalSpins: [...state.totalSpins, ...payload] };

    case types.REMOVE_FOLLOWING:
      return { ...state, followingBrands: [], followingStores: [] };

    case types.REMOVE_SAVED:
      return { ...state, savedProducts: [] };

    case types.REMOVE_SPINS:
      return { ...state, totalSpins: [] };

    case types.REMOVE_SHOP_PRODUCTS:
      return { ...state, shopProducts: [] };

    case types.BRAND_TAB_KIND:
      return { ...state, tabKind: payload.tabname };

    case types.USUAL_TAB_KIND:
      return { ...state, usualTabKind: payload.tabname };

    case types.SAVE_SCROLL_STATE:
      return { ...state, scrollTop: payload.scrollState };

    case types.SET_IS_PRODUCT_OPEN:
      return { ...state, isProductOpen: payload.value };

    case types.SET_PAGE_NUMBER:
      return { ...state, pageNumber: payload.pageNumber };

    case types.SET_ARTS_PAGE_NUMBER:
      return { ...state, artPageNumber: payload.pageNumber };

    case types.SET_GIVEBACK_DATA:
      return { ...state, givebackData: payload.data };

    case types.SET_PRODUCT_INFO: {
      const updatedProfuctInfo = JSON.parse(JSON.stringify(payload.product));
      if (updatedProfuctInfo) {
        updatedProfuctInfo.stocks
          .filter((item) => item.size)
          .sort((a, b) => a.size.id > b.size.id);
      }
      return { ...state, productInfo: updatedProfuctInfo };
    }

    case types.SET_TRANSACTION_HISTORY:
      return { ...state, transactionHistory: payload.data };

    case types.SET_TOKENIZED_BRAND_INFO:
      return { ...state, tokenizedBrandInfo: payload.data };

    case types.SET_PROFILE_DATA:
      return { ...state, profileInfo: payload.data };

    case types.SET_WORLDS_DATA:
      return { ...state, worldsData: payload.data };

    case types.SET_PRODUCT_TOKEN:
      return { ...state, productToken: payload.token };

    case uploadSelectioTypes.SET_PRODUCT_MEMORY: {
      const updatedTransactions = { ...state.transactionHistory };
      const history = updatedTransactions["0"].history;
      history[history.length - 1].memories.push(payload.memory);
      return { ...state, transactionHistory: updatedTransactions };
    }

    case types.SET_VOUCHERS_DATA: {
      const updatedVouchers = payload.vouchers.map((v) => {
        v.expiration_date = v.expiration_date.split(" ")[0];
        return v;
      });
      return { ...state, vouchersData: updatedVouchers };
    }

    case uploadSelectioTypes.ADD_CREATED_VOUCHER: {
      const newVoucher = { ...payload.voucher };
      newVoucher.expiration_date = newVoucher.expiration_date.split(" ")[0];
      return {
        ...state,
        vouchersData: [newVoucher, ...state.vouchersData],
      };
    }

    case uploadSelectioTypes.SET_EDITED_VOUCHER: {
      const updatedVouchers = JSON.parse(
        JSON.stringify(state.vouchersData)
      ).filter((v) => String(v.id) !== String(payload.id));
      const newVoucher = { ...payload.voucher };
      newVoucher.expiration_date = newVoucher.expiration_date.split(" ")[0];
      return {
        ...state,
        vouchersData: [newVoucher, ...updatedVouchers],
      };
    }

    case uploadSelectioTypes.REMOVE_ACTIVE_VOUCHER: {
      const removedVoucher = state.vouchersData.find(
        (v) => String(v.id) === String(payload.id)
      );
      removedVoucher.is_active = false;
      const updatedVouchers = JSON.parse(
        JSON.stringify(state.vouchersData)
      ).filter((v) => String(v.id) !== String(payload.id));
      return { ...state, vouchersData: [removedVoucher, ...updatedVouchers] };
    }

    case uploadSelectioTypes.MAKE_VOUCHER_ACTIVE: {
      const updatedVouchers = JSON.parse(
        JSON.stringify(state.vouchersData)
      ).filter((v) => String(v.id) !== String(payload.id));
      const newVoucher = { ...payload.voucher };
      newVoucher.expiration_date = newVoucher.expiration_date.split(" ")[0];
      return { ...state, vouchersData: [newVoucher, ...updatedVouchers] };
    }

    case types.SET_DISCOUNT_FOR_CERTAIN_PRODUCT:
      return { ...state, certainDiscount: payload.data };

    case types.DELETE_MEMORY_LOCALLY: {
      const updatedHistory = JSON.parse(
        JSON.stringify(state.transactionHistory)
      );
      const historyItemIndex = updatedHistory[0].history
        .map((h) => h.slug)
        .indexOf(payload.slug);
      updatedHistory[0].history[
        historyItemIndex
      ].memories = updatedHistory[0].history[historyItemIndex].memories.filter(
        (m) => +m.id !== +payload.id
      );
      return { ...state, transactionHistory: updatedHistory };
    }
    case types.SHOULD_UPDATE_VAULT:
      return { ...state, isShouldUpdateVault: payload.value };

    case types.SET_GALLERY_IMAGES:
      return { ...state, galleryImages: payload.images };
    case types.SET_GALLERY_IMAGE_ID_TO_SCROLL:
      return { ...state, scrollToImageId: payload.value };

    case uploadSelectioTypes.REMOVE_PASSEDON_PRODUCT: {
      const updatedVault = state.wardrobeProducts?.filter(
        (pr) => pr.passon_link !== payload.passonLink
      );
      return { ...state, wardrobeProducts: updatedVault };
    }

    case types.SET_PROFILES_TO_SWITCH_POPUP: {
      return { ...state, profilesToSwitch: payload.data };
    }

    case types.FETCH_WEARABLE_DATA_ASYNC:
      if (payload.page.results) {
        return {
          ...state,
          homePageWearableContent: {
            ...payload.page,
            results: [
              ...state.homePageWearableContent.results,
              ...payload.page.results,
            ],
          },
        };
      }
    case types.FETCH_ART_DATA_ASYNC:
      if (payload.page.results) {
        return {
          ...state,
          homePageArtContent: {
            ...payload.page,
            results: [
              ...state.homePageArtContent.results,
              ...payload.page.results,
            ],
          },
        };
      }

    default:
      return { ...state };
  }
};
