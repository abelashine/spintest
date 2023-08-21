import React, { useState } from "react";
import { useFormikContext } from "formik";

import styles from "./Signup.module.scss";
import WizardForm from "../../../components/WizardForm";
import ImageUploader from "../../../components/Inputs/ImageUploader";
import TextField from "../../../components/Inputs/TextField";
import PasswordField from "../../../components/Inputs/PasswordField";
import { validateString } from "../../../utils/validations";
import { EyeIcon, EyeOffIcon } from "../../../components/EyeIconSet";
import TopPart from "./TopPart";

const StepTwo = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { errors } = useFormikContext();

  return (
    <WizardForm.Page>
      <TopPart />
      <div className={styles.imageUploader}>
        <ImageUploader name="image" placeholder="Choose your profile picture" />
      </div>
      <p className={styles.formMessage}>
        We are almost set, please enter your
        <br />
        name and create your password
      </p>
      <TextField
        name="first_name"
        type="text"
        label="Name"
        variant="outlined"
        validateSymbols={validateString}
      />
      <TextField
        name="last_name"
        type="text"
        label="Surname"
        variant="outlined"
        validateSymbols={validateString}
      />
      <TextField
        name="user_name"
        type="text"
        label="Username"
        variant="outlined"
        validateSymbols={validateString}
      />
      <div
        className={styles.inputContainerDiv}
        onClick={() => setPasswordVisible((prev) => !prev)}
      >
        <PasswordField
          name="password"
          type={passwordVisible ? "text" : "password"}
          label="password"
          variant="outlined"
          placeholder="Min 7 characters with a special symbol"
        />
        {passwordVisible ? (
          <EyeOffIcon fillColor={errors?.password ? "tomato" : "black"} />
        ) : (
          <EyeIcon fillColor={errors?.password ? "tomato" : "black"} />
        )}
      </div>
    </WizardForm.Page>
  );
};

export default StepTwo;
