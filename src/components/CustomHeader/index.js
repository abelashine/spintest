import React, {useEffect, useState} from 'react';
import styles from "./CustomHeader.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import routes from "../../routes";
import {profileActions} from "../../actions/profile";
import {foreignProfilebrandInfo} from "../../api";
import UnsubscribedUserModal from "../Modal/SubscriptionModals/UnsubscribedBrandModal";
import backArrow from "../../static/icons/back-arrow.svg";
import NotificationsBurger from "../NotificationsBurger";
import MenuModal from "../Modal/MenuModal";
import SwitchProfile from "../Modal/SwitchProfile";
import {unsubscribedActions} from "../../actions/errors/unsubscribed";
import plusBtnV1 from "../../static/icons/plusBtnV1.svg";
import solid_black from "../../static/icons/solid_black.svg";
import chaticonV3 from "../../static/icons/chaticonV3.svg";
import spinByLablacoLogoWhite from "../../static/images/logo/spinByLablacoLogoWhite.svg";

const CustomHeader = ({
    isPublic= false,
    viewAs= "",
    isUnreadMessage= true
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
            <div className={styles.CustomHeader}>
                <UnsubscribedUserModal/>
                {/* FIXME: make universal condition  */}
                {pathname === `/${viewAs}/following` ||
                pathname === `/${viewAs}/spins` ||
                pathname === `/${viewAs}/profile/chat` ? (
                    <div className={styles.backButton} onClick={() => history.goBack()}>
                        <img src={backArrow} alt="Back arrow" />
                    </div>
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

                <div
                    className={styles.profileSwitcher}
                    onClick={() => {
                        if (store && viewAs && viewAs === store.slug && !isPublic) {
                            setIsSwitchOpened(true);
                        }
                    }}
                >
                    <img
                      className={styles.profileImage}
                      src={spinByLablacoLogoWhite}
                      alt={"Spin by Lablaco logo white"}
                    />
                    {store && viewAs && viewAs === store.slug && !isPublic && (
                        <div className={styles.arrow}>
                            <img src={backArrow} alt="Back arrow" />
                        </div>
                    )}
                </div>
                <SwitchProfile
                    isOpened={isSwitchOpened}
                    onClose={() => setIsSwitchOpened(false)}
                />

                <div className={styles.navBar}>
                    {!!userInfo?.business_role && (
                        <button
                            style={{
                                display: "none"
                            }}
                            className={styles.uploadButton}
                            onClick={() => {
                                if (isPublic) {
                                    history.push(routes.prelogin);
                                } else {
                                    if (userSubscription) {
                                        openUploadSelection();
                                    } else {
                                        dispatch(unsubscribedActions.showUnsubscribedUserModal())
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
            </div>
        )
    );
};

export default CustomHeader;
