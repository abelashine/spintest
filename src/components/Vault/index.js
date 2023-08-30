import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { profileActions } from "../../actions/profile";
import SellSwapItem from "../Modal/SellSwapItem";
import EmptyVault from "./EmptyVault";
import { checkTkBckR } from "./helpers";
import ListItem from "./ListItem";
import styles from "./Vault.module.scss";

const Vault = ({ slug }) => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const { scrollTop, wardrobeProducts, isShouldUpdateVault } = useSelector(
    (state) => state.profileReducer
  );
  const dispatch = useDispatch();
  const [isUploadProductVisible, setIsUploadProductVisible] = useState(false);
  const [passonLink, setPassonLink] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const history = useHistory();
  const [isGiveBackModalOpened, setIsGiveBackModalOpened] = useState(false);
  const [checkDataTimer, setCheckDataTimer] = useState(false);
  const fullProdInfo = useSelector((state) => state.profileReducer.productInfo);
  const scrollRef = useRef(null);
  const isProductRef = useRef(null);
  const viewAs = useCallback(() => slug, [slug]);
  useEffect(() => {
    scrollRef.current = scrollTop;
  }, [scrollTop]);

  useEffect(() => {
    window.scrollTo({ top: scrollRef?.current });
    const slug = viewAs() || userInfo.slug;
    dispatch(
      profileActions.fetchWardrobeProducts(slug, () => {
        window.scrollTo({ top: scrollRef?.current });
        if (isShouldUpdateVault) {
          dispatch(profileActions.shouldUpdateVault(false));
        }
      })
    );
    return () => {
      if (!isProductRef?.current) {
        dispatch(profileActions.saveScrollState(0));
      }
    };
  }, [viewAs, userInfo, isShouldUpdateVault]);
  useEffect(() => {
    checkTkBckR(
      viewAs(),
      checkDataTimer,
      isGiveBackModalOpened,
      productInfo,
      userInfo,
      setCheckDataTimer,
      setIsGiveBackModalOpened,
      dispatch
    );
    return () => clearInterval(checkDataTimer);
  }, [isGiveBackModalOpened]);
  useEffect(() => {
    if (!isUploadProductVisible) setPassonLink(null);
  }, [isUploadProductVisible]);
  const closeUploadSelection = () => {
    document.body.style.overflow = "initial";
  };

  const vaultPath = history.location.pathname;
  const saveScrollState = () => {
    sessionStorage.setItem("lastUrl", vaultPath);
    if (!window.scrollY) return;
    dispatch(profileActions.saveScrollState(window.scrollY));
    isProductRef.current = true;
  };
  const openUploadPopup = (value, passonLink) => {
    setIsUploadProductVisible(value);
    setPassonLink(passonLink);
  };

  return (
    <section className={styles.Vault}>
      <header className={styles.header}>
        {wardrobeProducts && (
          <span
            className={
              wardrobeProducts.length == 0
                ? styles.piecesAmountEmpty
                : styles.piecesAmount
            }
          >
            ({wardrobeProducts.length}
            {wardrobeProducts.length > 1 ? "NFTs" : "NFT"})
          </span>
        )}
      </header>
      {isUploadProductVisible && fullProdInfo && (
        <SellSwapItem
          onClose={() => {
            setIsUploadProductVisible("");
            document.body.style.overflow = "initial";
          }}
          onSubmit={() => {
            setIsUploadProductVisible("");
            closeUploadSelection();
            history.push("/");
          }}
          productInfo={fullProdInfo}
          isEdit={isUploadProductVisible}
          passonLink={passonLink}
        />
      )}
      {wardrobeProducts && wardrobeProducts.length > 0 ? (
        <ul className={styles.wardrobeList}>
          {wardrobeProducts.map((data, index) => {
            return (
              <ListItem
                key={index}
                data={data}
                userInfo={userInfo}
                viewAs={viewAs()}
                index={index}
                productInfo={productInfo}
                setProductInfo={setProductInfo}
                isGiveBackModalOpened={isGiveBackModalOpened}
                openUploadPopup={openUploadPopup}
                setIsGiveBackModalOpened={setIsGiveBackModalOpened}
                saveScrollState={saveScrollState}
              />
            );
          })}
        </ul>
      ) : (
        <EmptyVault />
      )}
    </section>
  );
};
export default Vault;
