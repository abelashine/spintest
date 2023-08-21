import { getDateFormat } from "./helpers";

test("get formatted date", () => {
  const formattedDate = getDateFormat(new Date(2023, 1, 1));
  expect(formattedDate).toBe("Expires 01 FEBRUARY 2023");
});
