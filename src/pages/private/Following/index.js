import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileActions } from "../../../actions/profile";
import styles from "./Following.module.scss";
import { followingTabs } from "./helpers";

import ProfileHeader from "../../../components/ProfileHeader";
import TabsGroup from "../../../components/TabsGroup";
import FollowingButtons from "./FollowingButtons";
import FollowingItem from "./FollowingItem";
import ProfileModal from "../../../components/Modal/ProfileModal";
import Avatar from "../../../components/Avatar";

export default ({ match, isUnreadMessage }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const { followingBrands, followingStores, profileInfo } = useSelector(
    (state) => state.profileReducer
  );
  const [activeTab, setActiveTab] = useState("profiles");
  const [brandsPageNumber, setBrandsPageNumber] = useState(0);
  const [storesPageNumber, setStoresPageNumber] = useState(0);
  const brandsRef = useRef(null);
  const storesRef = useRef(null);
  const [isProfileSettingsOpened, setIsProfileSettingsOpened] = useState(false);

  const viewAs = useCallback(() => match.params.slug, [match.params.slug]);

  useEffect(() => {
    dispatch(
      profileActions.fetchFollowingBrands(
        viewAs() || userInfo.slug,
        brandsPageNumber
      )
    );
  }, [viewAs, userInfo.slug, brandsPageNumber]);

  useEffect(() => {
    dispatch(
      profileActions.fetchFollowingStores(
        viewAs() || userInfo.slug,
        storesPageNumber
      )
    );
  }, [viewAs, userInfo.slug, storesPageNumber]);

  useEffect(() => {
    document.addEventListener("scroll", scroll);

    return () => {
      document.removeEventListener("scroll", scroll);
      dispatch(profileActions.removeFollowing());
    };
  }, []);

  const scroll = () => {
    if (
      brandsRef.current &&
      window.innerHeight >= brandsRef.current.getBoundingClientRect().bottom
    ) {
      setBrandsPageNumber((prevState) => prevState + 1);
    }

    if (
      storesRef.current &&
      window.innerHeight >= storesRef.current.getBoundingClientRect().bottom
    ) {
      setStoresPageNumber((prevState) => prevState + 1);
    }
  };

  const changeActivetab = (activeTab) => {
    setActiveTab(activeTab);
  };

  const isBrand =
    viewAs() && profileInfo
      ? profileInfo.business_role
      : userInfo
      ? userInfo.business_role
      : null;
  const avatarLink = viewAs()
    ? profileInfo && profileInfo.image.url
    : userInfo && userInfo.image.url;
  return (
    <div className={styles.Following}>
      {isProfileSettingsOpened && (
        <ProfileModal
          onClose={() => setIsProfileSettingsOpened(false)}
          crossBtn={true}
        />
      )}
      <header>
        <ProfileHeader viewAs={viewAs()} isUnreadMessage={isUnreadMessage} />
      </header>
      <div className={styles.followingInfo}>
        <div className={styles.summary}>
          <h1>Following</h1>
          {profileInfo && (
            <div>
              <span></span>
              {profileInfo.following} Following
            </div>
          )}
          <FollowingButtons
            setIsProfileSettingsOpened={setIsProfileSettingsOpened}
            viewAs={viewAs()}
          />
        </div>
        <div className={styles.avatar}>
          <Avatar url={avatarLink} isBrand={isBrand} />
        </div>
      </div>
      <TabsGroup
        activeTab={activeTab}
        tabs={followingTabs}
        onTabChange={changeActivetab}
      />
      {activeTab === "profiles" ? (
        <ul className={styles.followingList} ref={brandsRef}>
          {followingBrands &&
            followingBrands.map((item, index) => {
              return (
                item.slug !== userInfo.slug && (
                  <li key={index}>
                    <FollowingItem data={item} withAvatar />
                  </li>
                )
              );
            })}
        </ul>
      ) : (
        <ul className={styles.followingList} ref={storesRef}>
          {followingStores &&
            followingStores.map((item, index) => (
              <li key={index}>
                <FollowingItem data={item} withAvatar />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
