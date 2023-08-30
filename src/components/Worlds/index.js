import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { profileActions } from "../../actions/profile";
import styles from "./Worlds.module.scss";

import EmptyBrandTab from "../EmpyBrandTab";
import GetWorld from "../Modal/GetWorld";
import WorldItem from "./WorldItem";

import worldPlaceholder from '../../static/images/my-world.png'

const Worlds = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [getWorldOpen, setGetWorldOpen] = useState(null);
  const { worldsData } = useSelector((state) => state.profileReducer);
  const { userInfo } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(
      profileActions.fetchWorldsData(
        history,
        userInfo?.business_role === "brand"
      )
    );
  }, []);
  if (!worldsData) return null;
  return (
    <div className={styles.Worlds}>
      {getWorldOpen && (
        <GetWorld world={getWorldOpen} onClose={() => setGetWorldOpen(null)} />
      )}
      <section className={styles.Worlds__titleBlock}>
        
        <span className={styles.Worlds__titleBlock_nft}>
          {userInfo?.business_role === "brand" ? "(0 NFTs)" :
            `(${worldsData.length} ${worldsData.length > 1 ? "NFTs" : "NFT"})`
          }
        </span>
      </section>
      {userInfo?.business_role === "brand" ? (
        <EmptyBrandTab tabname="worlds" />
      ) : (
        <ul className={styles.Worlds__itemsBlock}>
          <WorldItem
            world={{
              image: worldPlaceholder
            }}
            openWorld={() => setGetWorldOpen(true)}
          />
          {/* left it here for future work with worlds */}
          {/* {worldsData.map((world) => (
            <WorldItem
              key={world.id}
              world={world}
              openWorld={() => setGetWorldOpen(world)}
            />
          ))} */}
        </ul>
      )}
    </div>
  );
};

export default Worlds;
