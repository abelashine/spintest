import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./VouchersSummary.module.scss";

import Avatar from "../../../../components/Avatar";

const VouchersSummary = ({ profileInfo }) => {
  const history = useHistory();
  const onAvatarClicHandler = () => {
    history.push(`/${profileInfo.slug}/profile`);
  };
  return (
    <div className={styles.VouchersSummary}>
      <section className={styles.VouchersSummary__leftCol}>
        <h3 className={styles.VouchersSummary__leftCol_title}>VOUCHERS</h3>
        {/* TODO: Commented code here is to hide hardcode data */}
        {/* <p className={styles.VouchersSummary__leftCol_text}>
          10 Live vouchers
        </p>
        <p className={styles.VouchersSummary__leftCol_text}>
          120 Assigned
        </p>
        <p className={styles.VouchersSummary__leftCol_text}>
          100 Redeemed
        </p> */}
      </section>
      <section className={styles.VouchersSummary__rightCol}>
        <div
          className={styles.VouchersSummary__rightCol_avatar}
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
export default VouchersSummary;
