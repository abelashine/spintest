import React, { useEffect, useState } from "react";
import { useField } from "formik";
import styles from "./Fields.module.scss";
import { searchUser, voucherTypes } from "../helpers";
import { replaseSpaceOnUnderScore } from "../../../../utils/validations";

import Select from "../../../Inputs/Select";
import VoucherValue from "./VoucherValue";
import DateFields from "./DateFields";

const Fields = ({
  users,
  setUsers,
  currencies,
  voucherTab,
  certainVoucher,
}) => {
  const [vouchertypefield] = useField("vouchertype");
  const [, vouchervaluemeta, vouchervaluehelpers] = useField("vouchervalue");
  const [vouchercodefield, vouchercodemeta, vouchercodehelpers] = useField(
    "vouchercode"
  );
  const [, , usernamehelpers] = useField("username");
  const [wasFirstRender, setWasFirtsRender] = useState(false);

  useEffect(() => {
    if (wasFirstRender) {
      vouchervaluehelpers.setValue("");
      vouchervaluehelpers.setTouched(false);
    } else setWasFirtsRender(true);
    vouchervaluehelpers.setError(undefined);
  }, [vouchertypefield.value]);

  useEffect(() => {
    if (wasFirstRender) {
      usernamehelpers.setValue("");
      vouchercodehelpers.setValue("");
    } else setWasFirtsRender(true);
  }, [voucherTab]);

  const voucherCocePlaceholder =
    vouchercodemeta.error && vouchercodemeta.touched
      ? vouchercodemeta.error
      : "";
  const onVouchercodeChange = (e) => {
    const voucherCodeStr = replaseSpaceOnUnderScore(e.target.value);
    vouchercodehelpers.setValue(voucherCodeStr);
  };
  const isPersonalVoucher = certainVoucher
    ? certainVoucher.type === "PERSONAL"
    : voucherTab === "personal";
  return (
    <div className={styles.Fields}>
      {!!isPersonalVoucher ? (
        <section
          className={styles.Fields__selectField}
          id={styles.selectFieldBlock}
        >
          <p className={styles.Fields__selectField_label}>Username</p>
          <Select
            isAutocomplete
            name="username"
            variant="underline"
            options={users}
            onAutocomplete={(query) => searchUser(query, setUsers)}
            isTypeAndDropdown
            inlineStyle={{ zIndex: "6" }}
          />
        </section>
      ) : (
        <section className={styles.Fields__simplefield}>
          <p>Create voucher code</p>
          <input
            value={vouchercodefield.value}
            name="vouchercode"
            invalid={`${vouchercodemeta.error && vouchercodemeta.touched}`}
            placeholder={voucherCocePlaceholder}
            onChange={onVouchercodeChange}
            onBlur={vouchercodefield.onBlur}
          />
        </section>
      )}

      <section
        className={styles.Fields__selectField}
        id={styles.selectFieldBlock}
      >
        <p className={styles.Fields__selectField_label}>Type</p>
        <Select
          name="vouchertype"
          variant="underline"
          options={voucherTypes}
          inlineStyle={{ zIndex: "5" }}
        />
      </section>
      {vouchertypefield.value !== "FREE" && (
        <VoucherValue currencies={currencies} />
      )}
      <DateFields />
    </div>
  );
};

export default Fields;
