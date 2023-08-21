import React from "react";
import styles from "./CheckboxBlack.module.scss";
import checkedCheckbox from "../../../static/icons/checked-checkbox.svg";
import emptyCheckbox from "../../../static/icons/checkbox.svg";
import { useField } from "formik";
import IsDisabledFieldHOC from "../../../utils/HOCs/IsDisabledFieldHOC";

const CheckboxBlack = ({ name, value, isDisabled, inlineStyle }) => {
  const [field, _, helpers] = useField(name);
  const onChange = (e) => {
    helpers.setTouched(true);
    field.onChange(e);
  };
  return (
    <IsDisabledFieldHOC isDisabled={isDisabled} inlineStyle={inlineStyle}>
      <label htmlFor={name} className={styles.CheckboxBlack}>
        <input
          onChange={onChange}
          id={name}
          type="checkbox"
          className={styles.CheckboxBlack__input}
          name={name}
          checked={value}
          style={{ borderColor: "black" }} // added style prop
        />
        {value ? (
          <img className={styles.CheckboxBlack__img} src={checkedCheckbox} />
        ) : (
          <div
            style={{
              width: "1.5625rem",
              height: "1.5625rem",
              border: "1px solid black",
              borderRadius: "0.46875rem",
              margin:"10px"
            }}
          >
          </div>
        )}
      </label>
    </IsDisabledFieldHOC>
  );
};

export default CheckboxBlack;
