import React, { useState, useEffect } from "react";
import styles from "./ItemJourney.module.scss";
import Avatar from "../../../Avatar";
import { getImageUrl } from "../../../../utils";
import Check from "../../../../static/icons/checkOk/xs.png";
import crossBtn3 from "../../../../static/icons/crossBtn3.svg";

const ItemJourney = ({ openModal, prevLayers, setPrevLayers, isDisabled }) => {
  const [layersData, setLayersData] = useState([]);
  useEffect(() => {
    const arr = [...prevLayers].map((layer) => {
      layer.url = getImageUrl(layer.prevlayeravatar);
      return layer;
    });
    setLayersData(arr);
  }, [prevLayers]);
  const onDeleteItem = (index) => {
    const updatedPrevLayers = prevLayers.filter((item, i) => i !== index);
    setPrevLayers(updatedPrevLayers);
  };
  return (
    <section className={styles.ItemJourney}>
      <p className={styles.ItemJourney__formtitle}>Item journey</p>
      {!isDisabled && (
        <div className={styles.ItemJourney__addBtnblock}>
          <span
            onClick={openModal}
            className={styles.ItemJourney__addBtnblock_btn}
          >
            +
          </span>
          <span className={styles.ItemJourney__addBtnblock_text}>
            Add layer (if any)
          </span>
        </div>
      )}
      <ul className={styles.ItemJourney__usersList}>
        {layersData.map((prevItemlayer, index) => {
          const transactionDate =
            new Date(prevItemlayer.transactiondate).toLocaleDateString() ||
            new Date().toLocaleDateString();
          const cityOfTransaction =
            typeof prevItemlayer.cityoftransaction === "string"
              ? prevItemlayer.cityoftransaction
              : prevItemlayer.cityoftransaction.value;
          return (
            <li key={index} className={styles.ItemJourney__usersList_item}>
              <div className={styles.photo}>
                {prevItemlayer.prevlayeravatar ? (
                  <>
                    <Avatar url={prevItemlayer.url} />
                    {prevItemlayer.isBrand && (
                      <img
                        className={styles.CheckImage}
                        src={Check}
                        alt="logo"
                      />
                    )}
                  </>
                ) : null}
                <div className={styles.photo__verticalLine}></div>
              </div>
              <div className={styles.profileSummary}>
                <span className={styles.slug}>
                  @{prevItemlayer.prevlayerusername}
                </span>
                <span className={styles.city}>{cityOfTransaction}</span>
                {" - "}
                <span className={styles.city}>{transactionDate}</span>
              </div>
              {!prevItemlayer.noDeletable && (
                <img
                  src={crossBtn3}
                  alt="Cross"
                  className={styles.deleteCross}
                  onClick={() => onDeleteItem(index)}
                />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ItemJourney;
