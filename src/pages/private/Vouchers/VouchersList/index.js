import React from "react";
import { useSelector } from "react-redux";
import styles from "./VouchersList.module.scss";
import vouchericon from "../../../../static/icons/vouchericon.svg";
import { getDateFormat } from "../helpers";

const VouchersList = ({ voucherTab, openEditModal }) => {
  const { vouchersData } = useSelector((state) => state.profileReducer);
  const buttonText = voucherTab === "active" ? "Edit" : "Reactivate";
  if (!vouchersData) return null;
  const vouchersForRender =
    voucherTab === "active"
      ? vouchersData.filter((v) => v.is_active && !v.is_expired)
      : vouchersData.filter((v) => !v.is_active || v.is_expired);
  return (
    <ul className={styles.VouchersList}>
      {vouchersForRender.map((v, index) => {
        const voucherUser =
          v.type === "PERSONAL" ? `@${v.for_whom.slug}` : v.voucher_code;
        const valueStr =
          v.discount_type === "PERCENTAGE"
            ? `${v.amount}% discount`
            : v.discount_type === "CASH"
            ? `${v.amount} ${v.currency.currency}`
            : "FREE";
        const dateString = v.is_active ? getDateFormat(v.expiration_date) : "";
        return (
          <li className={styles.VouchersList__item} key={index}>
            <img
              className={styles.VouchersList__item_icon}
              src={vouchericon}
              alt="vouchericon"
            />
            <div className={styles.VouchersList__item_content}>
              <p className={styles.title}>{voucherUser}</p>
              <p className={styles.text}>{valueStr}</p>
              {v.is_active && <p className={styles.text}>{dateString}</p>}
            </div>
            <button
              type="button"
              className={styles.VouchersList__item_button}
              onClick={() => {
                openEditModal(v);
              }}
            >
              {buttonText}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default VouchersList;
