import { monthNames } from "../../../static/data/dataForForms";

export const getinitialValues = (voucherData) => {
  if (voucherData) {
    const monthNumber = new Date(voucherData.expiration_date).getMonth();
    const monthName = monthNames.find((m) => m.value === monthNumber).name;
    const userName =
      voucherData.type === "PERSONAL" ? voucherData.for_whom.slug : "";
    const voucherType =
      voucherData.discount_type === "CASH"
        ? "CASH DISCOUNT"
        : voucherData.discount_type === "FREE"
        ? "FREE"
        : "% DISCOUNT";
    const voucherValue =
      voucherData.discount_type !== "FREE" ? String(voucherData.amount) : "";
    const voucherCurrency =
      voucherData.discount_type === "CASH"
        ? voucherData.currency.currency
        : "EUR";
    const voucherCode =
      voucherData.type === "GENERAL" ? voucherData.voucher_code : "";
    return {
      username: userName,
      vouchertype: voucherType,
      vouchervalue: voucherValue,
      currency: voucherCurrency,
      expirationdate: voucherData.expiration_date.split('-') || ["", "", ""],
      monthName: monthName || "",
      vouchercode: voucherCode,
    };
  } else {
    return {
      username: "",
      vouchertype: "% DISCOUNT",
      vouchervalue: "",
      currency: "EUR",
      expirationdate: ["", "", ""],
      monthName: "",
      vouchercode: "",
    };
  }
};

export const validate = (values, users, voucherTab, certainVoucher) => {
  const {
    username,
    vouchertype,
    vouchervalue,
    expirationdate,
    monthName,
    vouchercode,
  } = values;
  const errors = {};

  if (voucherTab === "general" && !vouchercode) {
    errors.vouchercode = "Required";
    values.vouchercode = "";
  }
  if (voucherTab === "personal" && !username.trim()) {
    errors.username = "Required";
    values.username = "";
  } else if (voucherTab === "personal" && username.trim()) {
    const gottenUser = users.find((user) => user.slug === username.trim());
    if (!gottenUser && !certainVoucher) {
      errors.username = "You have to choice an existing user";
      values.username = "";
    } else values.username = username.trim();
  }

  if (!vouchervalue.trim() && vouchertype !== "FREE") {
    errors.vouchervalue = "Required";
    values.vouchervalue = "";
  }

  // check date
  const dateErrors = [];
  expirationdate.forEach((item, index) => {
    if (item === "") {
      dateErrors[index] = "Required";
      errors.expirationdate = dateErrors;
    }
  });
  // here we check if user choose an incorrect day in day field (date parts are put in array)
  if (expirationdate[2] >= 29 && expirationdate[1] && expirationdate[0]) {
    const chosenDate = new Date(...expirationdate);
    const monthNum = chosenDate.getMonth();
    if (+expirationdate[1] !== monthNum) {
      dateErrors[2] = `There is no ${expirationdate[2]} day in this month of ${expirationdate[0]}`;
      errors.expirationdate = dateErrors;
      values.expirationdate[2] = "";
    }
  }
  // check if correct month
  if (!monthName) {
    errors.monthName = "Required";
  } else {
    const isCorrectMonth = monthNames.find(
      (m) => m.name.toLocaleLowerCase() === monthName.toLocaleLowerCase().trim()
    );
    if (!isCorrectMonth) {
      errors.monthName = "Incorrect month";
      values.monthName = "";
    } else {
      values.expirationdate[1] = String(isCorrectMonth.value);
    }
  }
  // he we check if user choose future date
  if (expirationdate[2] && expirationdate[1] && expirationdate[0]) {
    const chosenDate = new Date(...expirationdate);
    const nowDate = new Date();
    if (chosenDate < nowDate) {
      const chosenYear = chosenDate.getFullYear();
      const chosenMonth = chosenDate.getMonth();
      const chosenDay = chosenDate.getDate();
      const nowYear = nowDate.getFullYear();
      const nowMonth = nowDate.getMonth();
      const nowDay = nowDate.getDate();

      if (nowYear > chosenYear) {
        dateErrors[0] = "You can't choose a last year";
        errors.expirationdate = dateErrors;
        values.expirationdate[0] = "";
      } else if (nowMonth > chosenMonth) {
        values.monthName = "";
        values.expirationdate[1] = "";
        errors.monthName = "You can't choose a last month";
      } else if (nowDay > chosenDay) {
        dateErrors[2] = "You can't choose a last day";
        errors.expirationdate = dateErrors;
        values.expirationdate[2] = "";
      } else if (
        nowYear === chosenYear &&
        nowMonth === chosenMonth &&
        nowDay === chosenDay
      ) {
        dateErrors[2] = "You can't choose a present day";
        errors.expirationdate = dateErrors;
        values.expirationdate[2] = "";
      }
    }
  }

  return errors;
};
