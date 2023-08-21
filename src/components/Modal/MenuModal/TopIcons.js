import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import styles from "./MenuModal.module.scss";
import { group } from "../icons";
import lplusiconV2 from "../../../static/icons/lplusiconV2.svg";
import vaulticon from "../../../static/icons/vaulticon.svg";
import { profileActions } from "../../../actions/profile";
import { openLinkHandler } from "./helpers";

const TopIcons = ({ onClose }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const { userInfo, appTitles } = useSelector((state) => state.authReducer);
  const vaultRouteHandle = () => {
    if (!userInfo.business_role) {
      history.push(`/${params.slug}/profile/vault`);
      dispatch(profileActions.setUsualTabKind("vault"));
    } else {
      history.push(`/${params.slug}/profile/brandvault`);
    }
    onClose();
  };
  const lablacoLink = "http://lablaco.com";
  const lplusLink = "https://lplus.lablaco.com/login";
  return (
    <>
      <div className={styles.IconWithTitle}>
        <a
          rel="noopener noreferrer"
          onClick={(e) => openLinkHandler(e, lablacoLink)}
        >
          {group}
          <h1 className={styles.labelUnderIcon}>Lablaco</h1>
        </a>
      </div>

      {params.slug === userInfo.slug && userInfo.business_role && (
        <div className={styles.IconWithTitle}>
          <div onClick={vaultRouteHandle} className={styles.link}>
            <div className={styles.link__imageWrap}>
              <img src={vaulticon} alt="vaulticon" />
            </div>
            <h1 className={styles.labelUnderIcon}>Vault</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default TopIcons;
