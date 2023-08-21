import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUserInfo } from "../../../utils";
import styles from "./MenuModal.module.scss";
import { cog, logout } from "../icons";
import termsicon from "../../../static/icons/termsicon.svg";
import { authActions } from "../../../actions/auth";
import { openLinkHandler } from "./helpers";

const BottomIcons = ({ setIsSettingsVisible }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.authReducer);
  const logoutFromProfile = () => {
    const lastUsersData = JSON.parse(
      localStorage.getItem("lastUsersDataToRememberLastAccounts")
    );
    // deleteUserInfo();
    localStorage.setItem(
      "lastUsersDataToRememberLastAccounts",
      JSON.stringify(lastUsersData)
    );
    history.push("/login");
    dispatch(authActions.logout());
  };
  const termsLink = userInfo.business_role
    ? "https://lablaco.com/business-terms"
    : "https://www.lablaco.com/user-terms";

  return (
    <>
      <div
        className={styles.IconWithTitle}
        onClick={() => setIsSettingsVisible(true)}
      >
        {cog}
        <h1 className={styles.labelUnderIcon}>Settings</h1>
      </div>
      <div className={styles.IconWithTitle}>
        <a
          className={styles.link}
          rel="noopener noreferrer"
          onClick={(e) => openLinkHandler(e, termsLink)}
        >
          <div className={styles.link__imageWrap}>
            <img src={termsicon} alt="termsicon" className={styles.smallImg} />
          </div>
          <h1 className={styles.labelUnderIcon}>Terms</h1>
        </a>
      </div>
      <div className={styles.IconWithTitle} onClick={logoutFromProfile}>
        {logout}
        <h1 className={styles.labelUnderIcon}>Logout</h1>
      </div>
    </>
  );
};

export default BottomIcons;
