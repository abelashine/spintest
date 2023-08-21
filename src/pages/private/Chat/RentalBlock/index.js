import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./RentalBlock.module.scss";
import { wardrobe } from "../../../../api";
import { checkTakeBackRent } from "../helpers";
import { authActions } from "../../../../actions/auth";

import GiveBackQRModal from "../../../../components/Modal/GiveBackQRModal";

const RentalBlock = ({
  productImage,
  me,
  extra,
  messageType,
  setWasItPushed,
}) => {
  const [productInfo, setProductInfo] = useState(null);
  const [isGiveBackModalOpened, setIsGiveBackModalOpened] = useState(false);
  const [checkDataTimer, setCheckDataTimer] = useState(false);
  const { userInfo } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const { day_count } = JSON.parse(extra);

  useEffect(() => {
    if (isGiveBackModalOpened) {
      checkTakeBackRent(
        checkDataTimer,
        isGiveBackModalOpened,
        productInfo,
        setCheckDataTimer,
        setIsGiveBackModalOpened,
        dispatch
      );
    } else clearInterval(checkDataTimer);
    return () => clearInterval(checkDataTimer);
  }, [isGiveBackModalOpened]);

  const givaBackHandler = () => {
    const productLinkV1 = +JSON.parse(extra).productLink.split(" ")[1];
    const productLinkV2 = JSON.parse(extra).productLink;
    dispatch(authActions.startLoading());
    wardrobe(userInfo.slug)
      .then((res) => {
        if (res.response) {
          const prId = productLinkV1 ? "product_link_id" : "passon_link";
          const prLink = productLinkV1 ? productLinkV1 : productLinkV2;
          const certainProduct = res.response.products.find(
            (pr) => pr[prId] === prLink
          );
          if (certainProduct) {
            setProductInfo(certainProduct);
            dispatch(authActions.finishLoading());
            setIsGiveBackModalOpened(true);
          } else {
            dispatch(authActions.finishLoading());
            setWasItPushed("The product has been already given back.");
          }
        }
      })
      .catch((err) => console.error(err));
  };

  const timeStr =
    messageType === "rentOneDayDelay" || messageType === "rentOverdue"
      ? "overdue"
      : "left";
  return (
    <section className={styles.RentalBlock}>
      <GiveBackQRModal
        isOpened={isGiveBackModalOpened && productInfo}
        productInfo={productInfo}
        onModalClose={() => setIsGiveBackModalOpened(false)}
      />
      <div className={styles.RentalBlock__image}>
        <img src={productImage} alt="Product" />
        <div>
          <span
            data-delay={
              messageType === "rentOneDayDelay" || messageType === "rentOverdue"
            }
          >
            {+day_count || 1} Day {timeStr}
          </span>
        </div>
      </div>
      {!me && (
        <button
          className={styles.RentalBlock__actionBtn}
          type="button"
          onClick={givaBackHandler}
          data-delay={
            messageType === "rentOneDayDelay" || messageType === "rentOverdue"
          }
        >
          Give back
        </button>
      )}
    </section>
  );
};

export default RentalBlock;
