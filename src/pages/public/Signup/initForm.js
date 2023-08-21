import { monthNamesV2, gendersDataV3 } from "../../../static/data/dataForForms";

export const initialValues = {
  first_name: "",
  last_name: "",
  password: "",
  image: null,
  birth_date: "",
  gender: "",
  city: "",
  policy: false,
};

export const validate = (values, cities) => {
  const {
    first_name,
    last_name,
    password,
    image,
    birth_date,
    gender,
    city,
    policy,
  } = values;
  const errors = {};

  // step one
  console.log("step one", values);
  if (!image) {
    errors.image = "Required";
  }
  if (!policy) {
    errors.policy = "Required";
  }

  // step two
  if (!first_name) {
    errors.first_name = "Required";
  } else values.first_name = first_name.trim();
  if (!last_name) {
    errors.last_name = "Required";
  } else values.last_name = last_name.trim();
  if (!password) {
    errors.password = "Required";
  } else {
    if (password.trim().length < 6) {
      errors.password = "At least 6 symbols";
    }
    values.password = password.trim();
  }

  // step three
  if (!birth_date.trim()) {
    errors.birth_date = "Required";
  } else if (birth_date.split(" ").includes("")) {
    errors.birth_date = "Set all parts of date";
  } else {
    const dateValue = birth_date.split(" ");
    const month = monthNamesV2.findIndex((m) => m.value === dateValue[1]);
    const date = new Date(+dateValue[2], month, +dateValue[0]);
    const monthNum = date.getMonth();
    const today = new Date();
    if (+dateValue[0] === 0) {
      errors.birth_date = "Incorrect day value";
    } else if (month === -1) {
      errors.birth_date = "Incorrect month name";
    } else if (dateValue[2][0] === "0") {
      errors.birth_date = "Incorrect year";
    } else if (dateValue[2].length < 4) {
      errors.birth_date = "Incorrect year's length";
    } else if (month !== monthNum) {
      errors.birth_date = `No ${dateValue[0]} day in the month`;
    } else if (date > today) {
      errors.birth_date = "Future date is invalid";
    }
  }
  if (!gender.trim()) {
    errors.gender = "Required";
    values.gender = "";
  } else {
    const isCorrectGender = gendersDataV3.find(
      (g) => g.value.toLowerCase() === gender.toLowerCase().trim()
    );
    if (!isCorrectGender) {
      errors.gender = "Choose gender from the list";
      values.gender = "";
    } else values.gender = isCorrectGender.value;
  }
  if (!city) {
    errors.city = "Required";
  } else {
    const isCorrect = cities.find((c) => c.name === city.trim());
    if (!isCorrect) {
      errors.city = "Choose the city from the list";
      values.city = "";
    } else values.city = isCorrect.name;
  }

  return errors;
};
