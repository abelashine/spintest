import React, { useState } from "react";
import { useFormikContext } from "formik";
import ThirdStageCompany from "./ThirdStageCompany";
import ThirdStageIndividual from "./ThirdStageIndividual";

const ThirdStage = ({ name }) => {
  const { values, errors, touched } = useFormikContext();
  const [cities, setCities] = useState([]);
  if (values.accounttype === "individual") {
    return <ThirdStageIndividual />;
  }
  if (values.accounttype === "company") {
    return <ThirdStageCompany />;
  }
  return <h1>Error</h1>;
};

export default ThirdStage;
