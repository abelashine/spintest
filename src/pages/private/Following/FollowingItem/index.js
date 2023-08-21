import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./FollowingItem.module.scss";
import { ReactComponent as FollowIcon } from "../../../../static/icons/followiconV1.svg";
import { ReactComponent as ChatIcon } from "../../../../static/icons/chaticonV1.svg";
import { followChatHandler } from "../helpers";

import Button from "../../../../components/Button";
import Avatar from "../../../../components/Avatar";
import { profileActions } from "../../../../actions/profile";


const CheckMark = () =>
    <svg style={{ width: "100%", maxWidth: 16, marginRight: 5, marginLeft: 5 }} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(.4 .5)" fill="none" fillRule="evenodd">
        <ellipse fill="#239EFE" cx="7.1" cy="6.9" rx="7.1" ry="6.9" />
        <path
            d="M9.3 5l.5.5a.6.6 0 010 .8L7.2 8.8l-.4.4-.2.1h-.2L6 9.2 4.3 7.6a.6.6 0 010-.9l.4-.4c.3-.2.6-.2.9 0l.8.8 2.1-2c.2-.2.6-.2.8 0z"
            fill="#FFF"
        />
      </g>
    </svg>

export default ({ data, withAvatar }) => {
  const { image, city, is_following, slug, business_role } = data;
  const { userInfo } = useSelector((state) => state.authReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(is_following);
  useEffect(() => {
    setIsFollowing(is_following);
  }, [is_following]);

  const itemBtnHandler = () => {
    if (!isFollowing) {
      dispatch(
        profileActions.followUser(data.slug, () => setIsFollowing(true))
      );
    } else {
      followChatHandler(history, userInfo, slug);
    }
  };
  const itemBtnClass = !isFollowing ? styles.followBtn : styles.chatBtn;
  return (
    <div className={styles.FollowingItem}>
      {slug && withAvatar && (
        <div className={styles.profileInfo}>
          <div className={styles.photo}>
            {image && (
              <Avatar
                  url={image.url}
                  isBrand={
                    //business_role
                    false
                  }
                  isSmall
              />
            )}
          </div>
          <div className={styles.profileSummary}>
            {slug && (
              <span className={styles.slug}>
                <Link
                    style={{ display: "flex" }}
                    to={`/${slug}/profile`}
                >
                  {`@${slug}`}
                  {
                    business_role &&
                        <CheckMark />
                  }
                </Link>
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
      <Button type="button" className={itemBtnClass} onClick={itemBtnHandler}>
        {!isFollowing ? (
          <>
            Follow
            <FollowIcon className={styles.triangle} />
          </>
        ) : (
          <>
            Chat
            <ChatIcon className={styles.chatIcon} />
          </>
        )}
      </Button>
    </div>
  );
};
