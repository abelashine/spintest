import React, { useState } from "react";
import { Formik } from "formik";
import styles from "./AddRoyaltiesModal.module.scss";
import Modal from "../../index";
import Button from "../../../Button";
import closeButton from "../../../../static/icons/cross.svg";
// import TextFieldV2 from "../../../Inputs/TextFieldV2";
import Select from "../../../Inputs/Select";

import { getQuantity } from "../../../../static/data/dataForForms";
import { getKeptUsers } from '../../../../api';
import { initialValues, validate } from "./initForm";

import { validateFormikComponentNumber } from "../../../../utils/validations";


export const AddRoyaltiesModal = ({ onClose, availableRoyalties, usedRoyalties, setUsedRoyalties, creators, setCreators }) => {
  const userpercentage = getQuantity(availableRoyalties);
  const [foundCreators, setFoundCreators] = useState([{}]);

  const searchUser = (query) => {
    getKeptUsers(query.toLowerCase(), 'business').then(({ response }) => {
        const users = response.slugs.map((creator) => {
          creator.name = creator.slug;
          creator.value = creator.slug;
          return creator;
        });
        setFoundCreators(users);
    });
  };

  const onSubmitHandler = (data, props) => {
    const foundCreator = foundCreators.find(
      (c) => c.username === data.username
    );
    const creatorRoyalties = data.royaltiesFee;
    const creator = {...data, royaltiesFee: creatorRoyalties, avatar: getAutoCompletedUrl(data)};
    setCreators([...creators, creator])
    debugger;
    setUsedRoyalties(usedRoyalties + parseInt(creatorRoyalties))
    onClose();
  };

  const getAutoCompletedUrl = (values) => {
    const creator = foundCreators.find(
      (creator) => creator.slug === values.username
    );
    return creator ? creator.avatar : null;
  };

  return (
    <Modal isOpen>
      <div className={styles.modalHeader}>
        <img
          src={closeButton}
          alt="closeButton"
          className={styles.modalHeader__closeBtn}
          onClick={onClose}
        />
      </div>
      <div className={styles.modalBody}>
        <Formik
          initialValues={initialValues}
          validate={(props) =>
            validate(props, availableRoyalties)
          }
          onSubmit={onSubmitHandler}
        >
          {({ handleSubmit, values }) => {
            validateFormikComponentNumber(values, "royaltiesFee");
            const imageUrl = getAutoCompletedUrl(values);
            return (
              <form onSubmit={handleSubmit}>
                <div className={styles.avatar}>
                  {imageUrl && <img src={imageUrl} alt="uploadedAvatar" />}
                </div>
                <div>
                  <div className={styles.modalTitle}>
                    Add creator
                  </div>
                  <div className={styles.inputFields__selectField}>
                    <p className={styles.inputFields__selectField_label}>
                      Username
                    </p>
                    <Select
                      isAutocomplete
                      name="username"
                      variant="underline"
                      options={foundCreators}
                      onAutocomplete={(query) => searchUser(query)}
                      isTypeAndDropdown
                      inlineStyle={{ zIndex: "6" }}
                    />
                    <p className={styles.inputFields__selectField_label}>
                      Royalty Fee (Percentage)
                    </p>
                    <Select
                      isAutocomplete
                      name="royaltiesFee"
                      variant="underline"
                      options={userpercentage}
                      isTypeAndDropdown
                      inlineStyle={{ zIndex: "5" }}
                    />
                  </div>
                </div>
                <div className={styles.buttons}>
                  <Button type="submit" size="large" color="blue">
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="large"
                    color="monochromatic"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};
export default AddRoyaltiesModal;
