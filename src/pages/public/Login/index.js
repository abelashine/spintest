import React, { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../actions/auth";
import { setCorrectUserInfo } from "./helpers"; // this function is for setting last account befor log out

import TopPart from "./TopPart";
import FormPart from "./FormPart";
import ResetPasswordModal from "../../../components/Modal/ResetPasswordModal";
import Footer from "../../../components/Footer";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.authReducer);
  const lastUrl = sessionStorage.getItem("lastUrl");
  const [passwordResetOpenModal, setPasswordResetOpenModal] = useState(false);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!step) {
      window.location.hash = "email";
    } else window.location.hash = "password";
  }, [step]);

  const onLoginSubmit = ({ email, password }, { setFieldError }) => {
    if (step === 0) {
      dispatch(authActions.preloginAsync(email, history, setStep));
      window.location.hash = "password";
    } else {
      if (lastUrl) history.push(lastUrl);
      dispatch(
        authActions.loginAsync(
          { email, password },
          history,
          setFieldError,
          setCorrectUserInfo
        )
      );
    }
  };

  const forgotPassword = () => {
    setPasswordResetOpenModal(true);
    dispatch(authActions.forgotPasswordAsync(email));
  };

  const toFirstLoginStep = () => setStep(0);
  return (
    <div className={styles.Login} data-steptwo={step}>
      <TopPart step={step} toFirstLoginStep={toFirstLoginStep} />
      <FormPart
        step={step}
        onLoginSubmit={onLoginSubmit}
        forgotPassword={forgotPassword}
      />
      {passwordResetOpenModal && (
        <ResetPasswordModal onClose={() => setPasswordResetOpenModal(false)} />
      )}
      <Footer />
    </div>
  );
};

export default Login;
