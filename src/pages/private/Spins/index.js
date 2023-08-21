import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { profileActions } from "../../../actions/profile";
import { follow, unfollow } from "../../../api";
import styles from "./Spins.module.scss";

import ProfileHeader from "../../../components/ProfileHeader";
import Button from "../../../components/Button";
import ProfileModal from "../../../components/Modal/ProfileModal";
import Avatar from "../../../components/Avatar";

export default ({ match, isUnreadMessage }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const foreignBrandInfo = useSelector(
    (state) => state.profileReducer.profileInfo
  );
  const [isFollowing, setIsFollowing] = useState(null);
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const totalSpins = useSelector((state) => state.profileReducer.totalSpins);
  const [pageNumber, setPageNumber] = useState(0);
  const [isProfileSettingsOpened, setIsProfileSettingsOpened] = useState(false);
  const spinsRef = useRef(null);

  const viewAs = useCallback(() => match.params.slug, [match.params.slug]);

  useEffect(() => {
    const slug = viewAs() || userInfo.slug;
    dispatch(
      profileActions.fetchProfileData(slug, history, (res) =>
        setIsFollowing(res)
      )
    );
  }, [viewAs, userInfo.slug]);

  const scroll = () => {
    if (window.innerHeight >= spinsRef.current.getBoundingClientRect().bottom) {
      setPageNumber((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    dispatch(profileActions.fetchSpins(viewAs(), pageNumber));
  }, [dispatch, pageNumber, viewAs]);

  useEffect(() => {
    document.addEventListener("scroll", scroll);

    return () => {
      document.removeEventListener("scroll", scroll);
      dispatch(profileActions.removeSpins());
    };
  }, [dispatch]);

  const followUnfollow = () => {
    isFollowing
      ? unfollow(match.params.slug).then(() => setIsFollowing(false))
      : follow(match.params.slug).then(() => setIsFollowing(true));
  };

  return (
    <div className={styles.Spins}>
      <div className={styles.profileInfo}>
        <ProfileHeader viewAs={viewAs()} isUnreadMessage={isUnreadMessage} />
        <div className={styles.profileSummaryWrapper}>
          <div className={styles.profileSummaryInfo}>
            <span className={styles.profileFullName}>
              {viewAs()
                ? foreignBrandInfo && foreignBrandInfo.name
                : userInfo && userInfo.profile
                ? `${userInfo.profile.first_name} ${userInfo.profile.last_name}`
                : userInfo && userInfo.name}
            </span>
            <ul className={styles.impactInfo}>
              <li>
                <span>
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      transform="translate(1 1)"
                      stroke="#FFF"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <path
                        d="M9.17 13.52l-1.42.36-.05.02a.32.32 0 00-.21.09.3.3 0 00-.1.21l-.04 1.48c0 .09.03.16.09.22.06.07.13.1.22.1a.3.3 0 00.22-.08.3.3 0 00.1-.22l.03-.93c.75.62 1.64.94 2.65.97a4.35 4.35 0 003.18-1.2v.01l.29-.3a.3.3 0 00-.04-.44.3.3 0 00-.23-.07.32.32 0 00-.21.1 2.39 2.39 0 01-.33.32h.02c-.76.67-1.64.99-2.66.96a3.66 3.66 0 01-2.2-.78l.85-.22a.3.3 0 00.2-.14.29.29 0 00.03-.24.3.3 0 00-.15-.19.32.32 0 00-.24-.03h0zM7.61 5.87a.3.3 0 00.1.43l.8.48a4.2 4.2 0 00-2.15 1.79h0a4.2 4.2 0 00-.53 3.2v-.02l.03.15.1.36a.3.3 0 00.16.18.3.3 0 00.24.02.28.28 0 00.18-.16.28.28 0 00.02-.24 6.03 6.03 0 01-.11-.42 3.6 3.6 0 01.46-2.75h0a3.6 3.6 0 011.76-1.5l-.23.84a.3.3 0 00.04.24c.04.07.1.12.19.14a.3.3 0 00.24-.03c.07-.04.12-.1.14-.19L9.43 7a.2.2 0 00.02-.04.28.28 0 00.02-.23.3.3 0 00-.14-.2l-1.28-.76a.32.32 0 00-.44.1h0zm8.86 5.05a.34.34 0 00-.24.02l-.85.43a4.1 4.1 0 00-.4-2.77h0A4.28 4.28 0 0012 6.32a.33.33 0 00-.24.04.31.31 0 00.11.57c.12.02.23.05.34.09V7a1.81 1.81 0 01.09.04c.95.33 1.66.94 2.12 1.84v-.01c.38.74.5 1.5.36 2.28l-.6-.64a.3.3 0 00-.22-.1.32.32 0 00-.23.09.3.3 0 00-.1.21c0 .09.02.16.08.23l1 1.05.03.03c.05.08.1.13.19.15.08.03.16.02.24-.02l1.34-.66c.08-.04.13-.1.16-.18a.3.3 0 00-.02-.24.3.3 0 00-.18-.16z"
                        fill="#FFF"
                        fillRule="nonzero"
                        strokeWidth=".5"
                      />
                      <ellipse
                        strokeWidth=".94"
                        cx="10.78"
                        cy="10.85"
                        rx="10.78"
                        ry="10.85"
                      />
                    </g>
                  </svg>
                </span>
                {foreignBrandInfo && foreignBrandInfo.giveaways} Spins
              </li>
              <li>
                <span>
                  <svg
                    width="24"
                    height="25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      transform="translate(1 1.13)"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <ellipse
                        stroke="#FFF"
                        strokeWidth=".94"
                        cx="10.78"
                        cy="10.85"
                        rx="10.78"
                        ry="10.85"
                      />
                      <path
                        d="M10.7 6.8c1.49 2.37 2.44 4.02 2.44 5.45 0 1.43-1.1 2.59-2.44 2.59a2.52 2.52 0 01-2.45-2.59c0-1.43.96-3.08 2.45-5.46zm0-1.56c-1.99 3.14-3.26 5.1-3.26 7.01 0 1.91 1.45 3.46 3.26 3.46 1.8 0 3.26-1.55 3.26-3.46 0-1.9-1.28-3.87-3.26-7.01z"
                        fill="#FFF"
                        fillRule="nonzero"
                      />
                    </g>
                  </svg>
                </span>
                {foreignBrandInfo && foreignBrandInfo.h2o.toFixed(0)}L of water
                saved
              </li>
              <li>
                <span>
                  <svg viewBox="0 0 63 63" xmlns="http://www.w3.org/2000/svg">
                    <g
                      transform="translate(2 2)"
                      stroke="#FFF"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <ellipse
                        strokeWidth="2.1"
                        cx="29.5"
                        cy="29.7"
                        rx="29.5"
                        ry="29.7"
                      />
                      <path
                        d="M30.6 41.4c-2.2 0-4.2-1-5.6-2.6a7.2 7.2 0 01-9-4.2 8 8 0 013-9.8 7.6 7.6 0 015-6.1c2.7-1 5.6-.2 7.5 2 2-1.2 4.4-1.3 6.5-.3 2 1 3.5 3.1 3.8 5.5 2.3.8 4 3 4.2 5.5.3 2.5-.7 5-2.7 6.4a6.1 6.1 0 01-6.7.3 7.3 7.3 0 01-6 3.3zm-5.2-3.9l.2.3c1.2 1.6 3 2.6 5 2.6 2.2 0 4.2-1.3 5.4-3.3l.3-.5.4.3c1.8 1.3 4 1.3 5.8.1a5.8 5.8 0 002.5-5.6c-.3-2.2-1.8-4-3.8-4.6l-.3-.1v-.4c-.3-2.1-1.5-4-3.4-5-1.9-.9-4-.7-5.8.5l-.4.2-.3-.3a6.1 6.1 0 00-6.6-2c-2.4.7-4.1 2.9-4.4 5.5v.3l-.3.1a6.8 6.8 0 00-2.7 8.7c1.4 3.1 4.9 4.6 8 3.4l.4-.2z"
                        strokeWidth="1.5"
                        fill="#FFF"
                        fillRule="nonzero"
                      />
                    </g>
                  </svg>
                </span>
                {foreignBrandInfo && foreignBrandInfo.co2.toFixed(0)}kg of CO2
                saved
              </li>
            </ul>
            <div className={styles.profileButtons}>
              <Button type="button" size="large" color="transparent">
                Share{" "}
                <svg width="11" height="9" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 8c.4-.36.75-.68 1.09-.96a5.08 5.08 0 012.3-1.15c.45-.1.99-.15 1.61-.15v1.79l4-3.27L6 1v1.8c-.87.13-1.6.35-2.19.67A4.82 4.82 0 001.5 6.2C1.3 6.76 1.13 7.37 1 8z"
                    stroke="#FFF"
                    fill="#FFF"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>

              <Button
                type="button"
                size="large"
                color={isFollowing ? "white" : "transparent"}
                onClick={
                  viewAs() && userInfo && viewAs() !== userInfo.slug
                    ? followUnfollow
                    : () => setIsProfileSettingsOpened(true)
                }
                className={
                  viewAs() && userInfo && viewAs() !== userInfo.slug
                    ? isFollowing
                      ? styles.unfollowingButton
                      : styles.followingButton
                    : ""
                }
              >
                {viewAs() && userInfo && viewAs() !== userInfo.slug ? (
                  !isFollowing ? (
                    <>
                      Follow
                      <div className={styles.triangle}>
                        <svg
                          viewBox="0 0 30 30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g stroke="#FFF" fill="none" fillRule="evenodd">
                            <rect
                              width="28"
                              height="28"
                              rx="14"
                              transform="translate(1 1)"
                            />
                            <path
                              fill="#FFF"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 11l4 8h-8z"
                            />
                          </g>
                        </svg>
                      </div>
                    </>
                  ) : (
                    <div className={styles.triangle}>
                      <svg
                        viewBox="0 0 30 30"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g stroke="#FFF" fill="none" fillRule="evenodd">
                          <rect
                            width="28"
                            height="28"
                            rx="14"
                            transform="translate(1 1)"
                          />
                          <path
                            fill="#FFF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11l4 8h-8z"
                          />
                        </g>
                      </svg>
                    </div>
                  )
                ) : (
                  <>
                    Edit
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="14"
                    >
                      <g fill="var(--white)" fillRule="nonzero">
                        <path d="M14.911 6.484L11.502.348A.682.682 0 0010.91 0H4.091a.682.682 0 00-.593.348L.088 6.484a.682.682 0 000 .682l3.41 6.136c.124.21.35.337.593.334h6.818a.682.682 0 00.593-.347l3.41-6.137a.682.682 0 000-.668zm-4.404 5.789H4.493L1.46 6.818l3.034-5.454h6.014l3.034 5.454-3.034 5.455z" />
                        <path d="M7.5 4.09a2.727 2.727 0 100 5.455 2.727 2.727 0 000-5.454zm0 4.092a1.364 1.364 0 110-2.727 1.364 1.364 0 010 2.727z" />
                      </g>
                    </svg>
                  </>
                )}
              </Button>
            </div>
          </div>
          <figure className={styles.profilePhoto}>
            <Avatar
              url={
                viewAs()
                  ? foreignBrandInfo && foreignBrandInfo.image.url
                  : userInfo && userInfo.image.url
              }
              isBrand={
                viewAs() && foreignBrandInfo
                  ? foreignBrandInfo.business_role
                  : userInfo
                  ? userInfo.business_role
                  : null
              }
            />
          </figure>
        </div>
      </div>
      <div className={styles.content}>
        <header className={styles.header}>
          <h3 className={styles.mainTitle}>SPINS</h3>
          {foreignBrandInfo && (
            <span className={styles.piecesAmount}>
              ({foreignBrandInfo.giveaways} pieces)
            </span>
          )}
        </header>
        <div className={styles.spinsGrid} ref={spinsRef}>
          {totalSpins && (
            <ul className={styles.spinsList}>
              {totalSpins.map(({ id, image }) => (
                <li key={id}>
                  {image && (
                    <div style={{ backgroundImage: `url(${image.url})` }}></div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {isProfileSettingsOpened && (
        <ProfileModal
          onClose={() => setIsProfileSettingsOpened(false)}
          crossBtn={true}
        />
      )}
    </div>
  );
};
