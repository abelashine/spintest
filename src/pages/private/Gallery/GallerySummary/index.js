import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./GallerySummary.module.scss";

import Avatar from "../../../../components/Avatar";

const GallerySummary = ({ profileInfo }) => {
  const { galleryImages } = useSelector((state) => state.profileReducer);
  const history = useHistory();
  const onAvatarClicHandler = () => {
    history.push(`/${profileInfo.slug}/profile`);
  };
  return (
    <div className={styles.GallerySummary}>
      <section className={styles.GallerySummary__leftCol}>
        <h3 className={styles.GallerySummary__leftCol_title}>PHOTOS</h3>
        <p className={styles.GallerySummary__leftCol_text}>
          {galleryImages?.length || 0} Meta-photos
        </p>
      </section>
      <section className={styles.GallerySummary__rightCol}>
        <div
          className={styles.GallerySummary__rightCol_avatar}
          onClick={onAvatarClicHandler}
        >
          {profileInfo?.image?.url && (
            <Avatar
              url={profileInfo.image.url}
              isBrand={profileInfo?.type === "brand"}
            />
          )}
        </div>
      </section>
    </div>
  );
};
export default GallerySummary;
