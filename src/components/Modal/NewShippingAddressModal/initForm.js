import parsePhoneNumber from "libphonenumber-js";
import phones from "../../../static/phones.json";

export const initialValues = {
  alias: "Home",
  client_full_name: "",
  countryCode: "",
  phoneNumber: "",
  address: "",
  postal_code: "",
  city: "",
  notes: "",
};

export const validate = (values, cities) => {
  const { client_full_name, countryCode, phoneNumber, address, city } = values;
  const errors = {};

  if (!client_full_name.trim()) {
    errors.client_full_name = "Empty person of reference";
    values.client_full_name = "";
  }
  if (!countryCode.trim().slice(1)) {
    errors.countryCode = "Required";
    values.countryCode = "";
  } else {
    const isCorrect = phones.find((c) => c.value === countryCode.trim());
    if (!isCorrect) {
      errors.countryCode = "Invalid";
      values.countryCode = "";
    }
  }
  if (!phoneNumber.trim()) {
    errors.phoneNumber = "Required";
    values.phoneNumber = "";
  } else if (phoneNumber.trim() && countryCode.trim().slice(1)) {
    const allPhone = countryCode.trim() + phoneNumber.trim();
    const phone = parsePhoneNumber(allPhone);
    const isCorrectNumber = phone?.isPossible();
    if (!isCorrectNumber) {
      errors.phoneNumber = "Invalid";
      values.phoneNumber = "";
    }
  }

  if (!address.trim()) {
    errors.address = "Empty address";
    values.address = "";
  }
  if (!city.trim()) {
    errors.city = "Empty city";
    values.city = "";
  } else {
    const isCorrectAddress = cities.find((data) => data.value === city.trim());
    if (!isCorrectAddress) {
      errors.city = "Choose an existing address";
      values.city = "";
    }
  }
  return errors;
};
