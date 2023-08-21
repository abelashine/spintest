import { monthNamesV2, gendersDataV3 } from "../../../static/data/dataForForms";

export const initialValues = {
  accounttype: "",
  profile: null,
  label: null,
  policy: false,

  category: "",
  profile_name: "",
  user_name: "",
  company_story: "",
  company_founding_date: "",
  city: "",

  company_name: "",
  tax_no: "",
  legal_address: "",
  postal_code: "",
  company_email: "",
  contact_person: "",
  phone_number: "",

  company_constitution: "",
};

export const validate = (values, cities) => {
  const {
    accounttype,
    profile,
    label,
    policy,
    category,
    profile_name,
    user_name,
    company_story,
    company_founding_date,
    city,
    company_name,
    tax_no,
    legal_address,
    postal_code,
    company_email,
    contact_person,
    phone_number,
    company_constitution,
  } = values;
  const errors = {};

  // step one
  console.log("step one validation business", values);
  if (!profile) {
    errors.profile = "Required";
  }
  if (!label) {
    errors.label = "Required";
  }
  if (!policy) {
    errors.policy = "Required";
  }
  if (!accounttype) {
    errors.accounttype = "Required";
  }

  // step two
  if (!category) {
    errors.category = "Required";
  } else values.category = category.trim();

  // step two
  if (!profile_name) {
    errors.profile_name = "Required";
  } else values.profile_name = profile_name.trim();

  if (!user_name) {
    errors.user_name = "Required";
  } else values.user_name = user_name.trim();

  if (!company_story) {
    errors.company_story = "Required";
  } else values.company_story = company_story.trim();




  if (!company_name) {
    errors.company_story = "Required";
  } else values.company_name = company_story.trim();


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
