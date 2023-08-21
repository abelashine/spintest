import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./SwitchProfile.module.scss";
import { profileActions } from "../../../actions/profile";
import closeButton from "../../../static/icons/cross.svg";
import checkIcon from "../../../static/icons/checked-black.png";
import { setProfileCB } from "./helpers";

import Modal from "../index";
import Avatar from "../../Avatar";

const CheckMark = () =>
    <svg style={{ width: 16, marginLeft: 5 }} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(.4 .5)" fill="none" fillRule="evenodd">
        <ellipse fill="#239EFE" cx="7.1" cy="6.9" rx="7.1" ry="6.9" />
        <path
          d="M9.3 5l.5.5a.6.6 0 010 .8L7.2 8.8l-.4.4-.2.1h-.2L6 9.2 4.3 7.6a.6.6 0 010-.9l.4-.4c.3-.2.6-.2.9 0l.8.8 2.1-2c.2-.2.6-.2.8 0z"
          fill="#FFF"
        />
      </g>
    </svg>

export default ({ onClose, isOpened }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { profilesToSwitch } = useSelector((state) => state.profileReducer);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
      dispatch(profileActions.fetchProfilesForSwitchPopup(history));
    }
    return () => {
      document.body.style.overflow = "initial";
    };
  }, [isOpened]);

  const setProfile = (id, slug) => {
    dispatch(
      profileActions.switchProfileThroughPopup(slug, id, history, (response) =>
        setProfileCB(response, history, onClose)
      )
    );
  };

  return (
    isOpened && (
      <div className={styles.SwitchProfile}>
        <Modal isOpen>
          <div className={styles.header}>
            <div
              onClick={() => {
                onClose();
              }}
            >
              <img src={closeButton} alt="" />
            </div>
            Switch profile
          </div>
          <ul>
            {profilesToSwitch.map(
              ({ connection_id, slug, business_role, image, connected }) => (
                <li
                  key={connection_id}
                  onClick={() => setProfile(connection_id, slug)}
                >
                  <div className={styles.profileInfo}>
                    <div className={styles.avatar}>
                      <Avatar url={image.url} isBrand={false} isSmall />
                    </div>
                    <div className={styles.summary}>
                      <span className={styles.slug}>@{slug}
                      </span>
                      {business_role && (
                        <div style={{ display: "flex" }}>
                          <span className={styles.role}>#{business_role}</span>
                          <CheckMark />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.checkbox}>
                    {connected && <img src={checkIcon} alt="" />}
                  </div>
                </li>
              )
            )}
          </ul>
        </Modal>
      </div>
    )
  );
};
