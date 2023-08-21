import React from "react";
import styles from "./ImageUploader.module.scss";
import { useField } from "formik";
import crossBtn2 from "../../../static/icons/crossBtn2.svg";

const InputForPhoto = ({ uploadPhoto, resetValue, preview, placeholder, attachImage, props }) => {
    const [field, meta] = useField(props);
    return (
        <label
            className={styles.ImageUploader}
            invalid={meta.touched ? meta.error : undefined}
            filled={field.value}
        >
            {field.value && uploadPhoto ? (
                <div className={styles.uploadImage}>
                    <button
                        type="button"
                        className={styles.resetButton}
                        onClickCapture={resetValue}
                    >
                        <img src={crossBtn2} alt="Cross button" />
                    </button>
                </div>
            ) : preview ? (
                <img src={preview} alt="" />
            ) : (
                <div className={styles.labelText} data-label-text="labelBlock">
                    <span>+</span>
                    <span>{meta.touched ? meta.error : placeholder}</span>
                </div>
            )}
            <input type="file" accept="image/*" onChange={attachImage} />
        </label>
    )
}

export default InputForPhoto;
