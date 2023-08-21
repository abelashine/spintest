import React from "react";
import styles from "./DesignCriteria.module.scss";
import CheckboxBlack from "../../../Inputs/CheckboxBlack";
import sustainable_materials from "../../../../static/icons/sustainable_materials.svg";
import respecting_the_environment from "../../../../static/icons/respecting_the_environment.svg";
import fair_working_conditions from "../../../../static/icons/fair_working_conditions.svg";
import innovative_processing from "../../../../static/icons/innovative_processing.svg";

const DesignCriteria = ({ values, isDisabled }) => {
  const inlineStyle = { position: "absolute", width: "100%", top: "12px", left: "0" };
  return (
    <section className={styles.designCriteria}>
      <p className={styles.designCriteria__formtitle}>Impact design criteria</p>
      <div className={styles.designCriteria__item}>
        <CheckboxBlack
          name="designcriteria.sustainable_materials"
          value={values.designcriteria.sustainable_materials}
          isDisabled={isDisabled}
          inlineStyle={inlineStyle}
        />
        <img src={sustainable_materials} alt="sustainable_materials" />
        <p>Sustainable materials</p>
      </div>

      <div className={styles.designCriteria__item}>
        <CheckboxBlack
          name="designcriteria.respecting_the_environment"
          value={values.designcriteria.respecting_the_environment}
          isDisabled={isDisabled}
          inlineStyle={inlineStyle}
        />
        <img
          src={respecting_the_environment}
          alt="respecting_the_environment"
        />
        <p>Respecting the enviroment</p>
      </div>

      <div className={styles.designCriteria__item}>
        <CheckboxBlack
          name="designcriteria.fair_working_conditions"
          value={values.designcriteria.fair_working_conditions}
          isDisabled={isDisabled}
          inlineStyle={inlineStyle}
        />
        <img src={fair_working_conditions} alt="fair_working_conditions" />
        <p>Fair working conditions</p>
      </div>

      <div className={styles.designCriteria__item}>
        <CheckboxBlack
          name="designcriteria.innovative_processing"
          value={values.designcriteria.innovative_processing}
          isDisabled={isDisabled}
          inlineStyle={inlineStyle}
        />
        <img src={innovative_processing} alt="innovative_processing" />
        <p>Innovative processing</p>
      </div>
    </section>
  );
};

export default DesignCriteria;
