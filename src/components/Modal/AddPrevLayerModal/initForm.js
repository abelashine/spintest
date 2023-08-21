import { monthNames } from "../../../static/data/dataForForms";

export const initialValues = {
  prevlayeravatar: null,
  prevlayerusername: "",
  cityoftransaction: "",
  transactiondate: ["", "", ""],
  monthName: "",
  memoryphoto: "",
  title: "",
  description: "",
  location: "",
  hashtagfield: "",
  hashtags: [],
};

export const validate = (values, prevLayers, cities, locationCities) => {
  const {
    prevlayerusername,
    cityoftransaction,
    transactiondate,
    monthName,
    memoryphoto,
    title,
    description,
    location,
  } = values;
  const errors = {};
  if (!prevlayerusername) errors.prevlayerusername = "Empty username";
  if (!cityoftransaction.trim()) {
    errors.cityoftransaction = "Empty city of transaction";
    values.cityoftransaction = ""
  } else {
    const isCorrectAddress = cities.find(
      (data) => data.value === cityoftransaction
    );
    if (!isCorrectAddress) {
      errors.cityoftransaction = "You have to choose an existing address";
      values.cityoftransaction = "";
    }
  }

  const dateErrors = [];
  transactiondate.forEach((item, index) => {
    if (item === "") {
      dateErrors[index] = "Empty field";
      errors.transactiondate = dateErrors;
    }
  });

  // here we check if layer was chosen correctly
  const gottenLayer = prevLayers.find(
    (layer) => layer.slug === prevlayerusername
  );
  if (!gottenLayer && prevlayerusername) {
    errors.prevlayerusername = "You have to choose an existing layer";
    values.prevlayerusername = "";
  }

  // here we check if user choose an incorrect day in day field (date parts are put in array)
  if (transactiondate[2] >= 29 && transactiondate[1] && transactiondate[0]) {
    const chosenDate = new Date(...transactiondate);
    const monthNum = chosenDate.getMonth();
    if (+transactiondate[1] !== monthNum) {
      dateErrors[2] = `There is no ${transactiondate[2]} day in this month of ${transactiondate[0]}`;
      errors.transactiondate = dateErrors;
      values.transactiondate[2] = "";
    }
  }

  // check if correct month
  if (!monthName) {
    errors.monthName = "Empty field";
  } else {
    const isCorrectMonth = monthNames.find(
      (m) => m.name.toLocaleLowerCase() === monthName.toLocaleLowerCase().trim()
    );
    if (!isCorrectMonth) {
      errors.monthName = "Incorrect month";
      values.monthName = "";
    } else {
      values.transactiondate[1] = String(isCorrectMonth.value);
    }
  }

  // he we check if user choose future date
  if (transactiondate[2] && transactiondate[1] && transactiondate[0]) {
    const chosenDate = new Date(...transactiondate);
    const nowDate = new Date();
    if (chosenDate > nowDate) {
      const chosenYear = chosenDate.getFullYear();
      const chosenMonth = chosenDate.getMonth();
      const chosenDay = chosenDate.getDate();
      const nowYear = nowDate.getFullYear();
      const nowMonth = nowDate.getMonth();
      const nowDay = nowDate.getDate();
      if (nowYear < chosenYear) {
        dateErrors[0] = "You can't choose a future year";
        errors.transactiondate = dateErrors;
        values.transactiondate[0] = "";
      } else if (nowMonth < chosenMonth) {
        values.monthName = "";
        values.transactiondate[1] = "";
        errors.monthName = "You can't choose a future month";
      } else if (nowDay < chosenDay) {
        dateErrors[2] = "You can't choose a future day";
        errors.transactiondate = dateErrors;
        values.transactiondate[2] = "";
      }
    }
  }

  if (memoryphoto || location.trim()) {
    if (!memoryphoto) {
      errors.memoryphoto = "No image";
      values.memoryphoto = "";
    }
    if (!location.trim()) {
      errors.location = "Empty location";
      values.location = "";
    } else {
      const isCorrectAddress = locationCities.find(
        (data) => data.value === location.trim()
      );
      if (!isCorrectAddress) {
        errors.location = "You have to choose an existing address";
        values.location = "";
      }
    }
  }


  return errors;
};
