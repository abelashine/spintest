import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { profileActions } from "../../actions/profile";
import styles from "./Arts.module.scss";

import { authActions } from "../../actions/auth";
import EmptyBrandTab from "../EmpyBrandTab";
import EmptyArts from "./EmptyArts";

const PRODUCTS_PER_PAGE = 20;
const maxPage = (productsCount) => Math.ceil(productsCount / PRODUCTS_PER_PAGE);

const Arts = ({ match }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const storeRef = useRef(null);
  const viewAs = useCallback(() => match.params.slug, [match.params.slug]);
  const { userInfo } = useSelector((state) => state.authReducer);
  const {
    artPageNumber,
    artsCount,
    scrollTop,
    isProductOpen,
    artsProducts,
  } = useSelector((state) => state.profileReducer);
  const [isFirstView, setIsFirstView] = useState(true);
  const isProductRef = useRef(null);
  useEffect(() => {
    setIsFirstView(false);
    if (!isProductOpen) {
      document.addEventListener("scroll", scroll);
      dispatch(authActions.startLoading());
      dispatch(profileActions.fetchStartArtsProducts(viewAs()))
      dispatch(authActions.finishLoading());
    } else {
      dispatch(profileActions.setIsProductOpen(false));
    }
    return () => {
      if (!isProductRef?.current) {
        dispatch(profileActions.saveScrollState(0));
        dispatch(profileActions.setArtsPageNumber(0));
      }
    };
  }, []);
  useEffect(() => {
    window.scrollTo({ top: scrollTop });
  }, [scrollTop]);
  useEffect(() => {
    if (artPageNumber !== 0 && !isFirstView) {
      dispatch(profileActions.fetchArtsProducts(viewAs(), artPageNumber))
      setTimeout(() => {
        document.addEventListener("scroll", scroll);
      }, 300);
    }
  }, [viewAs, artPageNumber]);
  useEffect(() => {
    document.addEventListener("scroll", scroll);
    return () => {
      document.removeEventListener("scroll", scroll);
    };
  }, [artsCount]);

  const scroll = () => {
    if (
      artsCount <= PRODUCTS_PER_PAGE ||
      artPageNumber + 1 > maxPage(artsCount)
    ) {
      document.removeEventListener("scroll", scroll);
      return;
    }
    const bottom = storeRef?.current?.getBoundingClientRect()?.bottom;
    // sometimes the variable 'bottom' is undefined, which can cause an error futher
    // that is why we check it in 'if' operator
    if (bottom && window.innerHeight >= bottom) {
      dispatch(profileActions.setArtsPageNumber(artPageNumber + 1));
      document.removeEventListener("scroll", scroll);
    }
  };
  const saveScrollState = () => {
    sessionStorage.setItem("lastUrl", location.pathname);
    if (!window.scrollY) return;
    dispatch(profileActions.saveScrollState(window.scrollY));
    dispatch(profileActions.setIsProductOpen(true));
    isProductRef.current = true;
  };

  return (
    <section className={styles.Arts} ref={storeRef}>
      <header className={styles.header}>
        <section className={styles.Arts__titleBlock}>
          {artsCount > 0 ?
            <span className={styles.Arts__titleBlock_nft}>
              ({artsCount} {artsCount > 1 ?
                "NFTs"
                :
                "NFT"
              })
            </span>
            :
            <span className={styles.Arts__titleBlock_nft}>
              ({artsCount} NFTs)
            </span>
          }
        </section>
      </header>
      {Array.isArray(artsProducts) && artsProducts.length > 0 ? (
        <ul className={styles.artsList}>
          {artsProducts.map(
            ({ image, slug }, index) =>
              image && (
                <li key={index} onClick={saveScrollState}>
                  <Link className={styles.listLink} to={`/product/${slug}`}>
                    <div style={{ backgroundImage: `url(${image.url})` }}></div>
                  </Link>
                </li>
              )
          )}
        </ul>
      ) : userInfo?.business_role === "brand" ? (
        <EmptyBrandTab tabname="arts" />
      ) : (
        <EmptyArts />
      )}
    </section>
  );
};
export default Arts;
