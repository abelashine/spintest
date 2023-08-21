import React, { useState } from "react";
import { Formik } from "formik";

const WizardForm = ({
  children,
  initialValues,
  step,
  onSubmit,
  formClassName,
  Button,
}) => {
  const [values] = useState(initialValues);

  const activePage = React.Children.toArray(children)[step];
  const isLastPage = step === React.Children.count(children) - 1;

  const validate = (values) => {
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };
  // TODO: finish nextPage method

  // const nextPage = (values) => {
  //   setValues(values);
  // };

  const handleSubmit = (values, bag) => {
    if (isLastPage) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      bag.setSubmitting(false);
      onSubmit(values, bag);
    }
  };

  return (
    <Formik initialValues={values} validate={validate} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <form className={formClassName} onSubmit={handleSubmit}>
          {activePage}
          {Button && <Button />}
        </form>
      )}
    </Formik>
  );
};

WizardForm.Page = ({ children }) => children;

export default WizardForm;
