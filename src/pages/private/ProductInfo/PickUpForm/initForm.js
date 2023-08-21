import { getDateValue } from '../helpers'

export const getInitialValues = (productInfo) => {
  return {
    card_id: "",
    rentalPeriod: {
      type: productInfo.minimum_rental_time || "Days",
      value: getDateValue(productInfo.minimum_rental_period) || "01"
    },
    discountType: "VOUCHER CODE",
    voucherCode: ""
  }
};
