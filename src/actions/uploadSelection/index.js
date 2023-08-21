import { types } from "./types";

export const uploadSelectionActions = {
  // Async
  uploadContentAsync(info, callback) {
    return {
      type: types.UPLOAD_CONTENT_ASYNC,
      payload: { info, callback },
    };
  },
  uploadSellProductAsync(data, callback) {
    return {
      type: types.UPLOAD_SELL_PRODUCT_ASYNC,
      payload: { data, callback },
    };
  },
  uploadSwapProductAsync(data, callback) {
    return {
      type: types.UPLOAD_SWAP_PRODUCT_ASYNC,
      payload: { data, callback },
    };
  },
  uploadRentProductAsync(data, callback) {
    return {
      type: types.UPLOAD_RENT_PRODUCT_ASYNC,
      payload: { data, callback },
    };
  },
  uploadProductAsync(info, callback) {
    return {
      type: types.UPLOAD_PRODUCT_ASYNC,
      payload: { info, callback },
    };
  },
  editProductAsync(info, callback) {
    return {
      type: types.EDIT_SWAP_PRODUCT_ASYNC,
      payload: { info, callback },
    };
  },
  editSwapProductAsync(info, callback) {
    return {
      type: types.EDIT_SWAP_PRODUCT_ASYNC,
      payload: { info, callback },
    };
  },
  editSellRentProductAsync(info, callback) {
    return {
      type: types.EDIT_SELL_RENT_PRODUCT_ASYNC,
      payload: { info, callback },
    };
  },
  addProductMemory(token, data, cb) {
    return {
      type: types.ADD_PRODUCT_MEMORY,
      payload: { token, data, cb },
    };
  },
  createVoucher(data, cb) {
    return {
      type: types.CREATE_VOUCHER,
      payload: { data, cb },
    };
  },
  editVoucher(data, id, cb) {
    return {
      type: types.EDIT_VOUCHER,
      payload: { data, id, cb },
    };
  },
  deactivateVoucher(id, cb) {
    return {
      type: types.DEACTIVATE_VOUCHER,
      payload: { id, cb },
    };
  },
  reactivateVoucher(id, cb) {
    return {
      type: types.REACTIVATE_VOUCHER,
      payload: { id, cb },
    };
  },
  uploadPassOnProduct(data, callback) {
    return {
      type: types.UPLOAD_PASSON_PRODUCT,
      payload: { data, callback },
    };
  },

  // Sync
  uploadContentSuccess() {
    return {
      type: types.UPLOAD_CONTENT_SUCCESS,
    };
  },
  uploadContentFailed(error) {
    return {
      type: types.UPLOAD_CONTENT_FAILED,
      payload: error,
    };
  },
  uploadProductSuccess() {
    return {
      type: types.UPLOAD_PRODUCT_SUCCESS,
    };
  },
  uploadProductFailed(error) {
    return {
      type: types.UPLOAD_PRODUCT_FAILED,
      payload: error,
    };
  },
  setProductMemory(memory) {
    return {
      type: types.SET_PRODUCT_MEMORY,
      payload: { memory },
    };
  },
  addCreatedVoucher(voucher) {
    return {
      type: types.ADD_CREATED_VOUCHER,
      payload: { voucher },
    };
  },
  setEditedVoucher(id, voucher) {
    return {
      type: types.SET_EDITED_VOUCHER,
      payload: { id, voucher },
    };
  },
  removeActiveVoucher(id) {
    return {
      type: types.REMOVE_ACTIVE_VOUCHER,
      payload: { id },
    };
  },
  makeVoucherActive(id, voucher) {
    return {
      type: types.MAKE_VOUCHER_ACTIVE,
      payload: { id, voucher },
    };
  },
  removePassedOnProduct(passonLink) {
    return {
      type: types.REMOVE_PASSEDON_PRODUCT,
      payload: { passonLink },
    };
  },
  uploadPassOnProduct(data, callback) {
    return {
      type: types.UPLOAD_PASSON_PRODUCT,
      payload: { data, callback },
    };
  },
};
