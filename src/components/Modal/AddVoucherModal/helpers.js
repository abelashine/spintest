import { YEAR_LENGTH_LIMIT } from "../../../static/data/dataForForms";
import { getKeptUsers } from "../../../api";
import {
  daysInMonth,
  monthNames,
  oneHundredAndTwentyYearsForward,
} from "../../../static/data/dataForForms";

export const validateDateFields = (values) => {
  // here we check if day is correct
  if (values.expirationdate[2].includes(" "))
    values.expirationdate[2] = values.expirationdate[2].replace(" ", "");
  if (values.expirationdate[2].length > 2)
    values.expirationdate[2] = values.expirationdate[2].slice(0, 2);
  if (
    values.expirationdate[2].length === 1 &&
    !Number(values.expirationdate[2])
  )
    values.expirationdate[2] = "";
  if (
    values.expirationdate[2].length === 2 &&
    !Number(values.expirationdate[2])
  )
    values.expirationdate[2] =
      String(parseFloat(values.expirationdate[2])) || "";
  if (
    values.expirationdate[2].length === 2 &&
    Number(values.expirationdate[2][0]) > 3
  )
    values.expirationdate[2] = String(values.expirationdate[2].slice(0, 1));
  if (
    Number(values.expirationdate[2][0]) === 3 &&
    Number(values.expirationdate[2][1]) > 1
  )
    values.expirationdate[2] = String(values.expirationdate[2].slice(0, 1));
  if (values.expirationdate[2] && !Number(values.expirationdate[2])) {
    const isNan = Number.isNaN(parseInt(values.expirationdate[2]));
    values.expirationdate[2] = isNan
      ? ""
      : String(parseInt(values.expirationdate[2]));
  }

  // here we check year field
  if (values.expirationdate[0].includes(" "))
    values.expirationdate[0] = values.expirationdate[0].replace(" ", "");
  if (values.expirationdate[0].length > YEAR_LENGTH_LIMIT)
    values.expirationdate[0] = values.expirationdate[0].replace(
      values.expirationdate[0][values.expirationdate[0].length - 1],
      ""
    );
  if (values.expirationdate[0] && !Number(values.expirationdate[0])) {
    const isNan = Number.isNaN(parseInt(values.expirationdate[0]));
    values.expirationdate[0] = isNan
      ? ""
      : String(parseInt(values.expirationdate[0]));
  }
};


export const searchUser = (query, setUsers) => {
  getKeptUsers(query.toLowerCase()).then(({ response }) => {
    const certainPrevLayers = response.slugs.map((user) => {
      user.name = user.slug;
      user.value = user.slug;
      return user;
    });
    setUsers(certainPrevLayers);
  });
};

export const voucherTypes = [
  { value: "CASH DISCOUNT" },
  { value: "% DISCOUNT" },
  { value: "FREE" },
];

export const searchDay = (query, setData) => {
  if (!query) setData(daysInMonth);
  const days = daysInMonth.filter(
    (d) => String(d.value).startsWith(query) && query
  );
  setData(days);
};
export const searchMonth = (query, setData) => {
  if (!query) setData(monthNames);
  const months = monthNames.filter((m) =>
    String(m.name.toLowerCase()).includes(query)
  );
  setData(months);
};
export const searchYear = (query, setData) => {
  if (!query) setData(oneHundredAndTwentyYearsForward);
  const years = oneHundredAndTwentyYearsForward.filter(
    (y) => String(y.value).startsWith(query) && query
  );
  setData(years);
};

export const createDataToRequest = (values, currencies) => {
  const dataToRequest = {};
  if (values.username) {
    dataToRequest.type = "PERSONAL";
    dataToRequest.for_whom = values.username;
    dataToRequest.code = "";
  } else {
    dataToRequest.type = "GENERAL";
    dataToRequest.for_whom = "";
    dataToRequest.code = values.vouchercode;
  }
  if (values.vouchertype === "% DISCOUNT") {
    dataToRequest.discount_type = "PERCENTAGE";
    dataToRequest.amount = values.vouchervalue;
    dataToRequest.currency = "";
  } else if (values.vouchertype === "CASH DISCOUNT") {
    dataToRequest.discount_type = "CASH";
    const curId = currencies.find((cur) => cur.value === values.currency).id;
    dataToRequest.amount = values.vouchervalue;
    dataToRequest.currency = String(curId);
  } else {
    dataToRequest.discount_type = "FREE";
    dataToRequest.amount = "";
    dataToRequest.currency = "";
  }
  dataToRequest.expiration_date = values.expirationdate
    .map((el, index) => {
      let string = el;
      if (index === 1) {
        string = String(+el + 1);
      }
      if (string.length === 1) {
        string = "0" + string;
      }
      return string;
    })
    .reverse()
    .join("/");
  return dataToRequest;
};

export const wasThereChangesInFields = (certainVoucher, values) => {
  let wasChanges = false;
  const areNamesSame =
    certainVoucher?.for_whom?.slug &&
    certainVoucher.for_whom.slug === values.username
      ? true
      : certainVoucher?.voucher_code &&
        certainVoucher.voucher_code === values.vouchercode
      ? true
      : false;
  const type =
    certainVoucher.discount_type === "PERCENTAGE"
      ? "% DISCOUNT"
      : certainVoucher.discount_type === "CASH"
      ? "CASH DISCOUNT"
      : "FREE";
  const areAmountsSame =
    certainVoucher.discount_type === "FREE"
      ? true
      : String(certainVoucher.amount) === values.vouchervalue
      ? true
      : false;
  const isCurrencySame = certainVoucher?.currency?.currency === values?.currency;
  const voucherDate = new Date(certainVoucher.expiration_date);
  const areDatesSame =
    String(voucherDate.getFullYear()) === String(+values.expirationdate[0]) &&
    String(voucherDate.getMonth()) === String(+values.expirationdate[1]) &&
    String(voucherDate.getDate()) === String(+values.expirationdate[2]);
  if (
    !areNamesSame ||
    values.vouchertype !== type ||
    !areAmountsSame ||
    !areDatesSame ||
    !isCurrencySame
  ) {
    wasChanges = true;
  }
  return wasChanges;
};
