import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import styles from "./VaultHeader.module.scss";
import backArrow from "../../../../static/icons/back-arrow.svg";

import SwitchProfile from "../../../../components/Modal/SwitchProfile";

const VaultHeader = ({ isPublic }) => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const { tabKind } = useSelector((state) => state.profileReducer);
  const { slug } = useParams();
  const [isSwitchOpened, setIsSwitchOpened] = useState(false);
  return (
    <div className={styles.VaultHeader}>
      <SwitchProfile
        isOpened={isSwitchOpened}
        onClose={() => setIsSwitchOpened(false)}
      />
      <section className={styles.VaultHeader__backButton}>
        <Link to={`/${slug}/profile/${tabKind}`}>
          <img src={backArrow} alt="backArrow" />
        </Link>
      </section>
      <section
        className={styles.VaultHeader__switcher}
        onClick={() => {
          if (userInfo && slug === userInfo.slug && !isPublic) {
            setIsSwitchOpened(true);
          }
        }}
      >
        <span className={styles.VaultHeader__switcher_slug}>
          {!slug ? userInfo && userInfo.slug : slug || ""}
        </span>
        {userInfo && slug && slug === userInfo.slug && !isPublic && (
          <img
            className={styles.VaultHeader__switcher_arrow}
            src={backArrow}
            alt="backArrow"
          />
        )}
      </section>
    </div>
  );
};

export default VaultHeader;
