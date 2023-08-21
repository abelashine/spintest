import { validateDate } from "./helpers";
import { isValidEmail } from "../../../utils/validations";
import { gendersDataV2 } from "../../../static/data/dataForForms";
import { setDatetoText } from "./helpers"

const initialGender = (gender) => {
  const genderName = gendersDataV2.find((g) => gender === g.id)?.name;
  return genderName || "";
};

export const initialValues = (userInfo) => ({
  avatar: null,
  slug: userInfo.slug,
  name: userInfo.name,
  city: userInfo.city && userInfo.city.name ? userInfo.city.name : "",
  first_name:
    userInfo.profile && userInfo.profile.first_name
      ? userInfo.profile.first_name
      : userInfo.name,
  last_name:
    userInfo.profile && userInfo.profile.last_name
      ? userInfo.profile.last_name
      : "",
  gender:
    userInfo.profile && userInfo.profile.gender
      ? initialGender(userInfo.profile.gender)
      : "",
  birth_date:
    userInfo.profile && userInfo.profile.birth_date
      ? setDatetoText(userInfo.profile.birth_date)
      : "",
  email:
    (userInfo.profile && userInfo.profile.email) ||
    (userInfo.brand && userInfo.brand.company.billing_email) ||
    "",
});

export const validate = (values, cities, defaultCity, type) => {
  const {
    name,
    city,
    first_name,
    last_name,
    birth_date,
    email,
    gender,
  } = values;
  const errors = {};

  if (!name.trim()) {
    errors.name = "";
    values.name = "";
  } else {
    values.name = name.trim();
  }

  if (!city.trim()) {
    errors.city = "City";
    values.city = "";
  } else if (city.trim() && !defaultCity) {
    const isCorrectCity = cities.find((c) => c.name === city.trim());
    if (!isCorrectCity) {
      errors.city = "Chose city from the list";
      values.city = city.trim();
    } else {
      values.city = city.trim();
    }
  } else {
    values.city = city.trim();
  }

  if (type === "profile") {
    if (!first_name.trim()) {
      errors.first_name = "";
      values.first_name = "";
    } else {
      values.first_name = first_name.trim();
    }

    if (!last_name.trim()) {
      errors.last_name = "";
      values.last_name = "";
    } else {
      values.last_name = last_name.trim();
    }

    if (birth_date === "__.__.____" || birth_date === "") {
      errors.birth_date = "Birthdate";
    } else {
      validateDate("birth_date", values, errors);
    }
  }

  if (!email.trim()) {
    errors.email = "";
  } else if (email.trim() && !isValidEmail(email.trim())) {
    errors.email = "Invalid email";
    values.email = email.trim();
  } else {
    values.email = email.trim();
  }
  if (!gender && type === "profile") {
    errors.gender = "Gender";
  }

  return errors;
};
