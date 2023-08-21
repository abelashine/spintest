import { isValidEmail } from "../../../utils/validations";

export const initialValues = {
  email: "",
  password: "",
};

export const validate = (values, step) => {
  const { email, password } = values;
  const errors = {};
  if (!isValidEmail(email)) {
    errors.email = "Invalid email";
  }
  if (!password.trim() && step) {
    errors.password = "Required";
    values.password = "";
  }
  return errors;
};
