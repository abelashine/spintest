import React, { useReducer, useState } from "react";
import FirstStage from "./FirstStage";
import SecondStage from "./SecondStage";
import WizardForm from "../../WizardForm";
import MainButton from "./MainButton";
import styles from "./ProfileModal.module.scss";
import Header from "./Header";
import { initialValues } from "./initForm";
import ThirdStage from "./ThirdStage";
import { useDispatch } from "react-redux";
import { authActions } from "../../../actions/auth";
import { useSelector } from "react-redux";

export default ({ onClose, goBack, crossBtn }) => {
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [isPrivateInfoTab, setIsPrivateInfoTab] = useState(false);
  const [step, setStep] = useState(0);

  const updateProfile = (values) => {
    const dataToRequestBody = createDataToRequest(values, cities, userInfo);
    dispatch(
      authActions.updateProfileInfo(dataToRequestBody, userInfo, onClose)
    );
  };
  // const initValues = initialValues(userInfo);
  // const emailPlaceholder = userInfo.profile ? "Account email" : "Billing email";
  // const buttonToClose = crossBtn ? closeButton : backArrow;
  // const buttonHandler = crossBtn ? onClose : goBack;
  return (
    <div className={styles.businessForm}>
      <Header step={step} setStep={setStep} />

      <WizardForm
        step={step}
        initialValues={{ name: "abel" }}
        onSubmit={() => {
          console.log("object");
        }}
        formClassName={styles.signupForm}
        Button={() => <MainButton step={step} setStep={setStep} />}
      >
        <FirstStage />
      </WizardForm>
     
    </div>
  );
};
