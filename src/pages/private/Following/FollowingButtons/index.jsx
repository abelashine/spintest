import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./FollowingButtons.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ShareIcon } from "../../../../static/icons/shareiconV1.svg";
import { ReactComponent as FollowIcon } from "../../../../static/icons/followiconV1.svg";
import { ReactComponent as EditIcon } from "../../../../static/icons/editiconV1.svg";
import { ReactComponent as ChatIcon } from "../../../../static/icons/chaticonV1.svg";
import { profileActions } from "../../../../actions/profile";
import { followChatHandler } from "../helpers";

import Button from "../../../../components/Button";

const FollowingButtons = ({ setIsProfileSettingsOpened, viewAs }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(null);
  const { userInfo } = useSelector((state) => state.authReducer);
  const { profileInfo } = useSelector((state) => state.profileReducer);
  useEffect(() => {
    if (viewAs) {
      dispatch(
        profileActions.fetchProfileData(viewAs, history, (res) =>
          setIsFollowing(res)
        )
      );
    }
  }, [viewAs]);
  useEffect(() => {
    const slug = viewAs || userInfo.slug;
    dispatch(
      profileActions.fetchProfileData(slug, history, (res) =>
        setIsFollowing(res)
      )
    );
  }, [viewAs, userInfo.slug]);
  const onShareHandler = (e) => {
    navigator.clipboard.writeText(
      window.location.href.replace("following", "profile")
    );
  };
  const rightBtnHandler = () => {
    if (userInfo.slug === viewAs) {
      setIsProfileSettingsOpened(true);
    } else if (userInfo.slug !== viewAs && !isFollowing) {
      dispatch(
        profileActions.followUser(profileInfo.slug, () => setIsFollowing(true))
      );
    } else {
      followChatHandler(history, userInfo, null, profileInfo);
    }
  };
  const followBtnClass =
    userInfo.slug === viewAs
      ? styles.editButton
      : isFollowing
      ? styles.chatBtn
      : styles.followingButton;
  return (
    <div className={styles.FollowingButtons}>
      <Button
        type="button"
        size="large"
        color="transparent"
        className={styles.shareButton}
        onClick={onShareHandler}
      >
        Share
        <ShareIcon />
      </Button>
      <Button
        type="button"
        size="large"
        color={isFollowing ? "transparent" : "white"}
        onClick={rightBtnHandler}
        className={followBtnClass}
      >
        {userInfo.slug !== viewAs && !isFollowing ? (
          <>
            Follow
            <FollowIcon className={styles.triangle} />
          </>
        ) : userInfo.slug !== viewAs && isFollowing ? (
          <>
            Chat
            <ChatIcon className={styles.chatIcon} />
          </>
        ) : (
          <>
            Edit
            <EditIcon />
          </>
        )}
      </Button>
    </div>
  );
};

export default FollowingButtons;
