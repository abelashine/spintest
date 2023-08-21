import React from "react";
import { useFormikContext } from "formik";
import Button from "../../../components/Button";
import styles from "./BusinessProfileModal.module.scss";
import { isThereError } from "./helpers";

const MainButton = ({ step, setStep }) => {
  const formikData = useFormikContext();

  const NoLastStep = () => {
    const isError = isThereError(step, formikData);
    console.log("IS there an error", isError);
    console.log("step is", step);

    if (isError) return;
    setStep(step + 1);
  };

  return (
    <Button
      type={step === 0 || step === 1 ? "button" : "submit"}
      size="large"
      // color={step === 2 ? "blue" : "white"}
      className={step === 2 ? styles.submit : styles.button}
      onClick={step === 0 || step === 1 ? NoLastStep : null}
    >
      {step === 2 ? "Submit" : " Next"}
    </Button>
  );
};

export default MainButton;
