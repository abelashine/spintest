import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { profileActions } from "../../../../actions/profile";

import styles from "./GalleryList.module.scss";

const GalleryList = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const { galleryImages, scrollTop } = useSelector(
    (state) => state.profileReducer
  );

  const saveScrollState = (id) => {
    //dispatch(profileActions.setLastURL(location.pathname || ''));
    if (!window.scrollY && window.scrollY !== 0) return;
    dispatch(profileActions.saveScrollState(window.scrollY));
    dispatch(profileActions.saveGalleryImageIdToScroll(id));
  };

  useEffect(() => {
    window.scrollTo({ top: scrollTop });
  }, [scrollTop]);

  return (
    <ul className={styles.GalleryList}>
      {galleryImages?.map(({ id, public_id }) => (
        <Link
          to={`/${userInfo.slug}/profile/gallery/list`}
          key={id}
          onClick={() => saveScrollState(id)}
        >
          <li>
            <div
              style={{
                backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1/${public_id})`,
              }}
            ></div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default GalleryList;
