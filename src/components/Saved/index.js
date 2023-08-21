import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileActions } from "../../actions/profile";
import EmptyBrandTab from "../EmpyBrandTab";
import styles from "./Saved.module.scss";
import SettingsSvg from "../../static/icons/noun_Settings_943921.svg";

export default ({ match, foreignBrandInfo }) => {
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const savedProducts = useSelector(
    (state) => state.profileReducer.savedProducts
  );
  const [pageNumber, setPageNumber] = useState(0);
  const [columns, setColumns] = useState(window.innerWidth > 1279 ? 6 : 3);

  const dispatch = useDispatch();
  const savedRef = useRef(null);

  const splitColumns = (savedProducts) => {
    const colsHeights = [];
    const splitted = [];
    for (let index = 0; index < columns; index++) {
      colsHeights.push({ id: index, height: 0 });
      splitted.push([]);
    }

    savedProducts.forEach((post) => {
      colsHeights[0].height += post.image.height;
      splitted[colsHeights[0].id].push(post);
      colsHeights.sort((a, b) =>
        a.height < b.height ? -1 : a.height > b.height ? 1 : 0
      );
    });

    return splitted;
  };

  const scroll = () => {
    if (
      savedRef.current &&
      window.innerHeight >= savedRef.current.getBoundingClientRect().bottom
    ) {
      setPageNumber((prevState) => prevState + 1);
    }
  };

  const resize = () => {
    setColumns(() => (window.innerWidth > 1279 ? 6 : 3));
  };

  useEffect(() => {
    dispatch(profileActions.removeSaved());
    document.addEventListener("scroll", scroll);
    window.addEventListener("resize", resize);

    return () => {
      document.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);

      dispatch(profileActions.removeSaved());
    };
  }, [dispatch]);

  useEffect(() => {
    const slug = match.params.slug || userInfo.slug;
    dispatch(profileActions.fetchSavedProducts(slug, pageNumber));
  }, [match.params.slug, pageNumber]);

  return (
    <section className={styles.Saved}>
      <header className={styles.header}>
        {(userInfo || foreignBrandInfo) && (
          <h3 className={styles.mainTitle}>
            {foreignBrandInfo
              ? foreignBrandInfo.business_role
                ? "ART"
                : "SAVED"
              : userInfo.business_role
              ? "ART"
              : "SAVED"}
          </h3>
        )}
        {(foreignBrandInfo && foreignBrandInfo.business_role) ||
        (userInfo && userInfo.business_role)
          ? null
          : savedProducts.length > 0 && (
              <span className={styles.piecesAmount}>
                ({savedProducts.length} NFTs)
              </span>
            )}
      </header>
      {savedProducts && savedProducts.length > 0 ? (
        <div className={styles.savedGrid} ref={savedRef}>
          {splitColumns(savedProducts).map((column, index) => (
            <div key={index} className={styles.column}>
              {column.map(({ image: { url } }) => (
                <img key={url} src={url} alt="" />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <EmptyBrandTab tabname="moodboard" />
      )}
    </section>
  );
};
