import React, { useRef, useEffect } from "react";
import { useField } from "formik";
import styles from "./UploadTextarea.module.scss";
import IsDisabledFieldHOC from "../../../utils/HOCs/IsDisabledFieldHOC";

const UploadTextarea = ({ name, placeholder, label, isDisabled }) => {
  const [field, meta, helpers] = useField(name);

  const textAreaRef = useRef();

  useEffect(() => {
    textAreaRef.current.style.minHeight = 28 + "px";
    if (!field.value) textAreaRef.current.style.height = 28 + "px";
    const scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = scrollHeight + "px";
    if (scrollHeight >= 80) {
      textAreaRef.current.style.overflow = "auto";
    } else textAreaRef.current.style.overflow = "hidden";
  }, [field.value]);

  const onTouched = () => {
    if (!field.value) helpers.setError("Empty item description");
    helpers.setTouched(true);
    helpers.setValue(field.value.trim());
  };

  const tooltipStyle = { bottom: "4px" };

  return (
    <IsDisabledFieldHOC isDisabled={isDisabled} tooltipStyle={tooltipStyle}>
      <div className={styles.UploadTextarea}>
        <label htmlFor={name}>
          {label}
          <textarea
            ref={textAreaRef}
            id={name}
            onChange={field.onChange}
            value={field.value}
            name={name}
            onBlur={onTouched}
            placeholder={placeholder}
          ></textarea>
        </label>
        {meta.error && meta.touched && (
          <span className={styles.errorText}>{meta.error}</span>
        )}
      </div>
    </IsDisabledFieldHOC>
  );
};

export default UploadTextarea;
