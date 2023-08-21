import React from "react";
import { useFormikContext } from "formik";
import Button from "../../../components/Button";
import { isThereError } from "./helpers";

const MainButton = ({step, setStep}) => {
  const formikData = useFormikContext();
  const onNoLastStep = () => {
    const isError = isThereError(step, formikData);
    console.log("IS there an error",isError);

    if (isError) return;
    setStep(step + 1)
  };
  return (
    <Button
      type={step === 0 || step === 1 ? "button" : "submit"}
      size="large"
      color={step === 2 ? "blue" : "white"}
      onClick={step === 0 || step === 1 ? onNoLastStep : null}
    >
      {step === 2 ? "Start" : " Next"}
    </Button>
  );
};

export default MainButton;
