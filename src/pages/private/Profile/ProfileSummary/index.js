import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ProfileSummary.module.scss";
import routes from "../../../../routes";
import { followChatEditHandler } from "../helpers";

import ClipBoardCopied from "../../../../components/ClipBoardCopied";
import Avatar from "../../../../components/Avatar";
import Button from "../../../../components/Button";
import chaticonV1 from "../../../../static/icons/chaticonV1.svg";
import shareiconV1 from "../../../../static/icons/shareiconV1.svg";
import triangleInCircle from "../../../../static/icons/triangleInCircle.svg";
import editiconV1 from "../../../../static/icons/editiconV1.svg";
import followiconV1 from "../../../../static/icons/followiconV1.svg";

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

  return (
    <div className={styles.profileSummaryWrapper}>
      <div className={styles.profileSummaryInfo}>
        <div>
          <span className={styles.profileFullName}>{profileFullName}</span>
          <address className={styles.profileAddress}>{profileAddress}</address>
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
          <div className={styles.profileCounter}>
            <Link to={followingPath}>
              <span className={styles.counter}>
                {foreignBrandInfo && foreignBrandInfo.following}
              </span>
              <span className={styles.label}>Following</span>
            </Link>
          </div>
          <div className={styles.profileCounter}>
            <Link to={spinsPath}>
              <span className={styles.counter}>
                {foreignBrandInfo?.giveaways}
              </span>
              <span className={styles.label}>Spins</span>
            </Link>
          </div>
        </div>
        <div className={styles.profileButtons}>
          {isShareClicked && (
            <ClipBoardCopied setIsActive={setIsShareClicked} />
          )}
          <Button
            className={styles.shareButton}
            type="button"
            size="large"
            color="transparent"
            onClick={onShareHandler}
          >
            Share <img src={shareiconV1} alt="Share icon" />
          </Button>
          {isFollowing ? (
            <Button
              type="button"
              size="large"
              onClick={chatEditHandler}
              className={`${styles.followingButton} ${
                viewAs &&
                userInfo &&
                viewAs !== userInfo.slug &&
                isFollowing &&
                styles.chatButtonWrapper
              }`}
            >
              {isPublic || (viewAs && userInfo && viewAs !== userInfo.slug) ? (
                isFollowing ? (
                  <div className={styles.chatButton}>
                    <p>chat</p>
                    <img src={chaticonV1} alt="Chat icon" />
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
            </Button>
          ) : (
            <Button
              type="button"
              size="large"
              onClick={() => {
                if (isPublic) {
                  // Unauthe user click follow
                  sessionStorage.setItem("lastUrl", history.location.pathname);
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
              {isPublic || (viewAs && userInfo && viewAs !== userInfo.slug) ? (
                !isFollowing ? (
                  <>
                    Follow
                    <div className={styles.triangle}>
                      <img src={followiconV1} alt="Follow icon" />
                    </div>
                  </>
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
            </Button>
          )}
        </div>
        <figure
          className={styles.profilePhoto}
          onClick={() => setIsQRCodeOpened(true)}
        >
          <Avatar
            url={
              viewAs
                ? foreignBrandInfo && foreignBrandInfo.image.url
                : userInfo.image.url
            }
            isBrand={false}
          />
        </figure>
      </div>
      <figure
        className={styles.profilePhoto}
        onClick={() => setIsQRCodeOpened(true)}
      >
        <Avatar
          url={
            viewAs
              ? foreignBrandInfo && foreignBrandInfo.image.url
              : userInfo.image.url
          }
          isBrand={false}
        />
      </figure>
    </div>
  );
};

export default ProfileSummary;
