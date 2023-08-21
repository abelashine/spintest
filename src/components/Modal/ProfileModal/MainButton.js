import React from "react";
import { useFormikContext } from "formik";
import Button from "../../../components/Button";
import styles from "./ProfileModal.module.scss";
// import { isThereError } from "./helpers";

const MainButton = ({ step, setStep }) => {
  // const formikData = useFormikContext();

  const NoLastStep = () => {
    // const isError = isThereError(step, formikData);
    // console.log("IS there an error", isError);
    // console.log("step is", step);

    // if (isError) return;
    setStep(step + 1);
  };

  return (
    <div>
      <Button
        type={step === 0 || step === 1 ? "button" : "submit"}
        size="large"
        // color={step === 2 ? "blue" : "white"}
        className={styles.submit}
        onClick={step === 0 ? NoLastStep : null}
      >
        Save
      </Button>
      <Button
        type={step === 0 ? "button" : "submit"}
        size="large"
        className={styles.cancel}
        onClick={step === 0 ? NoLastStep : null}
      >
        Cancel
      </Button>
    </div>
  );
};

export default MainButton;
