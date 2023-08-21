import {
  isValidEmail,
  validateHashtag,
  validateFormikComponentNumber,
  validatePrice,
  validateNumber,
  validatePercent,
  validateString,
  validateStringV2,
  validateDay,
  validateYear,
  replaseSpaceOnUnderScore,
} from "./validations";

test("isValidEmail", () => {
  const isValidValueOne = isValidEmail("test");
  expect(isValidValueOne).toBeFalsy();
  const isValidValueTwo = isValidEmail("test@");
  expect(isValidValueTwo).toBeFalsy();
  const isValidValueThree = isValidEmail("@test@");
  expect(isValidValueThree).toBeFalsy();
  const isValidValueFour = isValidEmail("test@test");
  expect(isValidValueFour).toBeFalsy();
  const isValidValueFive = isValidEmail("te'^&()st@test");
  expect(isValidValueFive).toBeFalsy();

  const isValidValueSix = isValidEmail("test@test.pro");
  expect(isValidValueSix).toBeTruthy();
  const isValidValueSeven = isValidEmail("test@test.gmail");
  expect(isValidValueSeven).toBeTruthy();
  const isValidValueEight = isValidEmail("test@test.gmail.com");
  expect(isValidValueEight).toBeTruthy();
  const isValidValueNine = isValidEmail("12.test@test.gmail.com");
  expect(isValidValueNine).toBeTruthy();
});

test("validateHashtag", () => {
  const hashTagOne = validateHashtag("123gh");
  expect(hashTagOne).toBe("gh");

  const hashTagTwo = validateHashtag("123");
  expect(hashTagTwo).toBe("");

  const hashTagThree = validateHashtag("dfg123");
  expect(hashTagThree).toBe("dfg123");

  const hashTagFour = validateHashtag("_dfg123");
  expect(hashTagFour).toBe("_dfg123");

  const hashTagFive = validateHashtag("_dfg_123_");
  expect(hashTagFive).toBe("_dfg_123_");

  const hashTagSix = validateHashtag("123_");
  expect(hashTagSix).toBe("_");
});

test("validateFormikComponentNumber", () => {
  const valuesOne = {
    value: "123",
  };
  validateFormikComponentNumber(valuesOne, "value");
  expect(valuesOne.value).toBe("123");

  const valuesTwo = {
    value: "123.45",
  };
  validateFormikComponentNumber(valuesTwo, "value");
  expect(valuesTwo.value).toBe("123.45");

  const valuesThree = {
    value: "dfg123.45",
  };
  validateFormikComponentNumber(valuesThree, "value");
  expect(valuesTwo.value).toBe("123.45");

  const valuesFour = {
    value: "123.45sdfg",
  };
  validateFormikComponentNumber(valuesFour, "value");
  expect(valuesFour.value).toBe("123.");

  const valuesFive = {
    value: "123.dfg45",
  };
  validateFormikComponentNumber(valuesFive, "value");
  expect(valuesFive.value).toBe("123.");

  const valuesSix = {
    value: "123.45345235423452345345345",
  };
  validateFormikComponentNumber(valuesSix, "value");
  expect(valuesSix.value).toBe("123.");

  const valuesSeven = {
    value: "12345345235423452345345345",
  };
  validateFormikComponentNumber(valuesSeven, "value");
  expect(valuesSeven.value).toBe("1234534523542345");

  const valuesEight = {
    value: "12345345235423452345345345",
  };
  validateFormikComponentNumber(valuesEight, "value", 27);
  expect(valuesEight.value).toBe("12345345235423452345345345");

  const valuesNine = {
    value: "a",
  };
  validateFormikComponentNumber(valuesNine, "value");
  expect(valuesNine.value).toBe("");

  const valuesTen = {
    value: "123.12.4",
  };
  validateFormikComponentNumber(valuesTen, "value");
  expect(valuesTen.value).toBe("123.");
});

test("validatePrice", async () => {
  const zeroDecimaCurrencies = [
    { currency: "CLP", symbol: "$", id: 33 },
    { currency: "PYG", symbol: "₲", id: 119 },
    { currency: "DJF", symbol: "Fdj", id: 45 },
  ];
  const valuesOne = {
    value: "12.3",
    itemcurrency: "CLP",
  };
  validatePrice(valuesOne, "value", zeroDecimaCurrencies);
  expect(valuesOne.value).toBe("123");

  const valuesTwo = {
    value: "12.3",
    itemcurrency: "somenovalid",
  };
  validatePrice(valuesTwo, "value", zeroDecimaCurrencies);
  expect(valuesTwo.value).toBe("12.3");

  const valuesThree = {
    value: "12,3",
    itemcurrency: "CLP",
  };
  validatePrice(valuesThree, "value", zeroDecimaCurrencies);
  expect(valuesThree.value).toBe("123");
});

test("validateNumber", () => {
  const valueOne = validateNumber("123");
  expect(valueOne).toBe("123");

  const valueTwo = validateNumber("0");
  expect(valueTwo).toBe("");

  const valueThree = validateNumber("012");
  expect(valueThree).toBe("");

  const valueFour = validateNumber("1.2");
  expect(valueFour).toBe("1");

  const valueFive = validateNumber("1,2");
  expect(valueFive).toBe("12");

  const valueSix = validateNumber("0.2");
  expect(valueSix).toBe("");

  const valueSeven = validateNumber({});
  expect(valueSeven).toBe("");

  const valueEight = validateNumber("0", 10, false);
  expect(valueEight).toBe("0");

  const valueNine = validateNumber("012", 10, false);
  expect(valueNine).toBe("12");

  const valueTen = validateNumber("0.2", 10, false);
  expect(valueTen).toBe("2");
});

test("validatePercent", () => {
  const valueOne = validatePercent("we");
  expect(valueOne).toBe("");

  const valueTwo = validatePercent("10");
  expect(valueTwo).toBe("10");

  const valueThree = validatePercent("wer10");
  expect(valueThree).toBe("");

  const valueFour = validatePercent("10.2");
  expect(valueFour).toBe("10");

  const valueFive = validatePercent("0");
  expect(valueFive).toBe("");

  const valueSix = validatePercent("110");
  expect(valueSix).toBe("11");
});

test("validateString", () => {
  const valueOne = validateString("aaa");
  expect(valueOne).toBe("aaa");

  const valueTwo = validateString("AAA");
  expect(valueTwo).toBe("AAA");

  const valueThree = validateString("123");
  expect(valueThree).toBe("123");

  const valueFour = validateString("123aa");
  expect(valueFour).toBe("123aa");

  const valueFive = validateString("123 aa");
  expect(valueFive).toBe("123 aa");

  const valueSix = validateString("123-aa");
  expect(valueSix).toBe("123-aa");

  const valueSeven = validateString("123_aa");
  expect(valueSeven).toBe("123_aa");

  const valueEight = validateString("123_[]aa");
  expect(valueEight).toBe("123_aa");
});

test("validateStringV2", () => {
  const valueOne = validateStringV2("111");
  expect(valueOne).toBe("111");

  const valueTwo = validateStringV2("aaa");
  expect(valueTwo).toBe("aaa");

  const valueThree = validateStringV2("aaa11");
  expect(valueThree).toBe("aaa11");

  const valueFour = validateStringV2("aaa 11");
  expect(valueFour).toBe("aaa11");

  const valueFive = validateStringV2("1aaa1");
  expect(valueFive).toBe("1aaa1");

  const valueSix = validateStringV2("1a aa 1");
  expect(valueSix).toBe("1aaa1");
});

test("validateDay", () => {
  const valueOne = validateDay("we");
  expect(valueOne).toBe("");

  const valueTwo = validateDay("1");
  expect(valueTwo).toBe("1");

  const valueThree = validateDay("01");
  expect(valueThree).toBe("01");

  const valueFour = validateDay("101");
  expect(valueFour).toBe("10");

  const valueFive = validateDay("51");
  expect(valueFive).toBe("1");

  const valueSix = validateDay("31");
  expect(valueSix).toBe("31");

  const valueSeven = validateDay("32");
  expect(valueSeven).toBe("3");

  const valueEight = validateDay("56");
  expect(valueEight).toBe("6");
});

test("validateYear", () => {
  const valueOne = validateYear("asf");
  expect(valueOne).toBe("");

  const valueTwo = validateYear("1asf");
  expect(valueTwo).toBe("1");

  const valueThree = validateYear("12asf");
  expect(valueThree).toBe("12");

  const valueFour = validateYear("12222");
  expect(valueFour).toBe("1222");

  const valueFive = validateYear("sdaf12222");
  expect(valueFive).toBe("");

  const valueSix = validateYear("sd22");
  expect(valueSix).toBe("22");
});

test("replaseSpaceOnUnderScore", () => {
  const valueOne = replaseSpaceOnUnderScore("aa aa");
  expect(valueOne).toBe("aa_aa");
});
