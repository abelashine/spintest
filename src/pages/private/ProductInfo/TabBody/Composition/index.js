import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Composition.module.scss";
import sustainable_materials from "../../../../../static/icons/sustainable_materials.svg";
import respecting_the_environment from "../../../../../static/icons/respecting_the_environment.svg";
import fair_working_conditions from "../../../../../static/icons/fair_working_conditions.svg";
import innovative_processing from "../../../../../static/icons/innovative_processing.svg";
import markiconV1 from "../../../../../static/icons/markiconV1.svg";
import { getSizesString } from "../../helpers";
import PhygitalNFTsExplanation from "../../PhygitalNFTsExplanation";

const icons = {
  sustainable_materials: (
    <img src={sustainable_materials} alt="sustainable_materials" />
  ),
  respecting_the_environment: (
    <img src={respecting_the_environment} alt="respecting_the_environment" />
  ),
  fair_working_conditions: (
    <img src={fair_working_conditions} alt="fair_working_conditions" />
  ),
  innovative_processing: (
    <img src={innovative_processing} alt="innovative_processing" />
  ),
};

const Composition = () => {
  const { productInfo } = useSelector((state) => state.profileReducer);
  const params = useParams();
  const { composition, description, product_benefits, stocks } = productInfo;
  const sizes = getSizesString(stocks, params);

  const [productType, setProductType] = useState("phygital");

  useEffect(() => {
    if (productInfo?.product_type == 1) {
      setProductType("phygital");
    } else if (productInfo?.product_type == 2) {
      setProductType("digital");
    }
  }, [productInfo, productType]);

  return (
    <div className={styles.Composition}>
      <div className={styles.CompositionTitle}>DESCRIPTION</div>

      {!productInfo?.for_art && productInfo?.product_type == 1 && (
        <div>
          <div className={styles.CompositionText}>
            This item fits true to size, we suggest ordering your regular size.
            If you are in between two sizes, we recommend choosing the next size
            up.
          </div>
        </div>
      )}

      {productInfo?.for_art && (
        <div className={styles.CompositionText}>Type : {productType}</div>
      )}
      <br />
      <div className={styles.CompositionComponents}>
        {sizes}
        <br />
        <br />
        Description:
        <br />
        {description}
        <br />
        {!productInfo?.for_art && (
          <div>
            <br />
            Composition:
            <br />
            {composition}
          </div>
        )}
        {productInfo?.for_art && (
          <div>
            <br />
            Height : {productInfo?.height} cm
            <br />
            <br />
            Width : {productInfo?.width} cm
            <br />
            <br />
            Depth : {productInfo?.depth} cm
            <br />
            <br />
            Weight : {productInfo?.weight} kg
            <br />
            <br />
          </div>
        )}
      </div>
      <ul className={styles.productBenefits}>
        {product_benefits &&
          Object.entries(JSON.parse(product_benefits)).map(
            ([name, value], index) =>
              value && (
                <li key={index}>
                  <div>{icons[name]}</div>
                  <span>{name.slice(0, 1)}</span>
                  {name.replace(/_/g, " ").slice(1)}{" "}
                  <img
                    className={styles.marksign}
                    src={markiconV1}
                    alt="mark icon"
                  />
                </li>
              )
          )}
      </ul>
      <PhygitalNFTsExplanation />
    </div>
  );
};

export default Composition;
