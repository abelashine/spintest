import { monthNames } from "../../../../../static/data/dataForForms";

export const getTransactionTimeStamp = (timestamp) => {
  // we do such transformation, because Safary browser doesn't
  // use method '.toLocaleDateStrin()', like it is handled in Chrome, for example
  let dateParts;
  if (timestamp.includes("/")) {
    dateParts = timestamp.split("/");
    dateParts = [dateParts[1], dateParts[0], dateParts[2]];
  } else if (timestamp.includes("T")) {
    dateParts = timestamp.split("T")[0].split("-").reverse();
  } else {
    dateParts = new Date(timestamp).toLocaleDateString().split("/");
    dateParts = [dateParts[1], dateParts[0], dateParts[2]];
  }
  const monthName = monthNames.find((m) => m.value === +dateParts[1] - 1).name;
  return `${dateParts[0]} ${monthName} ${dateParts[2]}`;
};

export const getMemoryTimestamp = (timestamp) => {
  const dateParts = timestamp.split(" ")[0].split("-");
  const monthName = monthNames.find((m) => m.value === +dateParts[1] - 1).name;
  return `${dateParts[2]} ${monthName} ${dateParts[0]}`;
};

export const getTransactionsToRender = (
  transactionsHistory,
  params,
  productInfo
) => {
  if (!params.slug) {
    return transactionsHistory;
  }
  if (productInfo.for_rent) {
    const posterTransactionIndex = transactionsHistory.findIndex(
      (tr) => tr.slug === productInfo.poster.slug
    );
    const filteredTransactions =
      posterTransactionIndex >= 0
        ? transactionsHistory.slice(0, posterTransactionIndex + 1)
        : transactionsHistory;
    return filteredTransactions;
  } else {
    let posterTransactionIndex = null;
    for (let i = transactionsHistory.length - 1; i >= 0; i--) {
      if (transactionsHistory[i].slug === productInfo.poster.slug) {
        posterTransactionIndex = i;
        break;
      }
    }
    const filteredTransactions =
      posterTransactionIndex !== null
        ? transactionsHistory.slice(0, posterTransactionIndex + 1)
        : transactionsHistory;
    return filteredTransactions;
  }
};
