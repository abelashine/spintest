import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import styles from "./ProfileHeader.module.scss";
import routes from "../../routes";
import yellowMarkCircle from "../../static/icons/yellowMarkCircle.svg";
import chaticonV3 from "../../static/icons/chaticonV3.svg";
import plusBtnV1 from "../../static/icons/plusBtnV1.svg";
import backArrow from "../../static/icons/back-long.png";
import backArrow2 from "../../static/icons/back-arrow.svg";
import { profileActions } from "../../actions/profile";

import NotificationsBurger from "../NotificationsBurger";
import MenuModal from "../Modal/MenuModal";
import SwitchProfile from "../Modal/SwitchProfile";
import { foreignProfilebrandInfo } from "../../api";
import UnsubscribedUserModal from "../Modal/SubscriptionModals/UnsubscribedBrandModal";
import { unsubscribedActions } from "../../actions/errors/unsubscribed";
import solid_black from "../../static/icons/solid_black.svg";

const ProfileHeader = ({
  viewAs,
  isPublic,
  profileTab = "store",
  setIsUploadSelectionOpened,
  isUnreadMessage,
  isBrand,
}) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.authReducer.userInfo);
  const { slug } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSwitchOpened, setIsSwitchOpened] = useState(false);
  const userInfo = useSelector((state) => state.authReducer.userInfo);

  const [userSubscription, setUserSubscription] = useState(false);
  console.log(isSwitchOpened);

  const openUploadSelection = () => {
    setIsUploadSelectionOpened(true);
    document.body.style.overflow = "hidden";
  };

  const avatarHandler = () => {
    if (isPublic) {
      history.push(routes.prelogin);
    } else if (userInfo?.business_role) {
      history.push(`/${userInfo.slug}/profile/art`);
      dispatch(profileActions.setTabKind("art"));
    } else {
      dispatch(profileActions.setUsualTabKind("vault"));
      history.push(`/${userInfo.slug}/profile/vault`);
    }
  };

  const getProfileSubscriptions = async () => {
    const { error, response } = await foreignProfilebrandInfo(userInfo.slug);
    if (error) {
      history.push("/error");
    } else {
      try {
        if (response.subscription.active) {
          setUserSubscription(true);
        }
      } catch {
        setUserSubscription(false);
      }
    }
  };

  useEffect(() => {
    if (userInfo?.business_role) {
      getProfileSubscriptions();
    }
  }, [userInfo]);

  return (
    (store || isPublic) && (
      <div className={styles.ProfileHeader}>
        <UnsubscribedUserModal />
        {/* FIXME: make universal condition  */}
        {pathname === `/${viewAs}/following` ||
        pathname === `/${viewAs}/spins` ||
        pathname === `/${viewAs}/profile/chat` ? (
          <></>
        ) : (
          <NotificationsBurger
            onClick={() => {
              if (isPublic) {
                history.push(routes.prelogin);
              } else {
                setIsMenuVisible(true);
              }
            }}
          />
        )}

        {isMenuVisible && <MenuModal onClose={() => setIsMenuVisible(false)} />}
        <div className={styles.profileBorder}></div>
        <div
          className={styles.profileSwitcher}
          onClick={() => {
            if (store && viewAs && viewAs === store.slug && !isPublic) {
              setIsSwitchOpened(true);
            }
          }}
        >
          <div>
            <span className={styles.profileContainer}>
              <div className={styles.backArrow}>
                <img
                  src={backArrow}
                  alt="Back arrow"
                  onClick={() => history.goBack()}
                />
              </div>
              <span className={styles.profileName}>
                {!viewAs ? store && store.slug : slug || ""}
              </span>
              {store && viewAs && viewAs === store.slug && !isPublic && (
                <div className={styles.arrow}>
                  <img width={10} src={backArrow2} alt="Back arrow" />
                </div>
              )}
            </span>
            {!!isBrand ? (
              <span data-icon="bluemark">
                <svg
                  style={{ maxWidth: 10, height: 10 }}
                  viewBox="0 0 15 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    transform="translate(.4 .5)"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <ellipse
                      fill="#239EFE"
                      cx="7.1"
                      cy="6.9"
                      rx="7.1"
                      ry="6.9"
                    />
                    <path
                      d="M9.3 5l.5.5a.6.6 0 010 .8L7.2 8.8l-.4.4-.2.1h-.2L6 9.2 4.3 7.6a.6.6 0 010-.9l.4-.4c.3-.2.6-.2.9 0l.8.8 2.1-2c.2-.2.6-.2.8 0z"
                      fill="#FFF"
                    />
                  </g>
                </svg>
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <SwitchProfile
          isOpened={isSwitchOpened}
          onClose={() => {
            setIsSwitchOpened(false);
          }}
        />

        <div className={styles.navBar}>
          {!!userInfo?.business_role && (
            <button
              className={styles.uploadButton}
              onClick={() => {
                if (isPublic) {
                  history.push(routes.prelogin);
                } else {
                  if (userSubscription) {
                    openUploadSelection();
                  } else {
                    dispatch(unsubscribedActions.showUnsubscribedUserModal());
                  }
                }
              }}
            >
              <img src={plusBtnV1} alt="Plus button" />
            </button>
          )}
          {!isPublic && (
            <button className={styles.avatarButton} onClick={avatarHandler}>
              <img
                src={store.image.url}
                alt="avatar"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = solid_black;
                }}
              />
            </button>
          )}

          {!isPublic && userInfo && (
            <Link to={`/${userInfo.slug}/profile/chat`}>
              <div className={styles.chatIcon}>
                <img src={chaticonV3} alt="chat icon" />
                {isUnreadMessage && (
                  <span className={styles.underChatRedDot}></span>
                )}
              </div>
            </Link>
          )}
        </div>

        <div
          style={{ display: "none" }}
          className={`${styles.profileCoins} ${isPublic ? styles.hidden : ""}`}
        >
          <span className={styles.coinsAmount}>
            {store && store.lablacoin > 0 ? `+${store.lablacoin}` : 0}
          </span>
          <img src={yellowMarkCircle} />
        </div>
      </div>
    )
  );
};
export default ProfileHeader;
