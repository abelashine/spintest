import React from "react";
import styles from "./Signup.module.scss";
import WizardForm from "../../../components/WizardForm";
import ImageUploader from "../../../components/Inputs/ImageUploader";
import CheckboxBlack from "../../../components/Inputs/CheckboxBlack";
import { useFormikContext } from "formik";
import spinConnectIcon from "../../../static/images/logo/spin-connect-icon.png";
import TopPart from "./TopPart";

const StepOne = () => {
  const { values, errors, touched } = useFormikContext();
  const email = localStorage.getItem("new_user_email");
  return (
    <WizardForm.Page>
    <TopPart />

      <div className={styles.firstStepText}>
        <p>Let's get started!</p>
        <p>
          Please choose your profile picture <br />
          and confirm your email:
          <br />
          <span className={styles.emailMessage}>{email}</span>
        </p>
      </div>

      <div className={styles.imageUploaderStepOne}>
        <ImageUploader name="image" placeholder="Choose your profile picture" />
      </div>
      <div className={styles.terms}>
        <CheckboxBlack name="policy" value={values.policy} />
        <span>
          I accept the&nbsp;
          <a
            href="https://www.lablaco.com/user-terms"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.termsLink}
          >
            <span className={styles.emailMessage}>terms and conditions</span>
          </a>
        </span>
      </div>
      {errors.policy && touched.policy && (
        <span className={styles.errorText}>Required</span>
      )}
    </WizardForm.Page>
  );
};

export default StepOne;
