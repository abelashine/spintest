import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinLogo from "../../../static/images/logo/spinByLablacoLogoWhite.svg";
import backArrow from "../../../static/icons/back-arrow.svg";
import styles from "./GalleryListView.module.scss";
import { useHistory } from "react-router-dom";
import { profileActions } from "../../../actions/profile";

const GalleryListView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.authReducer);
  const { galleryImages, scrollToImageId } = useSelector(
    (state) => state.profileReducer
  );

  useEffect(() => {
    if (!galleryImages) {
      dispatch(profileActions.fetchGalleryImages());
    }
  }, []);

  const onBackArrow = () => {
    history.push(`/${userInfo.slug}/profile/gallery`);
  };

  useEffect(() => {
    if (!scrollToImageId) {
      // for case when goes to page directly to see top and aviod errors
      window.scrollTo({ top: 0 });
      return;
    }
    const elementToScroll = document.getElementById(scrollToImageId);
    if (!elementToScroll) return;
    const offset = elementToScroll?.offsetTop;
    window.scrollTo({ top: offset - 79 }); // minus header heigh to show top of image
  }, []);

  return (
    <div className={styles.GalleryListView}>
      <div className={styles.header}>
        {userInfo && (
          <button
            onClick={onBackArrow}
            className={styles.backBtn}
            type="button"
          >
            <img src={backArrow} alt="Back arrow" />
          </button>
        )}
        <img src={SpinLogo} alt="SpinLogo" className={styles.logoImg} />
      </div>
      <ul className={styles.GalleryListView__list}>
        {galleryImages?.map(({ id, public_id }) => (
          <li key={id}>
            <img
              id={id.toString()}
              src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1/${public_id}`}
              alt="image from VR gallery in full size"
            ></img>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryListView;
