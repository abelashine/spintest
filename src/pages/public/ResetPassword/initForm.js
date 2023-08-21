export const initialValues = {
  new_password: "",
  confirmPassword: "",
};

export const validate = ({ new_password, confirmPassword }) => {
  const errors = {};

  if (new_password.trim().length < 1) {
    errors.new_password = "too short password";
  }

  if (confirmPassword.trim().length > 0 && new_password !== confirmPassword) {
    errors.new_password = "invalid password";
    errors.confirmPassword = "invalid password";
  }

  return errors;
};
