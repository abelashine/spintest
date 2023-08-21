import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import styles from "./AddVoucherModal.module.scss";
import closeButton from "../../../static/icons/cross.svg";
import { getinitialValues, validate } from "./initForm";
import {
  validateDateFields,
  createDataToRequest,
  wasThereChangesInFields,
} from "./helpers";
import vouchericon from "../../../static/icons/vouchericon.svg";
import { useSetCurrenciesListHook } from "../../../utils/hooks";
import { uploadSelectionActions } from "../../../actions/uploadSelection";

import Modal from "../index";
import VoucherTabs from "./VoucherTabs";
import Fields from "./Fields";
import Button from "../../Button";

const AddVoucherModal = ({ onClose, certainVoucher, isActiveVoucher }) => {
  const dispatch = useDispatch();
  const [voucherTab, setVoucherTab] = useState("personal");
  const [currencies, setCurrencies] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (certainVoucher) {
      setVoucherTab(certainVoucher.type.toLowerCase());
    }
  }, []);
  useSetCurrenciesListHook(setCurrencies);
  const isActiveExistingVoucher = isActiveVoucher && certainVoucher;

  const onSubmitHandler = (values) => {
    if (!certainVoucher) {
      // create voucher
      const dataToRequest = createDataToRequest(values, currencies);
      dispatch(uploadSelectionActions.createVoucher(dataToRequest, onClose));
    } else if (isActiveExistingVoucher && certainVoucher) {
      // edit voucher
      const dataToRequest = createDataToRequest(values, currencies);
      const wasChanges = wasThereChangesInFields(certainVoucher, values);
      if (!wasChanges) {
        onClose();
      } else {
        dispatch(
          uploadSelectionActions.editVoucher(
            dataToRequest,
            certainVoucher.id,
            onClose
          )
        );
      }
    } else if (!isActiveExistingVoucher && certainVoucher) {
      // reactivate or edit and reactivate voucher
      const wasChanges = wasThereChangesInFields(certainVoucher, values);
      if (!wasChanges) {
        dispatch(
          uploadSelectionActions.reactivateVoucher(certainVoucher.id, onClose)
        );
      } else{
        const dataToRequest = createDataToRequest(values, currencies);
        dispatch(uploadSelectionActions.editVoucher(dataToRequest, certainVoucher.id, onClose));
      }
    }
  };

  const onDeactivateHandler = (id) => {
    dispatch(uploadSelectionActions.deactivateVoucher(id, onClose));
  };
  const initialValues = getinitialValues(certainVoucher);
  const titleText = certainVoucher ? "Edit vouchers" : "Create new vouchers";
  if (!currencies) return null;
  return (
    <Modal isOpen>
      <div className={styles.AddVoucherModal}>
        <img
          src={closeButton}
          alt="closeButton"
          className={styles.modalHeader}
          onClick={onClose}
        />
        <div className={styles.AddVoucherModal__avatar}>
          <img src={vouchericon} alt="uploadedAvatar" />
        </div>
        <h2 className={styles.AddVoucherModal__title}>{titleText}</h2>
        {!certainVoucher && (
          <VoucherTabs voucherTab={voucherTab} setVoucherTab={setVoucherTab} />
        )}
        <Formik
          initialValues={initialValues}
          validate={(values) =>
            validate(values, users, voucherTab, certainVoucher)
          }
          onSubmit={onSubmitHandler}
        >
          {({ handleSubmit, values }) => {
            validateDateFields(values);
            return (
              <form onSubmit={handleSubmit}>
                <Fields
                  users={users}
                  setUsers={setUsers}
                  currencies={currencies}
                  voucherTab={voucherTab}
                  certainVoucher={certainVoucher}
                />
                <div className={styles.buttons}>
                  <Button type="submit" size="large" color="blue">
                    {!isActiveExistingVoucher && certainVoucher
                      ? "Reactivate"
                      : "Save"}
                  </Button>
                  {isActiveExistingVoucher && (
                    <Button
                      type="button"
                      size="large"
                      color="red"
                      onClick={() => onDeactivateHandler(certainVoucher.id)}
                    >
                      Deactivate
                    </Button>
                  )}
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

export default AddVoucherModal;
