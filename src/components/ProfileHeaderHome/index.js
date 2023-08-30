import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import styles from "./ProfileHeaderHome.module.scss";
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
import blueMarkIcon from "../../static/icons/blue-3.png";

const ProfileHeaderHome = ({
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
          <div className={styles.backArrowParent}>
            <img
              width={21}
              style={{ marginTop: 7 }}
              src={backArrow}
              alt="Back arrow"
              onClick={() => history.goBack()}
            />
          </div>
        ) : (
          <div className={styles.backArrowParent}>
            <img
              width={21}
              style={{ marginTop: 7, position: "relative", top: 8 }}
              className={styles.backArrow}
              src={backArrow}
              alt="Back arrow"
              onClick={() => history.goBack()}
            />
          </div>
        )}

        {isMenuVisible && <MenuModal onClose={() => setIsMenuVisible(false)} />}

        <div
          className={styles.profileSwitcher}
          onClick={() => {
            if (store && viewAs && viewAs === store.slug && !isPublic) {
              setIsSwitchOpened(true);
            }
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
            }}
          >
            <span className={styles.profileName}>
              {!viewAs ? store && store.slug : slug || ""}
            </span>
            {!!isBrand ? (
              <img
                src={blueMarkIcon}
                className={styles.blueMarkIcon}
                style={{ marginLeft: 0 ,marginTop:20}}
              />
            ) : (
              <></>
            )}
            {store && viewAs && viewAs === store.slug && !isPublic && (
              <div className={styles.arrow}></div>
            )}
            <SwitchProfile
              isOpened={isSwitchOpened}
              onClose={() => {
                setIsSwitchOpened(false);
              }}
            />
          </div>
          <div className={styles.arrow}>
            <img width={10} src={backArrow2} alt="Back arrow" />
          </div>
          {/* {store && viewAs && viewAs === store.slug && !isPublic && isBrand && (
            <div className={styles.arrow}></div>
          )} */}
        </div>
      </div>
    )
  );
};
export default ProfileHeaderHome;
