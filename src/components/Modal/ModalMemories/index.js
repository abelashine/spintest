import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ModalMemories.module.scss";
import closeButton from "../../../static/icons/cross.svg";
import memoriesIcon from "../../../static/icons/memories.png";
import { getMemoriesToRender } from "./helpers";
import Avatar from "../../../components/Avatar";
import x from "../../../static/icons/x.png"

const ModalMemories = ({ onClose }) => {
  const { productInfo, transactionHistory } = useSelector(
    (state) => state.profileReducer
  );
  const [memories, setMemories] = useState([]);
  const [memoriesNumber, setMemoriesNumber] = useState(0);
  useEffect(() => {
    if (productInfo) {
      getMemoriesToRender(productInfo.slug, setMemories, setMemoriesNumber);
    }
  }, [transactionHistory, productInfo]);
  const CheckMark = () => (
    <svg
      style={{ width: "100%", maxWidth: 16, marginRight: 5, marginLeft: 5 }}
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(.4 .5)" fill="none" fillRule="evenodd">
        <ellipse fill="#239EFE" cx="7.1" cy="6.9" rx="7.1" ry="6.9" />
        <path
          d="M9.3 5l.5.5a.6.6 0 010 .8L7.2 8.8l-.4.4-.2.1h-.2L6 9.2 4.3 7.6a.6.6 0 010-.9l.4-.4c.3-.2.6-.2.9 0l.8.8 2.1-2c.2-.2.6-.2.8 0z"
          fill="#FFF"
        />
      </g>
    </svg>
  );

  return (
    <div className={styles.ModalMemories}>
      <div className={styles.ModalMemories__popup}>
        <section className={styles.ModalMemories__popup_header}>
          <img
            src={x}
            alt="closeButton"
            width={14}
            height={14}
            className={styles.crossBtn}
            onClick={onClose}
          />
        </section>

        <div className={styles.leftColumn}>
          <div className={styles.title}>
            <img src={memoriesIcon} />
            <div className={styles.titleText}>Memories</div>
          </div>
        </div>
        <div className={styles.CompanyContainer}>
          <div className={styles.CompanyInfo}>
            <div className={styles.CompanyLogo}>
              <Link to={`/${productInfo.poster.slug}/profile`}>
                <Avatar
                  url={productInfo.poster.image.url}
                  isBrand={
                    false
                    // productInfo.poster.business_role
                  }
                  isSmall
                />
              </Link>
            </div>
            <div className={styles.CompanyText}>
              <div className={styles.CompanyName}>{productInfo.name}</div>
              <div className={styles.CompanyTag}>
                <Link
                  style={{ display: "flex" }}
                  to={`/${productInfo.poster.slug}/profile`}
                >
                  {`@${productInfo.poster.slug}`}
                  {productInfo.poster.business_role && <CheckMark />}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.descriptionOfProducts}>
          <div className={styles.descriptionOfProductsTitle}>
            {/* <p>{productInfo.description}</p> */}
            <p></p>
            <span>{memoriesNumber} memories</span>
          </div>
          <img
            className={styles.productImage}
            src={productInfo.image.url}
            alt="Product image"
          />
        </div>
        <section className={styles.ModalMemories__popup_memories}>
          {memories.map((memblock, i) => (
            <div key={i}>
              {memblock.map((m) => (
                <img width={115} height={115} key={m} src={m} alt="Product image" />
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
