import React from "react";

import { useFormikContext } from "formik";
import SecondStageCompany from "./SecondStageCompany"
import SecondStageIndividual from "./SecondStageIndividual"
import { useState } from "react";

import {  validate } from "./initForm";



const SecondStage = () => {
  const { values, errors, touched } = useFormikContext();
  const [cities, setCities] = useState([]);
  if(values.accounttype==="individual"){
    return <SecondStageIndividual />
  }
  if(values.accounttype==="company"){
    return <SecondStageCompany  validate={(values) => validate(values, cities)}  />
  }
  return (<h1>Error</h1>);


};

export default SecondStage;
