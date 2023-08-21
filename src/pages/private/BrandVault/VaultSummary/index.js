import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./VaultSummary.module.scss";
import { useSelector } from "react-redux";

import Avatar from "../../../../components/Avatar";

const VaultSummary = ({ profileInfo }) => {
  const history = useHistory();
  const onAvatarClicHandler = () => {
    history.push(`/${profileInfo.slug}/profile`);
  };
  const wardrobeProducts = useSelector(
    (state) => state.profileReducer.wardrobeProducts
  );

  return (
    <div className={styles.VaultSummary}>
      <section className={styles.VaultSummary__leftCol}>
        <h3 className={styles.VaultSummary__leftCol_title}>VAULT</h3>
        <p className={styles.VaultSummary__leftCol_text}>
        {wardrobeProducts?.length || 0} Physical products
        </p>
        <p className={styles.VaultSummary__leftCol_text}>
          0 Digital products
          <br />
          (NFTs)
        </p>
        <div className={styles.VaultSummary__leftCol_btn}>
          <span>Info</span>
          <span>i</span>
        </div>
      </section>
      <section className={styles.VaultSummary__rightCol}>
        <div
          className={styles.VaultSummary__rightCol_avatar}
          onClick={onAvatarClicHandler}
        >
          {profileInfo?.image?.url && (
            <Avatar
              url={profileInfo.image.url}
              isBrand={profileInfo?.type === "brand"}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default VaultSummary;
