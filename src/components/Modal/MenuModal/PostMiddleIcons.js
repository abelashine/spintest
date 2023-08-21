import React from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./MenuModal.module.scss";
import galleryIcon from "../../../static/icons/galleryIcon.svg";

const PostMiddleIcons = () => {
  const params = useParams();

  return (
    <>
      <div className={styles.IconWithTitle}>
        <Link to={`/${params.slug}/profile/gallery`} className={styles.link}>
          <div className={styles.link__imageWrap}>
            <img src={galleryIcon} alt="gallery icon" />
          </div>
          <h1 className={styles.labelUnderIcon}>Gallery</h1>
        </Link>
      </div>
    </>
  );
};

export default PostMiddleIcons;
