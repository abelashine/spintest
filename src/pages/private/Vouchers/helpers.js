import { monthNames } from "../../../static/data/dataForForms";

export const getDateFormat = (date) => {
  let dateString = "Expires ";
  const incomingDate = new Date(date);
  const tempStr = incomingDate.getDate();
  if (String(tempStr).length === 1) {
    dateString += "0" + tempStr;
  } else dateString += tempStr;
  const monthName = monthNames
    .find((m) => m.value === incomingDate.getMonth())
    .name.toUpperCase();
  dateString += " " + monthName + " " + incomingDate.getFullYear();
  return dateString;
};
