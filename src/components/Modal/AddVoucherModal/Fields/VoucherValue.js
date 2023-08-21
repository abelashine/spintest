import React, { useEffect, useRef } from "react";
import { useField } from "formik";
import styles from "./Fields.module.scss";
import { validateNumber, validatePercent } from "../../../../utils/validations";

import Select from "../../../Inputs/Select";

const VoucherValue = ({ currencies }) => {
  const [vouchervaluefield, vouchervaluemeta, vouchervaluehelpers] = useField(
    "vouchervalue"
  );
  const [vouchertypefield] = useField("vouchertype");

  // thi is to provide visibility and position of '%' sign in the amount field fro percentage discount
  // start
  const percentSignRef = useRef(null);
  useEffect(() => {
    if (!vouchervaluefield.value) {
      percentSignRef.current.style.left = "8px";
    } else {
      const stringLength = vouchervaluefield.value.length;
      const distanceToLeft = 8 + +stringLength * 8;
      percentSignRef.current.style.left = distanceToLeft + "px";
    }
  }, [vouchervaluefield.value]);
  useEffect(() => {
    if (!vouchervaluemeta.touched) {
      vouchervaluehelpers.setError(undefined);
    }
  }, [vouchervaluemeta.touched, vouchervaluemeta.error]);
  // end

  const onVoucherValueChange = (value) => {
    let valueToForm = "";
    if (vouchertypefield.value === "CASH DISCOUNT") {
      valueToForm = validateNumber(value, 10);
    } else valueToForm = validatePercent(value);
    vouchervaluehelpers.setValue(valueToForm);
  };
  const onVoucherValueBlur = (e) => vouchervaluefield.onBlur(e);
  const voucherValuePlaceholder =
    vouchervaluemeta.error && vouchervaluemeta.touched
      ? vouchervaluemeta.error
      : "";
  return (
    <section
      className={`${styles.voucherValues} ${
        vouchertypefield.value !== "CASH DISCOUNT" && styles.fullwidthfield
      }`}
    >
      <div className={styles.Fields__selectField} id={styles.selectFieldBlock}>
        <p className={styles.Fields__selectField_label}>Amount</p>
        <input
          value={vouchervaluefield.value}
          name="vouchervalue"
          onChange={(e) => onVoucherValueChange(e.target.value)}
          invalid={`${vouchervaluemeta.error && vouchervaluemeta.touched}`}
          placeholder={voucherValuePlaceholder}
          onBlur={onVoucherValueBlur}
        />
        <span
          className={styles.percentsign}
          ref={percentSignRef}
          data-error={
            !vouchervaluemeta.error &&
            vouchertypefield.value !== "CASH DISCOUNT" &&
            vouchertypefield.value !== "FREE"
          }
        >
          %
        </span>
      </div>
      {vouchertypefield.value === "CASH DISCOUNT" && (
        <div
          className={styles.Fields__selectField}
          id={styles.selectFieldBlock}
        >
          <p className={styles.Fields__selectField_label}>Currency</p>
          <Select
            name="currency"
            variant="underline"
            options={currencies}
            inlineStyle={{ zIndex: "4" }}
          />
        </div>
      )}
    </section>
  );
};

export default VoucherValue;
