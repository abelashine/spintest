export const isValidEmail = (email) => {
  const arrOfParts = email.split("@");
  if (arrOfParts.length < 2) return false;
  const firstPartReg = /^\w+([.-]?\w+)*/;
  const secondPartReg = /\w+([.-]?\w+)*(\.\w{2,9})+$/;
  const isFirstCorrect = firstPartReg.test(arrOfParts[0]);
  const isSecondCorrect = secondPartReg.test(arrOfParts[1]);
  return isFirstCorrect && isSecondCorrect;
};

export const validateHashtag = (incomingString) => {
  let string = "";
  let prevStringValue = incomingString;
  if (!Number.isNaN(parseInt(incomingString))) {
    const firstNumSymbolsLength = String(parseInt(incomingString)).length;
    prevStringValue = prevStringValue.slice(firstNumSymbolsLength);
  }
  const regex1 = /[a-zA-Z_]/;
  const regex2 = /[a-zA-Z_0-9]/;
  for (let i = 0; i < prevStringValue.length; i++) {
    const isCorrect =
      i === 0
        ? regex1.test(prevStringValue[i])
        : regex2.test(prevStringValue[i]);
    string = isCorrect ? string + prevStringValue[i] : string + "";
  }
  return string;
};

export const validateFormikComponentNumber = (
  values,
  prop,
  maximumIntegerAllowed = 16
) => {
  values[prop] = String(values[prop]);
  const priceStringArr = Array.from(values[prop]);

  if (priceStringArr.length > maximumIntegerAllowed)
    priceStringArr.splice(maximumIntegerAllowed, priceStringArr.length);
  for (let i = 0; i < priceStringArr.length; i++) {
    if (priceStringArr[i] === " ") priceStringArr.splice(i);
    if (
      priceStringArr[i] == "0" &&
      i == 0 &&
      (priceStringArr[i + 1] == "0" ||
        (priceStringArr[i + 1] && priceStringArr[i + 1] != "."))
    )
      priceStringArr.splice(i, 1);
    if (priceStringArr[i] === ".") {
      if (i === 0) priceStringArr.splice(0, 1);
      for (let idx = i + 1; idx < priceStringArr.length; idx++) {
        if (isNaN(priceStringArr[idx])) priceStringArr.splice(idx, 1);
        if (priceStringArr.length - idx > 2)
          priceStringArr.splice(idx, priceStringArr.length);
      }
      while (priceStringArr.indexOf(".") !== priceStringArr.lastIndexOf(".")) {
        priceStringArr.splice(priceStringArr.lastIndexOf("."), 1);
      }
    }
    if (isNaN(priceStringArr[i]) && priceStringArr[i] !== ".")
      priceStringArr.splice(i, 1);
  }
  values[prop] = priceStringArr.join("");
  if (isNaN(values[prop])) {
    // in case the user tries to paste bad stuff in the field
    values[prop] = "";
  }
};

export const validatePrice = (
  value,
  prop,
  zeroDecimalCurrencies,
  maximumIntegerAllowed = 16
) => {
  if (
    zeroDecimalCurrencies?.findIndex(
      (currency) => currency.currency === value.itemcurrency
    ) !== -1
  ) {
    value[prop] = value[prop]
      .split("")
      .filter((s) => ![",", "."].includes(s))
      .join("");
  }
};

export const validateNumber = (
  string,
  maximumIntegerAllowed = 16,
  noZeroValue = true
) => {
  let arr = Array.from(string);

  // splices code to be lesser than maximum allowed integer
  if (arr.length > maximumIntegerAllowed)
    arr.splice(maximumIntegerAllowed, arr.length);

  for (let i = 0; i < arr.length; i++) {
    // checks if user hits space, since isNaN considers space to be a number
    if (arr[i] === " ") arr.splice(i);
    if (arr[i] === ".") arr.splice(i);
    // checks if there aren't multiple zeros at first position
    if (arr[i] === "0" && i === 0) {
      if (noZeroValue) arr.splice(i);
      if (arr[i + 1] === "0") arr.splice(i, 1);
      if (arr[0] === "0" && arr.length > 1) arr.splice(0, 1);
    }
    if (isNaN(arr[i])) arr.splice(i, 1);
  }

  arr = arr.join("");
  if (isNaN(arr)) {
    // in case the user tries to paste bad stuff in the field
    arr = "";
  }

  return arr;
};

export const validatePercent = (value) => {
  let percentStr = "";
  const tempStr = value.slice(0, 2);
  for (let i = 0; i < tempStr.length; i++) {
    if (i === 0 && +tempStr[i] === 0) continue;
    if (+tempStr[i] || +tempStr[i] === 0) {
      percentStr += tempStr[i];
    }
  }
  return percentStr;
};

export const validateString = (string) => {
  let str = "";
  const isInvalidRegex = /[^\d\w.,-\s]/;
  for (let i = 0; i < string.length; i++) {
    if (isInvalidRegex.test(string[i])) {
      continue;
    } else str += string[i];
  }
  return str;
};

export const validateStringV2 = (str) => {
  let validStr = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") validStr += str[i];
  }
  return validStr.slice(0, 9);
};

export const validateDay = (str) => {
  let day = "";
  for (let i = 0; i <= 1; i++) {
    if (str[i] === " ") continue;
    if (Number(str[i]) || Number(str[i]) === 0) {
      if (i === 0 && +str[i] > 3) {
        continue;
      } else if (i === 1 && +str[0] === 3 && +str[i] > 1) {
        continue;
      } else day += str[i];
    }
  }
  return day;
};

export const validateYear = (str) => {
  let year = "";
  for (let i = 0; i <= 3; i++) {
    if (str[i] === " ") continue;
    if (Number(str[i]) || Number(str[i]) === 0) {
      year += str[i];
    }
  }
  return year;
};

export const replaseSpaceOnUnderScore = (string) => {
  let str = "";
  for (let i = 0; i < string.length; i++) {
    if (string[i] === " ") {
      str += "_";
    } else str += string[i];
  }
  return str;
};
