import { YEAR_LENGTH_LIMIT } from "../../../static/data/dataForForms";

export const validateFields = (values) => {
  // here we check if day is correct
  if (values.transactiondate[2].includes(" "))
    values.transactiondate[2] = values.transactiondate[2].replace(" ", "");
  if (values.transactiondate[2].length > 2)
    values.transactiondate[2] = values.transactiondate[2].slice(0, 2);
  if (
    values.transactiondate[2].length === 1 &&
    !Number(values.transactiondate[2])
  )
    values.transactiondate[2] = "";
  if (
    values.transactiondate[2].length === 2 &&
    !Number(values.transactiondate[2])
  )
    values.transactiondate[2] =
      String(parseFloat(values.transactiondate[2])) || "";
  if (
    values.transactiondate[2].length === 2 &&
    Number(values.transactiondate[2][0]) > 3
  )
    values.transactiondate[2] = String(values.transactiondate[2].slice(0, 1));
  if (
    Number(values.transactiondate[2][0]) === 3 &&
    Number(values.transactiondate[2][1]) > 1
  )
    values.transactiondate[2] = String(values.transactiondate[2].slice(0, 1));
  if (values.transactiondate[2] && !Number(values.transactiondate[2])) {
    const isNan = Number.isNaN(parseInt(values.transactiondate[2]));
    values.transactiondate[2] = isNan
      ? ""
      : String(parseInt(values.transactiondate[2]));
  }

  // here we check year field
  if (values.transactiondate[0].includes(" "))
    values.transactiondate[0] = values.transactiondate[0].replace(" ", "");
  if (values.transactiondate[0].length > YEAR_LENGTH_LIMIT)
    values.transactiondate[0] = values.transactiondate[0].replace(
      values.transactiondate[0][values.transactiondate[0].length - 1],
      ""
    );
  if (values.transactiondate[0] && !Number(values.transactiondate[0])) {
    const isNan = Number.isNaN(parseInt(values.transactiondate[0]));
    values.transactiondate[0] = isNan
      ? ""
      : String(parseInt(values.transactiondate[0]));
  }
};
