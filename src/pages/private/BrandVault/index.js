import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./BrandVault.module.scss";
import { profileActions } from "../../../actions/profile";

import VaultHeader from "./VaultHeader";
import VaultSummary from "./VaultSummary";
import VaultTabs from "./VaultTabs";
import Vault from "../../../components/Vault";

const BrandVault = () => {
  const { slug } = useParams();
  const [vaultTab, setVaultTab] = useState("all");
  const dispatch = useDispatch();
  const history = useHistory();
  const { profileInfo } = useSelector((state) => state.profileReducer);
  useEffect(() => {
    if (!profileInfo) {
      dispatch(profileActions.fetchProfileData(slug, history));
    }
  }, []);
  return (
    <div className={styles.BrandVault}>
      <VaultHeader />
      <VaultSummary profileInfo={profileInfo} />
      <VaultTabs vaultTab={vaultTab} setVaultTab={setVaultTab} />
      <div className={styles.BrandVault__vaultWrap}>
        <Vault slug={slug} />
      </div>
    </div>
  );
};

export default BrandVault;
