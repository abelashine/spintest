import React, { useState } from "react";
import { Formik } from "formik";
import styles from "./AddPrevLayerModal.module.scss";
import Modal from "../index";
import Button from "../../Button";
import TitleFields from "./TitleFields";
import MemoryFields from "./MemoryFields";
import closeButton from "../../../static/icons/cross.svg";
import { initialValues, validate } from "./initForm";
import { validateFields } from "./helpers";

export const AddPrevLayerModal = ({ onClose, addPrevItemLayer }) => {
  const [cities, setCities] = useState([]);
  const [locationCities, setLocationCities] = useState([]);
  const [prevUsers, setPrevUsers] = useState([]);

  const onSubmitHandler = (data, props) => {
    const gottenLayer = prevUsers.find(
      (layer) => layer.slug === data.prevlayerusername
    );
    data.isAutocompleted = true;
    data.prevlayeravatar = gottenLayer.avatar;
    const city = cities.find((c) => c.value === data.cityoftransaction);
    const memoryCity = locationCities.find((c) => c.value === data.location);
    data.cityoftransaction = city;
    data.location = memoryCity;
    addPrevItemLayer(data);
    props.resetForm()
  };

  const getAutoComletedUrl = (values) => {
    const gottenLayer = prevUsers.find(
      (layer) => layer.slug === values.prevlayerusername
    );
    return gottenLayer ? gottenLayer.avatar : null;
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
            validate(props, prevUsers, cities, locationCities)
          }
          onSubmit={onSubmitHandler}
        >
          {({ handleSubmit, values }) => {
            const imageUrl = getAutoComletedUrl(values);
            validateFields(values);
            return (
              <form onSubmit={handleSubmit}>
                <div className={styles.avatar}>
                  {imageUrl && <img src={imageUrl} alt="uploadedAvatar" />}
                </div>
                <div className={styles.inputFields}>
                  <TitleFields
                    cities={cities}
                    prevUsers={prevUsers}
                    setPrevUsers={setPrevUsers}
                    setCities={setCities}
                  />
                  <MemoryFields
                    locationCities={locationCities}
                    setLocationCities={setLocationCities}
                  />
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
export default AddPrevLayerModal;
