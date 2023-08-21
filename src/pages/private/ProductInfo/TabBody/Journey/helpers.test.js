import { getTransactionTimeStamp, getMemoryTimestamp } from "./helpers";

describe("getTransactionTimeStamp", () => {
  it("when date in format through slash", () => {
    const formatedDate = getTransactionTimeStamp("01/28/2022");
    expect(formatedDate).toBe("28 January 2022");
  });
  it("when date in ISO string format", () => {
    const formatedDate = getTransactionTimeStamp("2022-02-04T14:23:39.126Z");
    expect(formatedDate).toBe("04 February 2022");
  });
});

test("getMemoryTimestamp", () => {
  const formattedDate = getMemoryTimestamp("2022-02-04 14:29:23.973115+00:00");
  expect(formattedDate).toBe("04 February 2022");
});
