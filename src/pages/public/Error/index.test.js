import React from "react";
import { renderWrapper } from "../../../tests-utils";

import Error from "./index";

describe("Error page", () => {
  it("render Error", () => {
    const { getByText } = renderWrapper(<Error />, history);
    const spanLink = getByText(/Go back to SPIN/i);
    expect(spanLink).toBeInTheDocument();
  });
});
