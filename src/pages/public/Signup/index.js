import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import styles from "./Signup.module.scss";
import { authActions } from "../../../actions/auth";
import { initialValues, validate } from "./initForm";
import { getDataToRequest } from "./helpers";
import routes from "../../../routes";

import WizardForm from "../../../components/WizardForm";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Header from "./Header";
import MainButton from "./MainButton";

export default () => {
  const { email } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [newUserEmail, setNewUserEmail] = useState(true);
  const [cities, setCities] = useState([]);
  const [step, setStep] = useState(0);
  const history = useHistory();
  useEffect(() => {
    setNewUserEmail(JSON.parse(localStorage.getItem("new_user_email")));
    return () => {
      localStorage.clear("new_user_email");
    };
  }, []);

  const onRegisterSubmit = (values) => {
    const resultValues = getDataToRequest(values, cities, history, email);
    dispatch(authActions.registerAsync(resultValues, history));
  };

  if (!newUserEmail) return <Redirect to={routes.prelogin} />;

  return (
    <div className={styles.Signup}>
      <Header step={step} setStep={setStep} />
      <WizardForm
        initialValues={initialValues}
        Button={() => <MainButton step={step} setStep={setStep} />}
        formClassName={styles.signupForm}
        step={step}
        onSubmit={onRegisterSubmit}
      >
        <StepOne validate={(values) => validate(values, cities)} />

        <StepTwo validate={(values) => validate(values, cities)} />
        <StepThree cities={cities} setCities={setCities} />
      </WizardForm>
      <div className={styles.stepsProgressBar}>
        <div className={step == 0 ? styles.current : styles.filled}></div>
        <div
          className={
            step == 1
              ? styles.current
              : step == 2
              ? styles.filled
              : styles.notfilled
          }
        ></div>
        <div
          className={
            step == 2
              ? styles.current
              : step == 0
              ? styles.notfilled
              : styles.notfilled
          }
        ></div>
      </div>
    </div>
  );
};
