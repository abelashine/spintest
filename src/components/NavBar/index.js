import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styles from "./NavBar.module.scss";
import routes from "../../routes";
import chaticonV2 from "../../static/icons/Inbox.png";
import plusBtnV1 from "../../static/icons/plusBtnV1.svg";
import { profileActions } from "../../actions/profile";
import { foreignProfilebrandInfo } from "../../api";
import { unsubscribedActions } from "../../actions/errors/unsubscribed";
import solid_black from "../../static/icons/solid_black.svg";
import home_logo from "../../static/icons/Home.png";
import ModalBackground from "../../static/images/my_world.png";
import GetWorld from "../Modal/GetWorld";
import spin from "../../static/icons/spin-v2.png";

const Navbar = ({ isPublic, setIsUploadSelectionOpened, isUnreadMessage }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const [userSubscription, setUserSubscription] = useState(false);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

  const onToggleModal = () => setIsOpenInfoModal((prev) => !prev);

  const openUploadSelection = () => {
    if (isPublic) {
      history.push(routes.prelogin);
    } else {
      setIsUploadSelectionOpened(true);
      document.body.style.overflow = "hidden";
    }
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
    if (userInfo.business_role) {
      getProfileSubscriptions();
    }
  }, [userInfo]);

  return (
    (isPublic || userInfo) &&
    history.location.pathname !== "/subscription" && (
      <div className={styles.NavBar}>
        {isOpenInfoModal ? (
          <GetWorld
            world={{
              image: ModalBackground,
            }}
            onClose={onToggleModal}
          />
        ) : (
          <></>
        )}
        {
          <div className={styles.brand}>
            <img src={spin} />
          </div>
        }
        {
          <div className={styles.home_logo}>
            <Link to={"/"}>
              <button style={{ borderRadius: "0" }}>
                <img src={home_logo} alt={"Home icon"} />
              </button>
            </Link>{" "}
          </div>
        }
        {!isPublic && userInfo && (
          <div className={styles.chat_logo}>
            <Link to={`/${userInfo.slug}/profile/chat`}>
              <button style={{ borderRadius: "0" }}>
                <img src={chaticonV2} alt="Chat icon" />
                {isUnreadMessage && (
                  <span className={styles.underChatRedDot}></span>
                )}
              </button>
            </Link>
          </div>
        )}
        {!!userInfo?.business_role && (
          <button
            className={styles.uploadButton}
            onClick={() => {
              if (userSubscription) {
                openUploadSelection();
              } else {
                dispatch(unsubscribedActions.showUnsubscribedUserModal());
              }
            }}
          >
            <img src={plusBtnV1} alt="Plus button" />
          </button>
        )}
        <button className={styles.avatarButton} onClick={avatarHandler}>
          {userInfo ? (
            <div>
              <img
                src={userInfo.image.url}
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = solid_black;
                }}
              />
            </div>
          ) : (
            <div className={styles.emptyAvatar}></div>
          )}
        </button>
      </div>
    )
  );
};
export default Navbar;
