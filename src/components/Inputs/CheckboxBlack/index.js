import React from "react";
import styles from "./CheckboxBlack.module.scss";
import checkedCheckbox from "../../../static/icons/checked-black.svg";
import emptyCheckbox from "../../../static/icons/rectangle.png";
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
          style={{ borderColor: "black", width: "10%" }} // added style prop
        />
        {value ? (
          <div
            style={{
              width: "25px",
              height: "25px",
              border: "1px solid black",
              borderRadius: "0.46875rem",
              margin: "10px",
            }}
          >
            <img style={{padding:5}} className={styles.CheckboxBlack__img} src={checkedCheckbox} />
          </div>
        ) : (
          <div
            style={{
              width: "25px",
              height: "25px",
              border: "1px solid black",
              borderRadius: "0.46875rem",
              margin: "10px",
            }}
          ></div>
        )}
      </label>
    </IsDisabledFieldHOC>
  );
};

export default CheckboxBlack;
