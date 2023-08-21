import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styles from "./Store.module.scss";
import { profileActions } from "../../actions/profile";

import EmptyStore from "./EmptyStore";
import EmptyBrandTab from "../EmpyBrandTab";
import { authActions } from "../../actions/auth";
import { foreignProfilebrandInfo } from "../../api/index";

const PRODUCTS_PER_PAGE = 20;
const maxPage = (productsCount) => Math.ceil(productsCount / PRODUCTS_PER_PAGE);

const Store = ({ match }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const storeRef = useRef(null);
  const viewAs = useCallback(() => match.params.slug, [match.params.slug]);
  const { userInfo } = useSelector((state) => state.authReducer);
  const {
    pageNumber,
    productsCount,
    scrollTop,
    shopProducts,
    isProductOpen,
  } = useSelector((state) => state.profileReducer);
  const [isFirstView, setIsFirstView] = useState(true);
  const [lookingTo, setLookingTo] = useState(null);
  const isProductRef = useRef(null);
  useEffect(() => {
    setIsFirstView(false);
    if (!isProductOpen) {
      document.addEventListener("scroll", scroll);
      dispatch(authActions.startLoading());
      dispatch(profileActions.fetchStartShopProducts(viewAs()));
      dispatch(authActions.finishLoading());
    } else {
      dispatch(profileActions.setIsProductOpen(false));
    }
    return () => {
      if (!isProductRef?.current) {
        dispatch(profileActions.saveScrollState(0));
        dispatch(profileActions.setPageNumber(0));
      }
    };
  }, []);
  useEffect(() => {
    window.scrollTo({ top: scrollTop });
  }, [scrollTop]);
  useEffect(() => {
    if (pageNumber !== 0 && !isFirstView) {
      dispatch(profileActions.fetchShopProducts(viewAs(), pageNumber));
      setTimeout(() => {
        document.addEventListener("scroll", scroll);
      }, 300);
    }
  }, [viewAs, pageNumber]);
  useEffect(() => {
    document.addEventListener("scroll", scroll);
    return () => {
      document.removeEventListener("scroll", scroll);
    };
  }, [productsCount]);

  const scroll = () => {
    if (
      productsCount <= PRODUCTS_PER_PAGE ||
      pageNumber + 1 > maxPage(productsCount)
    ) {
      document.removeEventListener("scroll", scroll);
      return;
    }
    const bottom = storeRef?.current?.getBoundingClientRect()?.bottom;
    // sometimes the variable 'bottom' is undefined, which can cause an error further
    // that is why we check it in 'if' operator
    if (bottom && window.innerHeight >= bottom) {
      dispatch(profileActions.setPageNumber(pageNumber + 1));
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

  useEffect(() => {
    foreignProfilebrandInfo(viewAs()).then((r) => setLookingTo(r.response));
  }, [viewAs()]);

  return (
    <section className={styles.Store} ref={storeRef}>
      <header className={styles.header}>
        <section className={styles.Store__titleBlock}>
          {lookingTo && (
            <h3 className={styles.mainTitle}>
              {lookingTo?.business_role === "brand" ? "FASHION" : "STORE"}
            </h3>
          )}
          {productsCount > 0 ? (
            <span className={styles.Store__titleBlock_nft}>
              ({productsCount} {productsCount > 1 ? "NFTs" : "NFT"})
            </span>
          ) : (
            <span className={styles.Store__titleBlock_nft}>
              ({productsCount} NFTs)
            </span>
          )}
        </section>
      </header>
      {Array.isArray(shopProducts) && shopProducts.length > 0 ? (
        <ul className={styles.shopProductsList}>
          {shopProducts.map(
            ({ image, slug }, index) =>
              image && (
                <li key={index} onClick={saveScrollState}>
                  <Link to={`/product/${slug}`}>
                    <div style={{ backgroundImage: `url(${image.url})` }}></div>
                  </Link>
                </li>
              )
          )}
        </ul>
      ) : userInfo?.business_role === "brand" ? (
        <EmptyBrandTab tabname="store" />
      ) : (
        <EmptyStore />
      )}
    </section>
  );
};
export default Store;
