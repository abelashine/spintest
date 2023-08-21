import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Gallery.module.scss";
import { profileActions } from "../../../actions/profile";

import GalleryHeader from "./GalleryHeader";
import GallerySummary from "./GallerySummary";
import GalleryTabs from "./GalleryTabs";
import GalleryList from "./GalleryList";

const Gallery = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams();
  const { profileInfo } = useSelector((state) => state.profileReducer);
  useEffect(() => {
    if (!profileInfo) {
      dispatch(profileActions.fetchProfileData(slug, history));
    }
  }, []);

  useEffect(() => {
    dispatch(profileActions.fetchGalleryImages());
  }, []);

  if (!profileInfo) return null;
  return (
    <div className={styles.Gallery}>
      <GalleryHeader />
      <GallerySummary profileInfo={profileInfo} />
      <GalleryTabs />
      <GalleryList />
    </div>
  );
};

export default Gallery;
