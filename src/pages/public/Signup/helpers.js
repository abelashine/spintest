import { gendersDataV3, monthNamesV2 } from "../../../static/data/dataForForms";

export const isThereError = (page, formikData) => {
  const { errors, values } = formikData;
  let isError;
  if (page === 0) {
    isError =
      errors.image || !values.image || errors.policy || !values.policy || false;
    formikData.setTouched({
      image: true,
      policy: true,
    });
  } else if (page === 1) {
    isError =
      errors.first_name ||
      values.first_name.trim() === "" ||
      errors.last_name ||
      values.last_name.trim() === "" ||
      errors.password ||
      values.password.trim() === "" ||
      false;
    formikData.setTouched({
      first_name: true,
      last_name: true,
      password: true,
    });
  }
  return isError;
};

export const getDataToRequest = (values, cities, history, email) => {
  const lastUrl = sessionStorage.getItem("lastUrl");
  const gender = gendersDataV3.find(
    ({ value }) => value.toLowerCase() === values.gender.toLowerCase().trim()
  ).id;
  const city = cities.find(({ value }) => value === values.city).shortValue;

  const birth_date = values.birth_date
    .split(" ")
    .reverse()
    .map((item) => {
      if (!Number(item)) {
        const monthIndex = monthNamesV2.findIndex((m) => m.value === item) + 1;
        return String(monthIndex).length === 1 ? "0" + monthIndex : monthIndex;
      }
      return item;
    })
    .join("-");

  const savedEmail = email || localStorage.getItem("new_user_email");
  if (lastUrl) history.push(lastUrl);
  return { ...values, gender, birth_date, city, email: savedEmail };
};
