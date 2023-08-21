import React from "react";
import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { initialValues, validate } from "./initForm";

describe("SignUp", () => {
  it("render StepOne in SignUp", () => {
    const { getByText } = render(
      <Formik initialValues={initialValues}>
        <StepOne />
      </Formik>
    );
    expect(getByText(/Let's get started!/i)).toBeInTheDocument();
  });
  it("render StepTwo in SignUp", async () => {
    const validateFunc = jest.fn();
    const { container } = render(
      <Formik initialValues={initialValues} validate={validateFunc}>
        <StepTwo />
      </Formik>
    );
    const firstName = container.querySelector("input[name=first_name]");
    const lastName = container.querySelector("input[name=last_name]");
    const password = container.querySelector("input[name=password]");
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    await act(async () => {
      userEvent.type(firstName, "a");
    });
    expect(validateFunc).toBeCalled();
    await act(async () => {
      userEvent.type(lastName, "b");
    });
    expect(validateFunc).toBeCalled();
    await act(async () => {
      userEvent.type(password, "c");
    });
    expect(validateFunc).toBeCalled();
  });
  it("render StepThree in SignUp", async () => {
    const validateFunc = jest.fn();
    const { container, getByText, findByText, getByLabelText, getBy } = render(
      <Formik initialValues={initialValues} validate={validateFunc}>
        <StepThree />
      </Formik>
    );
    const birthDate = container.querySelector("input[name=birth_date]");
    const gender = container.querySelector("input[name=gender]");
    const city = container.querySelector("input[name=city]");
    expect(birthDate).toBeInTheDocument();
    expect(gender).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    await act(async () => {
      userEvent.type(gender, "b");
    });
    expect(validateFunc).toBeCalled();
    await act(async () => {
      userEvent.type(city, "c");
    });
    expect(validateFunc).toBeCalled();
  });
});

describe("initForm", () => {
  const values = initialValues;
  let errors;
  it("everything is empty", () => {
    errors = validate(values, []);
    expect(errors.image).toBe("Required");
    expect(errors.policy).toBe("Required");
    expect(errors.first_name).toBe("Required");
    expect(errors.last_name).toBe("Required");
    expect(errors.password).toBe("Required");
    expect(errors.birth_date).toBe("Required");
    expect(errors.gender).toBe("Required");
    expect(errors.city).toBe("Required");
  });
  it("check password", () => {
    values.password = "111 ";
    errors = validate(values, []);
    expect(errors.password).toBe("At least 6 symbols");
  });
  it("check birth date", () => {
    values.birth_date = " July";
    errors = validate(values, []);
    expect(errors.birth_date).toBe("Set all parts of date");

    values.birth_date = "00 July 2020";
    errors = validate(values, []);
    expect(errors.birth_date).toBe("Incorrect day value");

    values.birth_date = "01 Julcvgy 2020";
    errors = validate(values, []);
    expect(errors.birth_date).toBe("Incorrect month name");

    values.birth_date = "01 July 0";
    errors = validate(values, []);
    expect(errors.birth_date).toBe("Incorrect year");

    values.birth_date = "01 July 200";
    errors = validate(values, []);
    expect(errors.birth_date).toBe("Incorrect year's length");

    values.birth_date = "30 February 2000";
    errors = validate(values, []);
    expect(errors.birth_date).toBe("No 30 day in the month");

    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    values.birth_date = "01 July " + futureDate.getFullYear();
    errors = validate(values, []);
    expect(errors.birth_date).toBe("Future date is invalid");
  });
  it("check gender", () => {
    values.gender = "some incorrect gender";
    errors = validate(values, []);
    expect(errors.gender).toBe("Choose gender from the list");
  });
  it("check city", () => {
    values.city = "some incorrect city";
    errors = validate(values, []);
    expect(errors.city).toBe("Choose the city from the list");
  });
});
