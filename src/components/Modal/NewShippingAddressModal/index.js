import React, { useState } from "react";
import { Formik } from "formik";
import { addNewAddress } from "../../../api";
import phones from "../../../static/phones.json";
import { initialValues, validate } from "./initForm";
import { validateNumber } from "../../../utils/validations";

import TextField from "../../Inputs/TextField";
import SelectTypeAddress from "../../Inputs/SelectTypeAddress";
import Select from "../../Inputs/Select";
import Modal from "../index";
import Button from "../../Button";
import styles from "./NewShippingAddressModal.module.scss";
import Cross from "../../../static/icons/cross.svg";
import backArrow from "../../../static/icons/back-arrowV2.svg";
import newShipAddrIcon from "../../../static//icons/newShipAddrIcon.svg";

export default ({
  onClose,
  submitButtonText = "Save",
  submitButtonColor = "blue",
  isCancelButtonNeed = true,
  isPaginationNeed = false,
  isCrossNeed = false,
  setIsModalNeedOnProductPage,
  onUpdateAddresses,
}) => {
  const [phoneCodes, setPhoneCodes] = useState(phones);
  const [cities, setCities] = useState([]);

  const searchCountryCode = (query) => {
    setPhoneCodes(phones.filter((item) => item.value.includes(query)));
  };

  const createNewAddress = (addressInfo) => {
    let city_place_id = "";

    if (cities.length > 0) {
      city_place_id = cities.find(({ value }) => value === addressInfo.city)
        .shortValue;
    } else {
      delete addressInfo.city;
    }

    const totalAddressInfo = {
      ...addressInfo,
      phone: `${addressInfo.countryCode.trim()}${addressInfo.phoneNumber.trim()}`,
      city_place_id,
    };

    addNewAddress(totalAddressInfo).then(({ response }) => {
      if (response) {
        onUpdateAddresses();
        onClose();
      }
    });
  };

  return (
    <Modal isOpen={true}>
      <div className={styles.Modal}>
        <div className={styles.modalHeader}>
          {isCrossNeed ? (
            <img
              src={Cross}
              alt=""
              style={{ width: "2.5%" }}
              onClick={() => {
                setIsModalNeedOnProductPage(false);
              }}
            />
          ) : (
            <img src={backArrow} alt="Back arrow" onClick={onClose} />
          )}
        </div>
        <div className={styles.modalBody}>
          <img src={newShipAddrIcon} alt="New Ship Address Icon" />
          <div className={styles.modalTitle}>New shipping address</div>
          <div className={styles.details}>
            <Formik
              initialValues={initialValues}
              onSubmit={createNewAddress}
              validate={(values) => validate(values, cities)}
            >
              {({ handleSubmit, errors, touched }) => {
                const isNameError =
                  errors.client_full_name && touched.client_full_name;
                const isPhoneError = errors.phoneNumber && touched.phoneNumber;
                return (
                  <form onSubmit={handleSubmit}>
                    <SelectTypeAddress
                      options={[{ value: "Home" }, { value: "Work" }]}
                      name="alias"
                      type="text"
                      placeholder="Home"
                      variant="underline"
                    />
                    <div className={styles.clientNameField}>
                      <TextField
                        name="client_full_name"
                        type="text"
                        placeholder={isNameError ? "" : "Person of reference"}
                        variant="underline"
                      />
                    </div>
                    <p className={styles.phoneNumberLabel}>Phone number</p>
                    <div className={styles.phoneLine}>
                      <div className={styles.countryCode}>
                        <Select
                          options={phoneCodes}
                          name="countryCode"
                          label="Phone number"
                          type="text"
                          placeholder="+00"
                          variant="underline"
                          isAutocomplete
                          onAutocomplete={(query) => searchCountryCode(query)}
                          validateSymbols={(val) => validateNumber(val, 10)}
                        />
                      </div>
                      <div className={styles.phoneNumber}>
                        <TextField
                          name="phoneNumber"
                          type="text"
                          placeholder={isPhoneError ? "" : "000 00 000 00"}
                          variant="underline"
                          validateSymbols={(val) => validateNumber(val)}
                        />
                      </div>
                    </div>
                    <TextField
                      name="address"
                      type="text"
                      label="Address"
                      variant="underline"
                    />
                    <TextField
                      name="postal_code"
                      type="text"
                      label="Zip code (if any)"
                      variant="underline"
                    />
                    <div className={styles.cityField}>
                      <Select
                        isAutocomplete
                        name="city"
                        variant="underline"
                        options={cities}
                        isTypeAndDropdown
                        setCity={setCities}
                        placeholder="City"
                      />
                    </div>

                    <TextField
                      name="notes"
                      type="text"
                      label="Notes for courier"
                      variant="underline"
                    />
                    <div className={styles.buttons}>
                      <Button
                        type="submit"
                        size="large"
                        color={submitButtonColor}
                      >
                        {submitButtonText}
                      </Button>
                      {isCancelButtonNeed && (
                        <Button
                          type="button"
                          size="large"
                          color="monochromatic"
                          onClick={onClose}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                );
              }}
            </Formik>
            {isPaginationNeed && (
              <div className={styles.stepsProgressBar}>
                <div className={styles.current} />
                <div className={""} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
