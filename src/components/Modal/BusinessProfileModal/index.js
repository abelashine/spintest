import React, { useReducer, useState } from "react";
import FirstStage from "./FirstStage";
import SecondStage from "./SecondStage";
import WizardForm from "../../WizardForm";
import { getDataForRequest } from "./helpers";
import MainButton from "./MainButton";
import styles from "./BusinessProfileModal.module.scss";
import Header from "./Header";
import { initialValues } from "./initForm";
import ThirdStage from "./ThirdStage";
import { useDispatch } from "react-redux";
import { createBrand } from "../../../api";
import { authActions } from "../../../actions/auth";
import { useHistory } from "react-router-dom";
import routes from "../../../routes";



export default ({ onClose, goBack }) => {
  const [step, setStep] = useState(0);

  const [cities, setCities] = useState([]);
  const [companyCities, setCompanyCities] = useState([]);
  const reduxDispatch = useDispatch();
  const history = useHistory();


  const createNewBusinessProfile = (businessInfo) => {
    const { totalInfo, brand_place_id, company_place_id } = getDataForRequest(
      businessInfo,
      cities,
      companyCities
    );
    console.log(totalInfo)
    history.push(routes.prelogin);
    
  // TODO integrate with the backend
    // reduxDispatch(authActions.startLoading());
    // createBrand({
    //   ...totalInfo,
    //   city: brand_place_id,
    //   city_place_id: company_place_id,
    //   phone: `${businessInfo.countryCode}${businessInfo.phoneNumber}`,
    // }).then((res) => {
    //   reduxDispatch(authActions.finishLoading());
    //   if (res.response) {
    //     history.push(routes.prelogin);
    //   }
    // });
  };

  return (
    <div className={styles.businessForm}>
      <Header step={step} setStep={setStep} />

      <WizardForm
        step={step}
        initialValues={initialValues}
        onSubmit={createNewBusinessProfile}
        formClassName={styles.signupForm}
        Button={() => <MainButton step={step} setStep={setStep} />}
      >
        <FirstStage />
        <SecondStage />
        <ThirdStage />
      </WizardForm>
      <div className={styles.stepsProgressBar}>
        <div className={step === 0 ? styles.current : ""}></div>
        <div className={step === 1 ? styles.current : ""}></div>
        <div className={step === 2 ? styles.current : ""}></div>
      </div>
    </div>
  );
};
