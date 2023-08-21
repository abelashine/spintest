import React from 'react'
import styles from "./AddPrevLayerModal.module.scss";

import AddMemory from "./AddMemory";
import TextFieldV2 from "../../Inputs/TextFieldV2";
import UploadTextareaV2 from "../../Inputs/UploadTextareaV2";
import HashesFieldBlock from './HashesFieldBlock'
import Select from "../../Inputs/Select";

const MemoryFields = ({ locationCities, setLocationCities }) => {
    return (
        <>
            <AddMemory name="memoryphoto" />
            <div className={styles.inputFields__selectField}>
                <p className={styles.inputFields__selectField_label}>
                    Title
                </p>
                <TextFieldV2
                    name="title"
                    type="text"
                    placeholder="Type here..."
                />
            </div>

            <div className={styles.inputFields__selectField}>
                <p className={styles.inputFields__selectField_label}>
                    Description
                </p>
                <UploadTextareaV2
                    name="description"
                    placeholder="Type here..."
                />
            </div>

            <div className={styles.inputFields__selectField}>
                <p className={styles.inputFields__selectField_label}>
                    Location
                </p>
                <Select
                    isAutocomplete
                    name="location"
                    variant="underline"
                    options={locationCities}
                    isTypeAndDropdown
                    placeholder="Type here..."
                    setCity={setLocationCities}
                />
            </div>

            <div className={styles.inputFields__selectField}>
                <p className={styles.inputFields__selectField_label}>
                    Hashtags
                </p>
                <HashesFieldBlock name="hashtagfield" nameToSave="hashtags" />
            </div>
        </>
    )
}
export default MemoryFields
