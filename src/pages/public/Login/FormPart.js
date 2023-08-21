import React, { useState } from "react";
import styles from "./Login.module.scss";
import { Formik } from "formik";

import { initialValues, validate } from "./initForm";
import TextField from "../../../components/Inputs/TextField";
import Button from "../../../components/Button";
import { EyeIcon, EyeOffIcon } from "../../../components/EyeIconSet";

const FormPart = ({ onLoginSubmit, forgotPassword, step }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validate(values, step)}
      onSubmit={onLoginSubmit}
    >
      {({ handleSubmit, errors }) => {
        return (
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            {step === 0 ? (
              <div className={styles.inputContainerDiv}>
                <TextField
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                />
              </div>
            ) : (
              <div
                className={styles.inputContainerDiv}
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                <TextField
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                />
                {passwordVisible ? (
                  <EyeOffIcon
                    fillColor={errors?.password ? "tomato" : "white"}
                  />
                ) : (
                  <EyeIcon fillColor={errors?.password ? "tomato" : "white"} />
                )}
              </div>
            )}
            <div className={styles.buttons}>
              <Button
                type="submit"
                size="large"
                color={step === 0 ? "white" : "blue"}
              >
                {step === 0 ? "Next" : "Login"}
              </Button>
              {step === 1 && (
                <Button
                  onClick={forgotPassword}
                  type="button"
                  size="large"
                  color="transparent"
                >
                  Forgot password
                </Button>
              )}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default FormPart;
