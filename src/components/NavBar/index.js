import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styles from "./NavBar.module.scss";
import routes from "../../routes";
import chaticonV2 from "../../static/icons/inbox.png";
import upload from "../../static/icons/upload.png";
import { profileActions } from "../../actions/profile";
import { foreignProfilebrandInfo } from "../../api";
import { unsubscribedActions } from "../../actions/errors/unsubscribed";
import solid_black from "../../static/icons/solid_black.svg";
import home_logo from "../../static/icons/Home.png";
import ar_logo from "../../static/icons/AR.png";
import ModalBackground from "../../static/images/my_world.png";
import GetWorld from "../Modal/GetWorld";
import spin from "../../static/icons/spin-v2.png";
import menu from "../../static/icons/menu.png";
import NavBarModal from "./NavBarModal";
import MenuModal from "../Modal/MenuModal";
import closeImage from "../../static/icons/close.png";

const Navbar = ({ isPublic, setIsUploadSelectionOpened, isUnreadMessage }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const [userSubscription, setUserSubscription] = useState(false);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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
    history.location.pathname !== "/subscription" &&
    (isMenuVisible ? (
      <div>
        <div className={styles.MenuBar}>
          <img
            src={closeImage}
            onClick={() => {
              setIsMenuVisible(false);
            }}
            alt="Close"
          />
          <img className={styles.profileImage} src={spin} alt={"spin"} />
          <div></div>
        </div>
        <NavBarModal onClose={() => setIsMenuVisible(false)} />
      </div>
    ) : (
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
            <Link to={"/"}>
              <img src={spin} />
            </Link>{" "}
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
        {
          <div className={styles.menu_logo}>
            <div
              onClick={() => {
                setIsMenuVisible(true);
              }}
            >
              <button style={{ borderRadius: "0" }}>
                <img src={menu} alt={"Menu icon"} />
              </button>
            </div>
          </div>
        }
        {!isPublic && userInfo && (
          <div className={styles.ar_logo}>
            <Link>
              <button style={{ borderRadius: "0" }}>
                <img src={ar_logo} alt="ARicon" />
              </button>
            </Link>
          </div>
        )}{" "}
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
            <img src={upload} alt="Plus button" />
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
    ))
  );
};
export default Navbar;
