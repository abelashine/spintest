import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import styles from "./Profile.module.scss";
import routes from "../../../routes";
import { follow } from "../../../api";
import tabs from "./tabs";
import { profileActions } from "../../../actions/profile";

import ProfileHeaderHome from "../../../components/ProfileHeaderHome";
import TabsGroup from "../../../components/TabsGroup";
import ProfileModal from "../../../components/Modal/ProfileModal";
import GiveBackConfirmationModal from "../../../components/Modal/GiveBackConfirmationModal";
import QRCodeModal from "./QRCodeModal";
import ProfileSummary from "./ProfileSummary";
import ActiveTabContent from "./ActiveTabContent";
import { Helmet } from "react-helmet";
import Button from "../../../components/Button";
import BusinessProfileModal from "../../../components/Modal/BusinessProfileModal";

const Profile = ({
  match,
  location,
  isPublic,
  setIsUploadSelectionOpened,
  isUnreadMessage,
}) => {
  const history = useHistory();
  const url = useRouteMatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const foreignBrandInfo = useSelector(
    (state) => state.profileReducer.profileInfo
  );

  const { profileInfo, givebackData, usualTabKind, tabKind } = useSelector(
    (state) => state.profileReducer
  );
  const [isShareClicked, setIsShareClicked] = useState(false);
  const viewAs = useCallback(() => match.params.slug, [match.params.slug]);
  const [isQRCodeOpened, setIsQRCodeOpened] = useState(false);
  const [isGiveBackOpened, setIsGiveBackOpened] = useState(false);
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(null);
  const [isProfileSettingsOpened, setIsProfileSettingsOpened] = useState(false);
  const pageDescription = `@${profileInfo?.slug} • Join SPIN and experience curated Web3 marketplace for phygital Fashion, Art and Architecture.`;
  const [shouldRenderPage, setShouldRenderPage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (url.url.split("/")[1] === "giveback") {
      const givebackObj = {
        old_owner: match.params.old_owner,
        product_link: match.params.product_link,
        brand_accepted: true,
      };
      dispatch(profileActions.setGiveBackData(givebackObj));
    }
  }, []);

  useEffect(() => {
    sessionStorage.removeItem("lastUrl");
  }, []);

  useEffect(() => {
    if (givebackData?.old_owner && givebackData?.product_link) {
      if (userInfo.slug === givebackData?.old_owner) {
        setIsGiveBackOpened(true);
      } else {
        dispatch(profileActions.setGiveBackData(null));
        history.push(`/`);
      }
    }
  }, [givebackData, location, match, userInfo, history]);

  useEffect(() => {
    if (viewAs()) {
      if (profileInfo && profileInfo.business_role) {
        history.push(`/${viewAs()}/profile/${tabKind}`);
      } else if (
        profileInfo &&
        !profileInfo.business_role &&
        profileInfo?.slug === userInfo?.slug
      ) {
        history.push(`/${viewAs()}/profile/${usualTabKind}`);
      } else if (
        profileInfo &&
        !profileInfo.business_role &&
        profileInfo?.slug !== userInfo?.slug
      ) {
        history.push(`/${viewAs()}/profile/store`);
      }
    } else if (!viewAs()) {
      if (userInfo && userInfo.business_role) {
        history.push(`/${userInfo.slug}/profile/${tabKind}`);
      } else if (
        userInfo &&
        !userInfo.business_role &&
        profileInfo?.slug === userInfo?.slug
      ) {
        history.push(`/${userInfo.slug}/profile/${usualTabKind}`);
      } else if (
        userInfo &&
        !userInfo.business_role &&
        profileInfo?.slug !== userInfo?.slug
      ) {
        history.push(`/${userInfo.slug}/profile/store`);
      }
    }
  }, [viewAs, history, userInfo, profileInfo]);

  useEffect(() => {
    const slugToArg = viewAs() || userInfo.slug;
    dispatch(
      profileActions.fetchProfileData(slugToArg, history, (res) =>
        setIsFollowing(res)
      )
    );
  }, [viewAs]);

  const changeActivetab = (activeTab) => {
    history.push(
      viewAs() ? `/${viewAs()}/profile/${activeTab}` : routes[activeTab]
    );
    if (!profileInfo.business_role) {
      dispatch(profileActions.setUsualTabKind(activeTab));
    } else {
      dispatch(profileActions.setTabKind(activeTab));
    }
  };

  const followUnfollow = () => {
    !isFollowing && follow(match.params.slug).then(() => setIsFollowing(true));
  };

  const onShareHandler = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${viewAs()}/profile`
    );
    setIsShareClicked(true);
  };

  useEffect(() => {
    const value = localStorage.getItem("firsttime");
    if (value === "true") {
      setShouldRenderPage(true);
    }
  }, []);
  const removeFirstTime = () => {
    localStorage.removeItem("firsttime");
    setShouldRenderPage(false);
  };
  
  return (
    <div className={styles.Profile}>
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href={`${process.env.PUBLIC_URL}/favicon.png`} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content={pageDescription} />
        <meta property="og:image" content={profileInfo?.image?.url} />
        <meta
          name="keywords"
          content="circularfashionspin, fashiontech, sustainablefashion, sustainablefashion, circulareconomy,
          blockchain, tokenize, tokenization, circularretail, transparency, socialcommerce, shopping, influencers,
          influencer, brand, brands, store, stores, design, fashion, sustainability, circularity"
        />
      </Helmet>
      <div className={styles.profileInfo}>
        <GiveBackConfirmationModal
          isOpened={isGiveBackOpened}
          givebackData={givebackData}
          onClose={() => setIsGiveBackOpened(false)}
        />

        <div>
          <div className={styles.profileHeader}>
            <ProfileHeaderHome
              viewAs={viewAs()}
              isPublic={isPublic}
              profileTab={match.params.activeTab}
              setIsUploadSelectionOpened={setIsUploadSelectionOpened}
              isUnreadMessage={isUnreadMessage}
              isBrand={
                viewAs && foreignBrandInfo
                  ? foreignBrandInfo?.business_role
                  : userInfo
                  ? userInfo?.business_role
                  : null
              }
            />
          </div>
          {showModal && (
            <BusinessProfileModal
              onClose={closeModal}
              goBack={() => console.log("dang")}
            />
          )}
          {shouldRenderPage ? (
            <div className={styles.overlay}>
              <div className={styles.content}>
                <div className={styles.welcomeTitle}>WELCOME TO SPIN</div>
                <div className={styles.welcomeContent}>
                  If you are a creator or a brand, you can set up your business
                  account for free
                </div>
                <Button
                  className={styles.button}
                  onClick={() => {
                    removeFirstTime();
                    openModal();
                  }}
                >
                  SET UP BUSINESS ACCOUNT
                </Button>

                <div className={styles.welcomeContent}>
                  Instead, if you are looking for creators
                </div>
                <Button
                  onClick={() => {
                    removeFirstTime();
                  }}
                  className={styles.exploring}
                >
                  <div className={styles.exploringContent}>START EXPLORING</div>
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <ProfileSummary
          viewAs={viewAs()}
          isPublic={isPublic}
          isShareClicked={isShareClicked}
          setIsShareClicked={setIsShareClicked}
          onShareHandler={onShareHandler}
          isFollowing={isFollowing}
          followUnfollow={followUnfollow}
          setIsProfileSettingsOpened={setIsProfileSettingsOpened}
          setIsQRCodeOpened={setIsQRCodeOpened}
        />
      </div>

      <TabsGroup
        tabs={tabs(viewAs(), userInfo, profileInfo)}
        activeTab={profileInfo?.business_role ? tabKind : usualTabKind}
        onTabChange={changeActivetab}
        profile={true}
      />

      <ActiveTabContent viewAs={viewAs()} />
      {isProfileSettingsOpened && (
        <ProfileModal
          onClose={() => setIsProfileSettingsOpened(false)}
          crossBtn={isProfileSettingsOpened}
        />
      )}
      {isQRCodeOpened && (
        <QRCodeModal
          setIsQRCodeOpened={setIsQRCodeOpened}
          profileInfo={profileInfo}
        />
      )}
    </div>  
  );
};
export default Profile;
