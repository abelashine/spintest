export const startValues = (
  field,
  setDay,
  setDayToSave,
  setMonth,
  setMonthToSave,
  setYear,
  setYearToSave,
  setFieldNum,
  setFocusMem
) => {
  if (!field.value) return;
  const splittedVal = field.value.split(" ");
  setDay(splittedVal[0]);
  setDayToSave(splittedVal[0]);
  setMonth(splittedVal[1]);
  setMonthToSave(splittedVal[1]);
  setYear(splittedVal[2]);
  setYearToSave(splittedVal[2]);
  if (splittedVal[0] && !splittedVal[1]) {
    setFieldNum(2);
    setFocusMem((prev) => [...prev, 2]);
  } else if (splittedVal[0] && splittedVal[1] && !splittedVal[2]) {
    setFieldNum(3);
    setFocusMem((prev) => [...prev, 2, 3]);
  }
};

export const saveData = (
  openCloseFields,
  dayToSave,
  monthToSave,
  yearToSave,
  helpers
) => {
  openCloseFields();
  const dayValue =
    +dayToSave < 9 && dayToSave.length === 1 ? "0" + dayToSave : dayToSave;
  const value = `${dayValue} ${monthToSave} ${yearToSave}`;
  helpers.setValue(value);
};
