import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

import { resetPassword } from "../../../api";
import { initialValues, validate } from "./initForm";
import { errorsActions } from "../../../actions/errors";
import { authActions } from "../../../actions/auth";
import { setCorrectUserInfo } from "../Login/helpers";
import TextField from "../../../components/Inputs/TextField";
import Button from "../../../components/Button";
import { EyeIcon, EyeOffIcon } from "../../../components/EyeIconSet";
import styles from "./ResetPassword.module.scss";

const ResetPassword = ({ location: { search } }) => {
  const dispatch = useDispatch();
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const params = new URLSearchParams(search);
  const email = params.get("email");
  const token = params.get("token");
  const history = useHistory();

  const submitResetPassword = ({ new_password }, { setFieldError }) => {
    resetPassword({
      email,
      token,
      new_password,
    })
      .then(() => {
        dispatch(
          authActions.loginAsync(
            { email, password: new_password },
            history,
            setFieldError,
            setCorrectUserInfo
          )
        );
      })
      .catch(() => {
        history.push("/login");
        dispatch(
          errorsActions.showErrorRequestModal("Failed to change the password")
        );
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitResetPassword}
    >
      {({ handleSubmit, errors }) => (
        <div className={styles.ResetPassword}>
          <form
            className={styles.loginForm}
            onSubmit={handleSubmit}
            autoComplete="new-password"
          >
            <h2>Enter new password</h2>
            <div
              className={styles.inputContainerDiv}
              onClick={() => setNewPasswordVisible((prev) => !prev)}
            >
              <TextField
                name="new_password"
                type={newPasswordVisible ? "text" : "password"}
                label="Password"
                variant="outlined"
              />
              {newPasswordVisible ? (
                <EyeOffIcon
                  fillColor={errors?.new_password ? "tomato" : "white"}
                />
              ) : (
                <EyeIcon
                  fillColor={errors?.new_password ? "tomato" : "white"}
                />
              )}
            </div>
            <div
              className={styles.inputContainerDiv}
              onClick={() =>
                setConfirmPasswordVisible((prevState) => !prevState)
              }
            >
              <TextField
                name="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                label="Re-enter password"
                variant="outlined"
              />
              {confirmPasswordVisible ? (
                <EyeOffIcon
                  fillColor={errors?.confirmPassword ? "tomato" : "white"}
                />
              ) : (
                <EyeIcon
                  fillColor={errors?.confirmPassword ? "tomato" : "white"}
                />
              )}
            </div>
            <div className={styles.buttons}>
              <Button type="submit" size="large" color="blue">
                Change password
              </Button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default ResetPassword;
