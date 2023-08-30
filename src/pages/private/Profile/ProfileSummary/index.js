import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ProfileSummary.module.scss";
import routes from "../../../../routes";
import { followChatEditHandler } from "../helpers";

import ClipBoardCopied from "../../../../components/ClipBoardCopied";
import Avatar from "../../../../components/Avatar";
import Button from "../../../../components/Button";
import chaticonV1 from "../../../../static/icons/chaticonV1.svg";
import pencilIcon from "../../../../static/icons/pencil.png";
import triangleInCircle from "../../../../static/icons/triangleInCircle.svg";
import editiconV1 from "../../../../static/icons/editiconV1.svg";
import followiconV1 from "../../../../static/icons/followiconV1.svg";
import threeDotIcon from "../../../../static/icons/union.png";
import AvatarProfileDesktop from "../../../../components/AvatarProfileDesktop";
import ProfileModal from "../../../../components/Modal/ProfileModal";
import shareiconV1 from "../../../../static/icons/shareiconV1.svg";

const ProfileSummary = ({
  viewAs,
  isPublic,
  isShareClicked,
  setIsShareClicked,
  onShareHandler,
  isFollowing,
  followUnfollow,
  setIsProfileSettingsOpened,
  setIsQRCodeOpened,
}) => {
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.authReducer);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [
    isEditProfileModalMenuVisible,
    setEditProfileModalMenuVisible,
  ] = useState(false);

  const foreignBrandInfo = useSelector(
    (state) => state.profileReducer.profileInfo
  );
  const { roomsSkipNum } = useSelector((state) => state.chatReducer);
  const profileFullName = viewAs
    ? foreignBrandInfo && foreignBrandInfo.name
    : userInfo.profile
    ? `${userInfo.profile.first_name} ${userInfo.profile.last_name}`
    : userInfo.name;
  const profileAddress = viewAs
    ? foreignBrandInfo &&
      foreignBrandInfo.city &&
      `${foreignBrandInfo.city.city}, ${foreignBrandInfo.city.country.name}`
    : userInfo.city
    ? `${userInfo.city.city}, ${userInfo.city.country.name}`
    : "";
  const followingPath = isPublic
    ? routes.prelogin
    : viewAs
    ? `/${viewAs}/following`
    : routes.following;
  const spinsPath = isPublic
    ? routes.prelogin
    : viewAs
    ? `/${viewAs}/spins`
    : routes.spins;
  const chatEditHandler = () => {
    followChatEditHandler(
      isPublic,
      history,
      viewAs,
      userInfo,
      foreignBrandInfo,
      setIsProfileSettingsOpened,
      followUnfollow
    );
  };
  const openEditProfileModal = () => {
    setEditProfileModalMenuVisible(true);
  };

  return (
    <div className={styles.profileSummaryWrapperContainer}>
      {isMenuVisible && (
        <div className={styles.ModalWrap}>
          <div className={styles.MenuModal}>
            <div>
              <img
                src={pencilIcon}
                className={styles.MenuModalIcon}
                onClick={openEditProfileModal}
              />
              <span
                className={styles.MenuModalText}
                onClick={openEditProfileModal}
              >
                Edit Profile
              </span>
            </div>
          </div>
          <div
            className={styles.ModalWrap__overlay}
            onClick={() => {
              setIsMenuVisible(false);
            }}
          ></div>
        </div>
      )}
      {isEditProfileModalMenuVisible && (
        <ProfileModal
          onClose={() => closeModal(true)}
          goBack={() => setCurrentSection(null)}
        />
      )}

      <div className={styles.profileSummaryWrapper}>
        <figure
          className={styles.profilePhoto}
          onClick={() => setIsQRCodeOpened(true)}
        >
          <div className={styles.mobileAvatar}>
            <Avatar
              url={
                viewAs
                  ? foreignBrandInfo && foreignBrandInfo.image.url
                  : userInfo.image.url
              }
              isBrand={false}
            />
          </div>
          <div className={styles.desktopAvatar}>
            <AvatarProfileDesktop
              url={
                viewAs
                  ? foreignBrandInfo && foreignBrandInfo.image.url
                  : userInfo.image.url
              }
              isBrand={false}
            />
          </div>
        </figure>
        <div className={styles.profileSummaryInfo}>
          <div>
            <span className={styles.profileFullName}>{profileFullName}</span>
            <address className={styles.profileAddress}>
              {profileAddress}
            </address>
            {viewAs
              ? foreignBrandInfo &&
                foreignBrandInfo.business_role && (
                  <div className={styles.roleHashTag}>
                    #{foreignBrandInfo.business_role}
                  </div>
                )
              : userInfo &&
                userInfo.business_role && (
                  <div className={styles.roleHashTag}>
                    #{userInfo.business_role}
                  </div>
                )}
          </div>

          <div
            className={styles.profileCounters}
            onClick={() => {
              if (isPublic) {
                history.push(routes.prelogin);
              }
            }}
          >
            {/* <div className={styles.profileCounter}>
              <Link to={followingPath}>
                <span className={styles.counter}>
                  {foreignBrandInfo && foreignBrandInfo.following}
                </span>
                <span className={styles.label}>FOLLOWING</span>
              </Link>
            </div> */}

            <div className={styles.profileCounter}>
              <Link to={spinsPath}>
                <span className={styles.counter}>
                  {foreignBrandInfo?.giveaways}
                </span>
                <span className={styles.label}>SPINS</span>
              </Link>
            </div>
          </div>
          {isPublic || (viewAs && userInfo && viewAs !== userInfo.slug) ? (
            <>
              <div
                className={styles.share}
                onClick={() => setIsQRCodeOpened(true)}
              >
                <span className={styles.shareText}>SHARE</span>
              </div>
            </>
          ) : (
            <>
              <div className={styles.more}>
                <img
                  src={threeDotIcon}
                  onClick={() => {
                    setIsMenuVisible(true);
                  }}
                />
              </div>
            </>
          )}

          <div className={styles.profileButtons}>
            {isShareClicked && (
              <ClipBoardCopied setIsActive={setIsShareClicked} />
            )}
            <div
              className={styles.shareButton}
              type="button"
              size="large"
              color="transparent"
              onClick={onShareHandler}
            >
              <></>
            </div>
            {isFollowing ? (
              <div
                type="button"
                size="large"
                onClick={chatEditHandler}
                // className={`${styles.followingButton} ${
                //   viewAs &&
                //   userInfo &&
                //   viewAs !== userInfo.slug &&
                //   isFollowing &&
                //   styles.chatButtonWrapper
                // }`}
              >
                {isPublic ||
                (viewAs && userInfo && viewAs !== userInfo.slug) ? (
                  isFollowing ? (
                    <div className={styles.chat}>
                      <div className={styles.chatText}>MESSAGE</div>
                    </div>
                  ) : (
                    <div className={styles.triangle}>
                      <img src={triangleInCircle} alt="TriangleInCircle" />
                    </div>
                  )
                ) : (
                  <>
                    Edit
                    <img src={editiconV1} alt="Edit icon" />
                  </>
                )}
              </div>
            ) : (
              <div
                type="button"
                size="large"
                onClick={() => {
                  if (isPublic) {
                    // Unauthe user click follow
                    sessionStorage.setItem(
                      "lastUrl",
                      history.location.pathname
                    );
                    history.push(routes.prelogin);
                  } else if (viewAs && userInfo && viewAs !== userInfo.slug) {
                    followUnfollow();
                  } else {
                    setIsProfileSettingsOpened(true);
                  }
                }}
                className={
                  isPublic || (viewAs && userInfo && viewAs !== userInfo.slug)
                    ? isFollowing
                      ? styles.unfollowingButton
                      : styles.followingButton
                    : styles.editButton
                }
              >
                {isPublic ||
                (viewAs && userInfo && viewAs !== userInfo.slug) ? (
                  !isFollowing ? (
                    <div className={styles.following}>
                      <div className={styles.followingText}>Follow</div>
                    </div>
                  ) : (
                    <div className={styles.triangle}>
                      <img src={triangleInCircle} alt="TriangleInCircle" />
                    </div>
                  )
                ) : (
                  <>
                    <></>
                    {/* Edit
                  <img src={editiconV1} alt="Edit icon" /> */}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
