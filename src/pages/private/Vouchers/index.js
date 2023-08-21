import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Vouchers.module.scss";
import { profileActions } from "../../../actions/profile";

import VouchersHeader from "./VouchersHeader";
import VouchersSummary from "./VouchersSummary";
import Button from "../../../components/Button";
import VoucherTabs from "./VoucherTabs";
import VouchersList from "./VouchersList";
import AddVoucherModal from "../../../components/Modal/AddVoucherModal";

const Vouchers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams();
  const [voucherTab, setVoucherTab] = useState("active");
  const [isAddVoucherModal, setIsAddVoucherModal] = useState(false);
  const [certainVoucher, setCertainVoucher] = useState(null);
  const { profileInfo } = useSelector((state) => state.profileReducer);
  useEffect(() => {
    if (!profileInfo) {
      dispatch(profileActions.fetchProfileData(slug, history));
    }
  }, []);
  useEffect(() => {
    dispatch(profileActions.fetchVouchersData());
  }, [profileInfo]);
  const closeModal = () => {
    setCertainVoucher(null);
    setIsAddVoucherModal(false);
  };
  const openEditModal = (voucherData) => {
    setIsAddVoucherModal(true);
    setCertainVoucher(voucherData);
  };
  if (!profileInfo) return null;
  return (
    <div className={styles.Vouchers}>
      <VouchersHeader />
      <VouchersSummary profileInfo={profileInfo} />
      <section className={styles.Vouchers__buttonblock}>
        <Button
          color="white"
          size="extraLarge"
          onClick={() => setIsAddVoucherModal(true)}
        >
          Create new voucher
        </Button>
      </section>
      <VoucherTabs voucherTab={voucherTab} setVoucherTab={setVoucherTab} />
      <VouchersList voucherTab={voucherTab} openEditModal={openEditModal} />
      {isAddVoucherModal && (
        <AddVoucherModal
          onClose={closeModal}
          certainVoucher={certainVoucher}
          isActiveVoucher={voucherTab === "active"}
        />
      )}
    </div>
  );
};

export default Vouchers;
