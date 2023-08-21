import { takeEvery, all, call } from "redux-saga/effects";

// Types
import { types } from "../../../actions/uploadSelection/types";

// Workers
import { uploadContent } from "../workers/uploadContent";
import {
  uploadProduct,
  uploadBrandSellProduct,
  uploadBrandSwapProduct,
  uploadBrandRentProduct,
} from "../workers/uploadProduct";
import { editSwapProduct, editSellRentProduct } from "../workers/editProduct";
import { addProductMemory } from "../workers/addProductMemory";
import {
  createVoucher,
  deactivateVoucher,
  reactivateVoucher,
  editVoucher,
} from "../workers/vouchersWorkers";
import { uploadPassonProduct } from "../workers/uploadPassonProduct";

function* watchUploadContent() {
  yield takeEvery(types.UPLOAD_CONTENT_ASYNC, uploadContent);
}

function* watchUploadSellBrendProduct() {
  yield takeEvery(types.UPLOAD_SELL_PRODUCT_ASYNC, uploadBrandSellProduct);
}

function* watchUploadSwapBrendProduct() {
  yield takeEvery(types.UPLOAD_SWAP_PRODUCT_ASYNC, uploadBrandSwapProduct);
}

function* watchUploadRentBrendProduct() {
  yield takeEvery(types.UPLOAD_RENT_PRODUCT_ASYNC, uploadBrandRentProduct);
}

function* watchUploadProduct() {
  yield takeEvery(types.UPLOAD_PRODUCT_ASYNC, uploadProduct);
}

function* watchEditSwapProduct() {
  yield takeEvery(types.EDIT_SWAP_PRODUCT_ASYNC, editSwapProduct);
}

function* watchEditSellRentProduct() {
  yield takeEvery(types.EDIT_SELL_RENT_PRODUCT_ASYNC, editSellRentProduct);
}

function* watchAddProductMemory() {
  yield takeEvery(types.ADD_PRODUCT_MEMORY, addProductMemory);
}

function* watchCreateVoucher() {
  yield takeEvery(types.CREATE_VOUCHER, createVoucher);
}

function* watchDeactivateVoucher() {
  yield takeEvery(types.DEACTIVATE_VOUCHER, deactivateVoucher);
}

function* watchReactivateVoucher() {
  yield takeEvery(types.REACTIVATE_VOUCHER, reactivateVoucher);
}

function* watchEditVoucher() {
  yield takeEvery(types.EDIT_VOUCHER, editVoucher);
}

function* watchUploadPassonProduct() {
  yield takeEvery(types.UPLOAD_PASSON_PRODUCT, uploadPassonProduct);
}

export default function* watchUploadSelection() {
  yield all([
    call(watchUploadContent),
    call(watchUploadSellBrendProduct),
    call(watchUploadSwapBrendProduct),
    call(watchUploadRentBrendProduct),
    call(watchUploadProduct),
    call(watchEditSwapProduct),
    call(watchEditSellRentProduct),
    call(watchAddProductMemory),
    call(watchCreateVoucher),
    call(watchDeactivateVoucher),
    call(watchReactivateVoucher),
    call(watchEditVoucher),
    call(watchUploadPassonProduct),
  ]);
}
