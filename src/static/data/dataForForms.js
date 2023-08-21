const getDaysInMonth = () => {
  return new Array(31).fill(null).map((item, index) => ({ value: index + 1 }));
};
export const daysInMonth = getDaysInMonth();

const getDaysInMonthV2 = () => {
  return new Array(31).fill(null).map((item, index) => {
    const dayNum = String(index + 1);
    const day = dayNum.length < 2 ? "0" + dayNum : dayNum;
    return { value: day };
  });
};
export const daysInMonthV2 = getDaysInMonthV2();

export const monthNames = [
  { name: "January", value: 0 },
  { name: "February", value: 1 },
  { name: "March", value: 2 },
  { name: "April", value: 3 },
  { name: "May", value: 4 },
  { name: "June", value: 5 },
  { name: "July", value: 6 },
  { name: "August", value: 7 },
  { name: "September", value: 8 },
  { name: "October", value: 9 },
  { name: "November", value: 10 },
  { name: "December", value: 11 },
];
export const monthNamesV2 = monthNames.map((m) => ({ value: m.name }));

const getYearsArray = (toback) => {
  const LIMIT_TO_PREVIOUS_YEARS = 120;
  const presentYear = new Date().getFullYear();
  const startYear = toback
    ? presentYear - LIMIT_TO_PREVIOUS_YEARS
    : presentYear + LIMIT_TO_PREVIOUS_YEARS;
  const arr = [];
  if (toback) {
    for (let i = presentYear; i > startYear; i--) {
      arr.push({ value: String(i) });
    }
  } else {
    for (let i = presentYear; i < startYear; i++) {
      arr.push({ value: String(i) });
    }
  }
  return arr;
};
export const oneHundredAndTwentyYears = getYearsArray(true);
export const oneHundredAndTwentyYearsForward = getYearsArray(false);

export const gendersData = [
  { name: "FEMALE", value: "FEMALE", id: "F" },
  { name: "MALE", value: "MALE", id: "M" },
  { name: "UNISEX", value: "UNISEX", id: "N" },
];

export const gendersDataV2 = [
  { name: "FEMALE", value: "FEMALE", id: "F" },
  { name: "MALE", value: "MALE", id: "M" },
  { name: "OTHER", value: "OTHER", id: "N" },
  { name: "AGENDER", value: "AGENDER", id: "AG" },
  { name: "ANDROGYNE", value: "ANDROGYNE", id: "AND" },
  { name: "ANDROGYNOUS", value: "ANDROGYNOUS", id: "ANDG" },
  { name: "BIGENDER", value: "BIGENDER", id: "BI" },
  { name: "CIS", value: "CIS", id: "CIS" },
  { name: "CISGENDER", value: "CISGENDER", id: "CISG" },
  { name: "CIS FEMALE", value: "CIS FEMALE", id: "CISFE" },
  { name: "CIS MALE", value: "CIS MALE", id: "CISMA" },
  { name: "CIS MAN", value: "CIS MAN", id: "CISM" },
  { name: "CIS WOMAN", value: "CIS WOMAN", id: "CISW" },
  { name: "CISGENDER FEMALE", value: "CISGENDER FEMALE", id: "CISGFE" },
  { name: "CISGENDER MALE", value: "CISGENDER MALE", id: "CISGMA" },
  { name: "CISGENDER MAN", value: "CISGENDER MAN", id: "CISGM" },
  { name: "CISGENDER WOMAN", value: "CISGENDER WOMAN", id: "CISGW" },
  { name: "FEMALE TO MALE", value: "FEMALE TO MALE", id: "FTOM" },
  { name: "FTM", value: "FTM", id: "FTM" },
  { name: "GENDER FLUID", value: "GENDER FLUID", id: "GF" },
  { name: "GENDER NONCONFORIMNG", value: "GENDER NONCONFORIMNG", id: "GN" },
  { name: "GENDER QUESTIONING", value: "GENDER QUESTIONING", id: "GQ" },
  { name: "GENDER VARIANT", value: "GENDER VARIANT", id: "GV" },
  { name: "GENDERQUEER", value: "GENDERQUEER", id: "GQR" },
  { name: "INTERSEX", value: "INTERSEX", id: "IS" },
  { name: "MALE TO FEMALE", value: "MALE TO FEMALE", id: "MTOF" },
  { name: "MTF", value: "MTF", id: "MTF" },
  { name: "NEITHER", value: "NEITHER", id: "NEI" },
  { name: "NEUTROIS", value: "NEUTROIS", id: "NEU" },
  { name: "NON-BINARY", value: "NON-BINARY", id: "NON" },
  { name: "PANGENDER", value: "PANGENDER", id: "PAN" },
  { name: "TRANS", value: "TRANS", id: "T" },
  { name: "TRANS*", value: "TRANS*", id: "T*" },
  { name: "TRANS FEMALE", value: "TRANS FEMALE", id: "TSFE" },
  { name: "TRANS* FEMALE", value: "TRANS* FEMALE", id: "TS*FE" },
  { name: "TRANS MALE", value: "TRANS MALE", id: "TSMA" },
  { name: "TRANS* MALE", value: "TRANS* MALE", id: "TS*MA" },
  { name: "TRANS MAN", value: "TRANS MAN", id: "TSM" },
  { name: "TRANS* MAN", value: "TRANS* MAN", id: "TS*M" },
  { name: "TRANS PERSON", value: "TRANS PERSON", id: "TSP" },
  { name: "TRANS* PERSON", value: "TRANS* PERSON", id: "TS*P" },
  { name: "TRANS WOMAN", value: "TRANS WOMAN", id: "TSW" },
  { name: "TRANS* WOMAN", value: "TRANS* WOMAN", id: "TS*W" },
  { name: "TRANSFEMININE", value: "TRANSFEMININE", id: "TF" },
  { name: "TRANSGENDER", value: "TRANSGENDER", id: "TG" },
  { name: "TRANSGENDER FEMALE", value: "TRANSGENDER FEMALE", id: "TGFE" },
  { name: "TRANSGENDER MALE", value: "TRANSGENDER MALE", id: "TGMA" },
  { name: "TRANSGENDER MAN", value: "TRANSGENDER MAN", id: "TGM" },
  { name: "TRANSGENDER PERSON", value: "TRANSGENDER PERSON", id: "TGP" },
  { name: "TRANSGENDER WOMAN", value: "TRANSGENDER WOMAN", id: "TGW" },
  { name: "TRANSMASCULINE", value: "TRANSMASCULINE", id: "TSMS" },
  { name: "TRANSSEXUAL", value: "TRANSSEXUAL", id: "TSS" },
  { name: "TRANSSEXUAL FEMALE", value: "TRANSSEXUAL FEMALE", id: "TSSFE" },
  { name: "TRANSSEXUAL MALE", value: "TRANSSEXUAL MALE", id: "TSSMA" },
  { name: "TRANSSEXUAL MAN", value: "TRANSSEXUAL MAN", id: "TSSM" },
  { name: "TRANSSEXUAL PERSON", value: "TRANSSEXUAL PERSON", id: "TSSP" },
  { name: "TRANSSEXUAL WOMAN", value: "TRANSSEXUAL WOMAN", id: "TSSW" },
  { name: "TWO-SPIRIT", value: "TWO-SPIRIT", id: "TWOSP" },
];
export const gendersDataV3 = gendersDataV2.map((g) => {
  g.value = g.value[0] + g.value.slice(1).toLowerCase();
  g.name = g.name[0] + g.value.slice(1).toLowerCase();
  return g;
});

export const getQuantity = (defaultQuantity = 100) =>
  new Array(defaultQuantity).fill(null).map((item, index) => ({
    value: String(index + 1),
    name: String(index + 1),
  }));

export const quantity = getQuantity();

export const statusesData = [
  { value: "New", name: "New" },
  { value: "Secondhand", name: "Secondhand" },
];

export const shippingCosts = [
  { name: "Receiver will pay", value: "Receiver will pay" },
  { name: "I will pay", value: "I will pay" },
];

export const YEAR_LENGTH_LIMIT = 6;

export const periodsOptions = [
  { id: "Days", name: "Days", description: "Days" },
  { id: "Weeks", name: "Weeks", description: "Weeks" },
  { id: "Months", name: "Months", description: "Months" },
];
const getPeriodsData = (periodsOptions) => {
  const data = periodsOptions.map((periodName) => {
    const newObj = {};
    newObj.type = periodName.id;
    let times;
    if (periodName.name === "Days") {
      times = 6;
    } else if (periodName.name === "Weeks") {
      times = 3;
    } else if (periodName.name === "Months") {
      times = 12;
    }
    const timesArr = [];
    for (let i = 0; i < times; i++) {
      let val = "";
      if (i < 9) {
        val = "0" + (i + 1);
      } else val = String(i + 1);
      timesArr.push({ id: val, name: val, description: val });
    }
    newObj.nums = timesArr;
    return newObj;
  });
  return data;
};
export const periodsValues = getPeriodsData(periodsOptions);

export const businessAccountTypes = [
  { value: "Farm" },
  { value: "Mill" },
  { value: "Manufacturer" },
  { value: "Brand" },
  { value: "Retailer" },
  { value: "Reseller" },
  { value: "Media" },
  { value: "Creator" },
  { value: "Stylist" },
  { value: "Founder" },
  { value: "Designer" },
  { value: "Influencer" },
  { value: "Artist" },
  { value: "Architect" },
  { value: "Collector" },
  { value: "Recycler" },
  { value: "Tech" },
  { value: "Logistics" },
  { value: "Group" },
  { value: "Government" },
];

export const accountTypes = [{ value: "company" }, { value: "individual" }];
