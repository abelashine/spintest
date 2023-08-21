import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import styles from "./RentFieldsTwo.module.scss";
import UploadSelectionInput from "../../../Inputs/UploadSelectionInput";
import {
  periodsValues,
  periodsOptions
} from "../../../../static/data/dataForForms";
import { getDateValue } from '../helpers'

const getVals = (prop, values) =>
  periodsValues.find(
    (periodData) => periodData.type === values.rentalPeriods[prop].type
  ).nums;

const RentFieldsTwo = ({ productInfo }) => {
  const { values, errors } = useFormikContext();
  const minValueOptions = getVals("min", values);
  const maxValueOptions = getVals("max", values);
  useEffect(() => {
    values.rentalPeriods.min.value = "01";
  }, [values.rentalPeriods.min.type]);
  useEffect(() => {
    values.rentalPeriods.max.value = "01";
  }, [values.rentalPeriods.max.type]);
  useEffect(() => {
    if (productInfo) {
      values.rentalPeriods.min.value = getDateValue(productInfo.minimum_rental_period)
      values.rentalPeriods.max.value = getDateValue(productInfo.maximum_rental_period)
    }
  }, [])
  return (
    <div className={styles.RentFieldsTwo}>
      <section className={styles.RentFieldsTwo__firstBlock}>
        <h3>Minimum rental period</h3>
        <UploadSelectionInput
          name={`rentalPeriods.min.value`}
          type="select"
          variants={minValueOptions}
        />
        <UploadSelectionInput
          name={`rentalPeriods.min.type`}
          type="select"
          variants={periodsOptions}
        />
      </section>
      <section className={styles.RentFieldsTwo__secondBlock}>
        <h3>Maximum rental period</h3>
        <UploadSelectionInput
          name={`rentalPeriods.max.value`}
          type="select"
          variants={maxValueOptions}
        />
        <UploadSelectionInput
          name={`rentalPeriods.max.type`}
          type="select"
          variants={periodsOptions}
        />
      </section>
      <span className={styles.errorText}>{errors.rentalPeriods}</span>
    </div>
  );
};

export default RentFieldsTwo;
