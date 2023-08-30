import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "../../../../routes";
import { moveBackToShop } from "../../../../api";
import styles from "./ButtonContainer.module.scss";

import Button from "../../../../components/Button";

const ButtonContainer = ({
  isPublic,
  setIsProductTypeModal,
  setIsOrderDetailsOpened,
  setIsGiveBackModalOpened,
  openUploadPopup,
  setIsConfirmDeleteModalOpened,
  isStockFull,
  pathname,
}) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { productInfo } = useSelector((state) => state.profileReducer);
  const { userInfo } = useSelector((state) => state.authReducer);

  const passOnHandler = () => {
    if (productInfo.for_rent && productInfo.poster.slug === userInfo.slug) {
      moveBackToShop({ product_link: match.params.token });
      history.push(`/${userInfo.slug}/profile/wardrobe`);
    } else {
      openUploadPopup("isPassOn");
    }
  };

  const userSlug = JSON.parse(localStorage.getItem("user_info"))?.slug;
  const isOwnerWatches = productInfo?.current_owner === userSlug;

  return (
    <div className={styles.ButtonContainer}>
      {/* BUY/RENT/GET - when propduct was opened to buy/get/rent */}
      {((isPublic && !productInfo.in_wardrobe) ||
        (userInfo &&
          !productInfo.in_wardrobe &&
          productInfo.poster.slug !== userInfo.slug)) && (
        <Link
          // to={`${
          //   //[Leo - 2210151349] : if the link is /checkoutProduct/${productInfo.slug}, in ProductInfo -> the isOrderDetails set to auto true. useEffect - line 186
          //   //[Leo - 2210170158] : changed to /product/${productInfo.slug} as chaging directly into checkout at the click of "Buy" button makes no sense.
          //   !userInfo || isPublic
          //     ? routes.prelogin
          //     : `/product/${productInfo.slug}`
          // }`}
          onClick={() => {
            sessionStorage.setItem("lastUrl", pathname);
            // [Leo - 2210151343 : to prevent orderdetails appear before user chose phygital/digital product type] *
            setIsOrderDetailsOpened(false);
            window.scrollTo(0, 0);
            setIsProductTypeModal(true);
          }}
          to={`${
            isPublic ? routes.prelogin : `/checkoutProduct/${productInfo.slug}`
          }`}
        >
          <button className={styles.buyButton}>
            {productInfo.for_rent
              ? "RENT"
              : productInfo.giveaway
              ? "GET"
              : "BUY"}
          </button>
        </Link>
      )}

      {/* EDIT/DELETE - when product is opened by the owner from the mothershop page */}
      {isOwnerWatches && !productInfo.in_wardrobe && (
        <>
          <Button
            type="button"
            color="white"
            size="large"
            onClick={() => openUploadPopup("isEdit")}
            // title={
            //   isStockFull === false
            //     ? "This item can't be edited because at least 1 pc of it was sold"
            //     : null
            // }
            // disabled={isStockFull === false}
          >
            EDIT
          </Button>
          <Button
            color="warnTransparent"
            size="large"
            onClick={() => setIsConfirmDeleteModalOpened(true)}
            title={
              isStockFull === false
                ? "This item can't be deleted because at least 1 pc of it was sold"
                : null
            }
            disabled={isStockFull === false}
          >
            Delete
          </Button>
        </>
      )}

      {/* PASS ON/DELETE - when no rental product, was opened bt the owner from the VAULT page */}
      {isOwnerWatches && productInfo.in_wardrobe && !productInfo.for_rent && (
        <>
          <Button color="white" size="large" onClick={passOnHandler}>
            PASS ON
          </Button>
          <Button
            type="button"
            color="warnTransparent"
            size="large"
            onClick={() => setIsConfirmDeleteModalOpened(true)}
          >
            Delete
          </Button>
        </>
      )}

      {/* GIVE BACK or PASS ON - when rental product is open by the owner from the VAULT; 
      when rental product is from the VAULT of the tenant we show GIVE BACK button; 
      when rental product is from the VAULT of the landlord, after it was returned, we show PASS ON button */}
      {isOwnerWatches &&
        productInfo.in_wardrobe &&
        productInfo.for_rent &&
        (productInfo.current_owner !== productInfo.poster.slug ? (
          <Button
            color="blue"
            size="large"
            onClick={() => setIsGiveBackModalOpened(true)}
          >
            GIVE BACK
          </Button>
        ) : (
          <Button color="white" size="large" onClick={passOnHandler}>
            PASS ON
          </Button>
        ))}
    </div>
  );
};

export default ButtonContainer;
