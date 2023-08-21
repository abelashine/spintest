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
