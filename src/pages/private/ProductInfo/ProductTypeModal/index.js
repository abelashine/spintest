import React from "react";

import crossBtn4White from "../../../../static/icons/crossBtn4White.svg";
import checkedCheckbox from "../../../../static/icons/checked-checkbox.svg";
import emptyCheckbox from "../../../../static/icons/checkbox.svg";
import styles from "./ProductTypeModal.module.scss";
import Button from "../../../../components/Button";
import { Link } from "react-router-dom";
import routes from "../../../../routes";
const log = (variable) => {
  //console.log(variable);
};
const ProductTypeModal = ({
  productInfo,
  isProductTypeModal,
  isPublic,
  pathname,
  setIsProductTypeModal,
  setSelectedProductType,
}) => {
  const [digitalVal, setDigitalVal] = React.useState(false);
  const [phygitalVal, setPhygitalVal] = React.useState(false);

  return (
    <>
      {isProductTypeModal ? (
        <div className={styles.modalOverlay}>
          <div
            className={styles.modalWindow}
            onClick={() => {
              setIsProductTypeModal(false);
              setDigitalVal(false);
              setPhygitalVal(false);
            }}
          >
            <div className={styles.container}>
              <div className={styles.closeButtonParent}>
                <img
                  src={crossBtn4White}
                  alt="Cross"
                  style={{ color: "white" }}
                  className={styles.closeButton}
                  onClick={() => {
                    setIsProductTypeModal(false);
                    setDigitalVal(false);
                    setPhygitalVal(false);
                  }}
                />
              </div>
              <div className={styles.header}>Product type</div>
              <div
                className={styles.borderContainer}
                onClick={(e) => e.stopPropagation()}
              >
                {/*[Leo - 2210242151] Phygital stock*/}
                {productInfo?.product_type == 1 &&
                productInfo?.stocks?.some(
                  (item) => item?.type == 1 && item?.quantity > 0
                ) ? (
                  <label htmlFor={"s"} className={styles.CheckboxBlack}>
                    <div className={styles.textContainer}>
                      <div className={styles.wrapper}>
                        <input
                          onChange={() => {
                            setPhygitalVal((prev) => !prev);
                            setDigitalVal(false);
                          }}
                          id={"s"}
                          type="checkbox"
                          className={styles.CheckboxBlack__input}
                          name={"s"}
                          checked={digitalVal}
                        />
                        {phygitalVal ? (
                          <img
                            className={styles.CheckboxBlack__img}
                            src={checkedCheckbox}
                          />
                        ) : (
                          <img
                            className={styles.CheckboxBlack__img}
                            src={emptyCheckbox}
                          />
                        )}
                        <div className={styles.text}>
                          Buy phygital {productInfo.price}
                          {` (${productInfo?.currency?.currency})`}
                        </div>
                      </div>
                      <p className={styles.passage}>
                        Purchase the phygital + digital NFT for both physical
                        use + digital use in augmented reality and virtual
                        reality
                      </p>
                    </div>
                  </label>
                ) : null}
                {/*[Leo - 2210242151] Digital stock*/}
                {productInfo?.stocks?.some(
                  (item) => item?.type == 2 && item.quantity > 0
                ) ? (
                  <label htmlFor={"m"} className={styles.CheckboxBlack}>
                    <div className={styles.textContainer}>
                      <div className={styles.wrapper}>
                        <input
                          onChange={() => {
                            setPhygitalVal(false);
                            setDigitalVal((prev) => !prev);
                          }}
                          id={"m"}
                          type="checkbox"
                          className={styles.CheckboxBlack__input}
                          name={"m"}
                          checked={phygitalVal}
                        />
                        {digitalVal ? (
                          <img
                            className={styles.CheckboxBlack__img}
                            src={checkedCheckbox}
                          />
                        ) : (
                          <img
                            className={styles.CheckboxBlack__img}
                            src={emptyCheckbox}
                          />
                        )}
                        <div className={styles.text}>
                          Buy digital {productInfo.digital_price}
                          {` (${productInfo?.currency?.currency})`}
                        </div>
                      </div>
                      <p className={styles.passage}>
                        Purchase the digital NFT for exclusive digital use in
                        augmented reality and virtual reality
                      </p>
                    </div>
                  </label>
                ) : null}
              </div>
              <div className={styles.selectButton}>
                <Link
                  //[Leo - 2210170814] Change route on click of popup button. close the popup.
                  to={`${
                    isPublic
                      ? routes.prelogin
                      : `/checkoutProduct/${productInfo.slug}`
                  }`}
                  onClick={() => {
                    sessionStorage.setItem("lastUrl", pathname);
                    window.scrollTo(0, 0);
                    setIsProductTypeModal(false);
                    //[Leo - 2210191059] can be improved using enum I think. Just dont have time to research on it
                    if (phygitalVal) {
                      setSelectedProductType("phygital");
                    } else if (digitalVal) {
                      setSelectedProductType("digital");
                    } else {
                      setSelectedProductType("");
                    }
                  }}
                >
                  <Button
                    color="white"
                    size="large"
                    disabled={!(phygitalVal || digitalVal)}
                  >
                    {"SELECT"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductTypeModal;
