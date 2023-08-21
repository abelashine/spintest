import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import styles from "./MenuModal.module.scss";
import slidesicon from "../../../static/icons/slidesicon.svg";
import eventsicon from "../../../static/icons/eventsicon.svg";
import vouchericon from "../../../static/icons/vouchericon.svg";

const MiddleIcons = () => {
  const params = useParams();
  const { userInfo } = useSelector((state) => state.authReducer);
  const { profileInfo } = useSelector((state) => state.profileReducer);
  return (
    <>
      {userInfo.business_role && (
        <>
          <div style={{ display: "none" }} className={styles.IconWithTitle}>
            <a
              className={styles.link}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.preventDefault()}
            >
              <div className={styles.link__imageWrap}>
                <img
                  src={slidesicon}
                  alt="slidesicon"
                  className={styles.smallerimage}
                />
              </div>
              <h1 className={styles.labelUnderIcon}>Slides</h1>
            </a>
          </div>
          <div style={{ display: "none" }} className={styles.IconWithTitle}>
            <a
              className={styles.link}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.preventDefault()}
            >
              <div className={styles.link__imageWrap}>
                <img
                  src={eventsicon}
                  alt="eventsicon"
                  className={styles.smallerimage}
                />
              </div>
              <h1 className={styles.labelUnderIcon}>Events</h1>
            </a>
          </div>
        </>
      )}
      {!userInfo.business_role || params.slug !== userInfo.slug ? null : (
        <div className={styles.IconWithTitle}>
          <Link to={`/${params.slug}/profile/vouchers`} className={styles.link}>
            <div className={styles.link__imageWrap}>
              <img src={vouchericon} alt="vouchericon" />
            </div>
            <h1 className={styles.labelUnderIcon}>Vouchers</h1>
          </Link>
        </div>
      )}
    </>
  );
};

export default MiddleIcons;
