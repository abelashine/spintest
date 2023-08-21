import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ModalMemories.module.scss";
import closeButton from "../../../static/icons/cross.svg";
import SpinLogoBlack from "../../../static/images/logo/spinByLablacoLogoBlack.svg";
import { getMemoriesToRender } from "./helpers";

const ModalMemories = ({ onClose }) => {
  const { productInfo, transactionHistory } = useSelector(
    (state) => state.profileReducer
  );
  const [memories, setMemories] = useState([]);
  const [memoriesNumber, setMemoriesNumber] = useState(0);
  useEffect(() => {
    if (productInfo) {
      getMemoriesToRender(
        productInfo.slug,
        setMemories,
        setMemoriesNumber
      );
    }
  }, [transactionHistory, productInfo]);

  return (
    <div className={styles.ModalMemories}>
      <div className={styles.ModalMemories__popup}>
        <section className={styles.ModalMemories__popup_header}>
          <img
            src={closeButton}
            alt="closeButton"
            className={styles.crossBtn}
            onClick={onClose}
          />
          <img
            src={SpinLogoBlack}
            alt="SpinLogoBlack"
            className={styles.logoImg}
          />
        </section>
        <section className={styles.ModalMemories__popup_summury}>
          <div className={styles.leftColumn}>
            <div>
              <h3>Memories</h3>
              <p>{memoriesNumber} memories</p>
            </div>
            <div>
              <p>{productInfo.name}</p>
              <Link
                to={`/${productInfo.poster.slug}/profile`}
                className={styles.slug}
              >
                @{productInfo.poster.slug}
              </Link>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <img src={productInfo.image.url} alt="Product image" />
          </div>
        </section>
        <section className={styles.ModalMemories__popup_memories}>
          {memories.map((memblock, i) => (
            <div key={i}>
              {memblock.map((m) => (
                <img key={m} src={m} alt="Product image" />
              ))}
            </div>
          ))}
        </section>
      </div>
      <div className={styles.ModalMemories__overlay}></div>
    </div>
  );
};

export default ModalMemories;
