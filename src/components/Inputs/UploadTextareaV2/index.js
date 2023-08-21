import React, { useRef, useEffect } from "react";
import { useField, Field } from "formik";
import styles from "./UploadTextareaV2.module.scss";

const UploadTextareaV2 = ({ name, placeholder }) => {
  const [field, meta] = useField(name);
  const textAreaRef = useRef();
  useEffect(() => {
    textAreaRef.current.children[0].style.minHeight = 24 + "px";
    if (!field.value) textAreaRef.current.children[0].style.height = 24 + "px";
    const scrollHeight = textAreaRef.current.children[0].scrollHeight;
    textAreaRef.current.children[0].style.height = scrollHeight + "px";
    if (scrollHeight >= 80) {
      textAreaRef.current.children[0].style.overflow = "auto";
    } else textAreaRef.current.children[0].style.overflow = "hidden";
  }, [field.value]);

  return (
    <div
      className={styles.UploadTextareaV2}
      ref={textAreaRef}
      data-invalid={meta.touched ? meta.error : undefined}
    >
      <Field
        as="textarea"
        id={name}
        name={name}
        placeholder={meta.touched ? meta.error : placeholder}
      />
    </div>
  );
};

export default UploadTextareaV2;
