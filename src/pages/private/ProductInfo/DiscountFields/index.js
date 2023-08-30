import React, { useEffect, useState } from "react";
import { Field, useField } from "formik";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DiscountFields.module.scss";
import { getDiscountTypes, checkVoucherCode } from "../helpers";
import checkmarkgreen from "../../../../static/icons/checkmarkgreen.svg";
import crossBtn5 from "../../../../static/icons/crossBtn5.svg";
import { replaseSpaceOnUnderScore } from "../../../../utils/validations";
import { profileActions } from "../../../../actions/profile";

import UploadSelectionInputV2 from "../../../../components/Inputs/UploadSelectionInputV2";

const DiscountFields = () => {
  const dispatch = useDispatch();
  const { productInfo } = useSelector((state) => state.profileReducer);
  const [discountTypefield] = useField("discountType");
  const [vouchercodefield, , vouchercodehelpers] = useField("voucherCode");
  const [timer, setTimer] = useState(null);
  const [isSpinner, setIsSpinner] = useState(false);
  const [isCorrectVoucherCode, setIsCorrectVoucherCode] = useState(null);
  useEffect(() => {
    vouchercodehelpers.setValue("");
  }, [discountTypefield.value]);
  useEffect(() => {
    dispatch(profileActions.setCertainDiscount(null));
    return () => dispatch(profileActions.setCertainDiscount(null));
  }, []);

  useEffect(() => {
    if (vouchercodefield.value) {
      setTimer(
        setTimeout(() => {
          setIsSpinner(true);
          const data = {
            coupon_number: vouchercodefield.value,
            slug: productInfo.poster.slug,
          };
          dispatch(
            profileActions.checkVoucherCode(data, (res) => {
              checkVoucherCode(
                res,
                dispatch,
                setIsCorrectVoucherCode,
                setIsSpinner
              );
            })
          );
        }, 1500)
      );
    } else {
      setIsCorrectVoucherCode(null);
    }
  }, [vouchercodefield.value]);

  const onVouchercodeChange = (e) => {
    setIsSpinner(false);
    clearTimeout(timer);
    dispatch(profileActions.setCertainDiscount(null));
    const voucherCodeStr = replaseSpaceOnUnderScore(e.target.value);
    vouchercodehelpers.setValue(voucherCodeStr);
  };

  const discountTypes = getDiscountTypes(productInfo.coupons, productInfo);

  return (
    <section className={styles.DiscountFields}>
      <span className={styles.title}>Discount</span>
      <UploadSelectionInputV2
        name="Personal Voucher 10%"
        onItemClick={(data) => {
          dispatch(profileActions.setCertainDiscount(data));
        }}
        variants={discountTypes}
      />
      {discountTypefield.value === "VOUCHER CODE" && (
        <div className={styles.DiscountFields__vouchercodefield}>
          <Field
            name="voucherCode"
            placeholder="Type in voucher code..."
            onChange={onVouchercodeChange}
            autoComplete="off"
          />
          {isSpinner ? (
            <span className={styles.spinner}>
              <span></span>
            </span>
          ) : isCorrectVoucherCode && vouchercodefield.value ? (
            <img src={checkmarkgreen} alt="Mark sign" />
          ) : isCorrectVoucherCode !== null &&
            !isCorrectVoucherCode &&
            vouchercodefield.value ? (
            <img src={crossBtn5} alt="Red cross" />
          ) : null}
        </div>
      )}
    </section>
  );
};

export default DiscountFields;
