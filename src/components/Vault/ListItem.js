/*eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Vault.module.scss";
import { profileActions } from "../../actions/profile";
import { setTimeToEnd } from "./helpers";
import { moveBackToShop } from "../../api";

import Button from "../Button";
import GiveBackQRModal from "../Modal/GiveBackQRModal";
import ProductPhotoCard from "../ProductPhotoCard";
import { authActions } from "../../actions/auth";

const ListItem = ({
  data,
  userInfo,
  viewAs,
  index,
  isGiveBackModalOpened,
  productInfo,
  setProductInfo,
  openUploadPopup,
  setIsGiveBackModalOpened,
  saveScrollState,
}) => {
  const {
    current_owner,
    product_poster,
    passon_link,
    product_name,
    price,
    old_owner,
    preview_photo,
    rental_period_ends_on,
    for_rent,
  } = data;
  if (for_rent && !rental_period_ends_on) return null;
  const params = useParams();
  const reduxDispatch = useDispatch();
  const { wardrobeProducts } = useSelector((state) => state.profileReducer);
  const [time, setTime] = useState(null);
  const isRent = for_rent && current_owner !== product_poster;

  const daysClass =
    for_rent && new Date() > new Date(rental_period_ends_on[0])
      ? styles.missTerm
      : styles.rentTerm;
  useEffect(() => {
    let timer = null;
    if (for_rent && current_owner !== product_poster) {
      setTimeToEnd(rental_period_ends_on[0], setTime);
      if (isRent) {
        timer = setInterval(() => {
          setTimeToEnd(rental_period_ends_on[0], setTime);
        }, 1000 * 60);
      }
    }
    return () => clearInterval(timer);
  }, []);

  const giveBackHandler = () => {
    setProductInfo(wardrobeProducts[index]);
    setIsGiveBackModalOpened(true);
  };

  const passonHandler = () => {
    if (
      wardrobeProducts[index].for_rent &&
      wardrobeProducts[index].product_poster === viewAs
    ) {
      reduxDispatch(authActions.startLoading());
      const link = wardrobeProducts[index].passon_link;
      moveBackToShop({ product_link: link }).then(() => {
        reduxDispatch(
          profileActions.fetchWardrobeProducts(viewAs, () => {
            window.scrollTo({ top: 0 });
            reduxDispatch(authActions.finishLoading());
          })
        );
      });
    } else {
      reduxDispatch(
        profileActions.fetchProdByToken(passon_link, () => {
          openUploadPopup("isPassOn", passon_link);
        })
      );
      reduxDispatch(profileActions.fetchTransactionHistory(passon_link));
    }
  };

  if (!time && for_rent && current_owner !== product_poster) return null;

  return (
    <li className={styles.wardrobeItem} onClick={saveScrollState}>
      <Link
        to={{
          pathname: `/tokenizedProduct/${passon_link}/`,
          state: {
            wardrobeId: wardrobeProducts[index].wardrobe_id,
            productLinkId: wardrobeProducts[index].product_link_id,
            viewedAs: params.slug,
          },
        }}
      >
        <div className={styles.wardrobeProductInfo}>
          <div className={styles.photoWrap}>
            <div className={styles.wardrobeProductPhoto}>
            
              <ProductPhotoCard photo={preview_photo} />
            </div>
          </div>
          <div className={styles.wardrobeProductSummary}>
            <span className={styles.wardrobeProductName}>{product_name}</span>
            <span className={styles.wardrobeProductOwner}>@{old_owner}</span>
            {isRent ? (
              <>
                <span className={daysClass}>{time}</span>
                <span className={styles.wardrobeProductPrice}>{price}</span>
              </>
            ) : (
              <span className={styles.wardrobeProductPrice}>{price}</span>
            )}
          </div>
        </div>
      </Link>
      {userInfo?.slug === params.slug &&
        (wardrobeProducts[index].for_rent &&
        wardrobeProducts[index].product_poster !== params.slug ? (
          <div className={styles.buttons}>
            <button className={styles.buttonGiveBack} color="black" size="middle" onClick={giveBackHandler}>
              GIVE BACK
            </button>
          </div>
        ) : (
          <div className={styles.buttons}>
            <button className={styles.buttonPassOn} color="black" size="middle" onClick={passonHandler}>
              PASS ON
            </button>
          </div>
        ))}

      <GiveBackQRModal
        isOpened={isGiveBackModalOpened}
        productInfo={productInfo}
        onModalClose={() => setIsGiveBackModalOpened(false)}
      />
    </li>
  );
};

export default ListItem;
