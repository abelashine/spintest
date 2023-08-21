import { gendersDataV3 } from "../../../static/data/dataForForms";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const setDatetoText = (date) => {
  const arrayDate = date.split("-").reverse();
  arrayDate[1] = months[arrayDate[1] - 1];
  return arrayDate.join(" ");
};

const setTexttoDate = (text) => {
  const arrayDate = text.split(" ");
  let month = months.findIndex((item) => item === arrayDate[1]) + 1;
  if (month < 10) {
    arrayDate[1] = "0" + month;
  } else {
    arrayDate[1] = month;
  }
  return arrayDate.join(".");
};

export const createDataToRequest = (values, cities, userInfo) => {
  const resultValues = { ...values };
  let city = "";
  if (cities.length > 0) {
    city = cities.find(({ value }) => value === values.city).shortValue;
    resultValues.city = city;
  } else {
    delete resultValues.city;
  }
  if (userInfo.profile) {
    const birthDateArray = setTexttoDate(resultValues.birth_date).split(".")
    const birthDate = `${birthDateArray[2]}-${birthDateArray[1]}-${birthDateArray[0]}`
    resultValues.birth_date = birthDate;
    const gender = gendersDataV3.find(({ value }) => value.toUpperCase() === values.gender.toUpperCase()).id;
    resultValues.gender = gender;
  }
  if (!values.avatar) {
    delete resultValues.avatar;
  }
  return resultValues;
};

export const validateDate = (valueName, values, errors) => {
  const dateDataValue = setTexttoDate(values[valueName]).split(".");
  const dayValue = parseFloat(dateDataValue[0]);
  const monthValue = parseFloat(dateDataValue[1]);
  const yearValue = parseFloat(dateDataValue[2]);
  if (
      Number.isNaN(dayValue) ||
      Number.isNaN(monthValue) ||
      Number.isNaN(yearValue)
  ) {
    errors[valueName] = "Invalid date";
    values[valueName] = "";
  } else if (
      !Number.isNaN(dayValue) &&
      !Number.isNaN(monthValue) &&
      !Number.isNaN(yearValue)
  ) {
    if (
        dayValue > 31 ||
        monthValue > 12 ||
        monthValue === 0 ||
        (String(dayValue).length === 2 && String(dayValue) === "00") ||
        (String(monthValue).length === 2 && String(monthValue) === "00") ||
        String(yearValue).length < 4
    ) {
      errors[valueName] = "Invalid date";
      values[valueName] = "";
      return;
    }
    const date = new Date(yearValue, monthValue, dayValue);
    const day = date.getDate();
    if (day !== +dayValue) {
      errors[valueName] = `There is no ${dayValue} day in this month!`;
      values[valueName] = "";
      return;
    }
    else{
      const current_date = new Date();
      const date = new Date(yearValue, monthValue, dayValue);
      let age = current_date.getFullYear() - date.getFullYear();
      const month = current_date.getMonth() - date.getMonth();
      if (month < 0 || (month === 0 && current_date.getDate() < date.getDate())) {
        age--;
      }
      if (age < 15 || age > 150) {
        errors[valueName] = `Incorrect age`;
        values[valueName] = "";
        return;
      }
    }
  }
};

export const getDataForRequest = (businessInfo, cities, companyCities) => {
  const totalInfo = { ...businessInfo };
  let brand_place_id = "";
  let company_place_id = "";
  if (cities.length > 0) {
    brand_place_id = cities.find(({ value }) => value === businessInfo.city)
      .shortValue;
    company_place_id = companyCities.find(
      ({ value }) => value === businessInfo.city_place_id
    ).shortValue;
  } else {
    delete totalInfo.city;
  }
  return { totalInfo, brand_place_id, company_place_id };
};

export const isThereError = (page, formikData) => {
  const { errors, values } = formikData;
  let isError;
  console.log(page);
  if (page === 0) {
    console.log("page 1 error validation", values);
    isError =
      errors.accounttype ||
      !values.accounttype ||
      errors.profile ||
      !values.profile ||
      errors.label ||
      !values.label ||
      errors.policy ||
      !values.policy ||
      false;
    formikData.setTouched({
      accounttype: true,
      profile: true,
      label: true,
      policy: true,
    });
  } else if (page === 1) {
    console.log("page 2 error validation", values);
    if (values.accounttype == "individual") {
      console.log("individual account type");
      isError =
        errors.category ||
        !values.category ||
        errors.profile_name ||
        !values.profile_name ||
        errors.user_name ||
        !values.user_name ||
        errors.city ||
        !values.city ||
        false;
      formikData.setTouched({
        category: true,
        profile_name: true,
        user_name: true,
        city: true,
      });
    } else {
      isError =
        errors.category ||
        !values.category ||
        errors.profile_name ||
        !values.profile_name ||
        errors.user_name ||
        !values.user_name ||
        errors.company_story ||
        !values.company_story ||
        errors.company_founding_date ||
        !values.company_founding_date ||
        errors.city ||
        !values.city ||
        false;
      formikData.setTouched({
        category: true,
        profile_name: true,
        user_name: true,
        company_story: true,
        company_founding_date: true,
        city: true,
      });
    }
  } else if (page === 2) {
    console.log("page 3 error validation", values);
    if (values.accounttype == "individual") {
      console.log("individual account type");
    } else {
      isError =
        errors.company_name ||
        !values.company_name ||
        errors.tax_no ||
        !values.tax_no ||
        errors.legal_address ||
        !values.legal_address ||
        errors.postal_code ||
        !values.postal_code ||
        errors.company_email ||
        !values.company_email ||
        errors.contact_person ||
        !values.contact_person ||
        errors.phone_number ||
        !values.phone_number ||
        false;
      formikData.setTouched({
        company_name: true,
        tax_no: true,
        legal_address: true,
        postal_code: true,
        company_email: true,
        contact_person: true,
        phone_number: true,
      });
    }
  }
  return isError;
};


