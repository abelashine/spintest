import { validateNumber } from "../../../../utils/validations";

export const initialValues = {
  avatar: null,
  username: "",
  royaltiesFee: 0,
};

export const validate = (props, availablePercentage) => {
  const errors = {};
  if (!props.username) errors.username = "Empty username";
  if (!props.royaltiesFee) errors.royaltiesFee = "Empty percentage";
  if (parseInt(props.royaltiesFee) > availablePercentage) errors.royaltiesFee = "Invalid percentage";

  return errors;
};
