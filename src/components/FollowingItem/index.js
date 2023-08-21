import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FollowingItem.module.scss";

import Button from "../Button";
import Avatar from "../Avatar";

export default ({
  image,
  city,
  is_following,
  slug,
  business_role,
  onFollow,
  onUnfollow,
  withAvatar,
}) => {
  const [isFollowing, setIsFollowing] = useState(is_following);

  const followUnfollow = () => {
    isFollowing
      ? onUnfollow && onUnfollow(slug, () => setIsFollowing(false))
      : onFollow && onFollow(slug, () => setIsFollowing(true));
  };
  return (
    <div className={styles.FollowingItem}>
      {slug && withAvatar && (
        <div className={styles.profileInfo}>
          <div className={styles.photo}>
            {image && (
              <Avatar url={image.url} isBrand={business_role} isSmall />
            )}
          </div>
          <div className={styles.profileSummary}>
            {slug && (
              <span className={styles.slug}>
                <Link to={`/${slug}/profile`}>{`@${slug}`}</Link>
              </span>
            )}
            {business_role && (
              <span className={styles.hashtag}>{`#${business_role}`}</span>
            )}
            {city && (
              <span
                className={styles.city}
              >{`${city.city}, ${city.country.name}`}</span>
            )}
          </div>
        </div>
      )}
      <Button
        type="button"
        className={isFollowing ? styles.unfollow : styles.follow}
        onClick={followUnfollow}
      >
        {isFollowing ? (
          <div className={styles.triangle}>
            <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
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
        ) : (
          <>
            Follow
            <div className={styles.triangle}>
              <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <g
                  stroke="black"
                  fill="none"
                  fillRule="evenodd"
                  transform="translate(-9, -5) scale(1.1)"
                >
                  <path
                    fill="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11l4 8h-8z"
                  />
                </g>
              </svg>
            </div>
          </>
        )}
      </Button>
    </div>
  );
};
