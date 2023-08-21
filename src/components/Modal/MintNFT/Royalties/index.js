import React from "react";
import styles from "./Royalties.module.scss";
import Avatar from "../../../Avatar";
// import { getImageUrl } from "../../../../utils";
import Check from "../../../../static/icons/checkOk/xs.png";
import crossBtn3 from "../../../../static/icons/crossBtn3.svg";

const Royalties = ({ openModal, creators, setCreators, usedRoyalties, setUsedRoyalties, isDisabled }) => {

  const onDeleteItem = (index) => {
    setUsedRoyalties(parseInt(usedRoyalties - creators.find((item, i) => i === index).royaltiesFee));
    const updatedCreators = creators.filter((item, i) => i !== index);
    setCreators(updatedCreators);
  };

  return (
    <section className={styles.Royalties}>
      <p className={styles.Royalties__formtitle}>
        SMART CONTRACT AND ROYALTIES
      </p>
        <div className={styles.Royalties__addBtnblock}>
          {!isDisabled && (
            <span
              onClick={openModal}
              className={styles.Royalties__addBtnblock_btn}
            >
              +
            </span>
          )}
          <span className={styles.Royalties__addBtnblock_text}>
            Add creator (Max: 10% total)
          </span>
        </div>
      <ul className={styles.Royalties__usersList}>
        {creators.map((user, index) => {
          return (
            user.username && (
              <li key={index} className={styles.Royalties__usersList_item}>
                <div className={styles.photo}>
                  {user.avatar ? (
                    <>
                      <Avatar url={user.avatar} />
                      {user.isBrand && (
                        <img
                          className={styles.CheckImage}
                          src={Check}
                          alt="logo"
                        />
                      )}
                    </>
                  ) : null}
                  <div className={styles.photo__verticalLine}></div>
                </div>
                <div className={styles.profileSummary}>
                  <span className={styles.slug}>
                    @{user.username}
                  </span>
                  <span className={styles.percentage}>
                    {user.royaltiesFee}%
                  </span>
                </div>
                {!user.noDeletable && (
                  <img
                    src={crossBtn3}
                    alt="Cross"
                    className={styles.deleteCross}
                    onClick={() => onDeleteItem(index)}
                  />
                )}
              </li>
            )
          );
        })}
      </ul>
    </section>
  );
};

export default Royalties;
