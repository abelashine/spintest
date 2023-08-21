import React from "react";
import { Formik } from "formik";

import TextField from "../../Inputs/TextField";
import Select from "../../Inputs/Select";
import Modal from "../index";
import Button from "../../Button";
import styles from "./CompanyInformationModal.module.scss";
import BlackCircle from "../BlackCircle";

export default () => {
  return (
    <Modal isOpen={true}>
      <div className={styles.Modal}>
        <div className={styles.modalHeader}>
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14">
            <path
              fill="var(--black)"
              fillRule="evenodd"
              d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
            />
          </svg>
        </div>
        <div className={styles.modalBody}>
          <BlackCircle>
            <div className={styles.logoText}>
              <div>Upload</div>
              <div>company logo</div>
              <div className={styles.plus}>+</div>
            </div>
          </BlackCircle>
          <div className={styles.modalTitle}>Company Information</div>
          <div className={styles.details}>
            <Formik
              initialValues={{
                companyName: "Lablaco",
                taxVat: "",
                legalAddress: "",
                postalCode: "",
                city: "",
                generalCompanyEmail: "",
                contactPerson: "",
                countryCode: "+00",
                phoneNumber: "",
              }}
              validate={(...props) => {
                const errors = {};
                return errors;
              }}
              onSubmit={() => null}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="companyName"
                    type="text"
                    placeholder="Lablaco"
                    variant="underline"
                    label="Company name"
                  />
                  <TextField
                    name="taxVat"
                    type="text"
                    placeholder="Tax n. / Vat"
                    variant="underline"
                  />
                  <TextField
                    name="legalAddress"
                    type="text"
                    placeholder="Legal Address"
                    variant="underline"
                  />
                  <TextField
                    name="postalCode"
                    type="text"
                    placeholder="Postal code (if any)"
                    variant="underline"
                  />
                  <TextField
                    name="city"
                    type="text"
                    placeholder="City"
                    variant="underline"
                  />
                  <TextField
                    name="generalCompanyEmail"
                    type="text"
                    placeholder="General company email"
                    variant="underline"
                  />
                  <TextField
                    name="contactPerson"
                    type="text"
                    placeholder="Contact person"
                    variant="underline"
                  />
                  <div className={styles.phoneLine}>
                    <div className={styles.phoneNumberLabel}>Phone number</div>
                    <div className={styles.countryCode}>
                      <Select
                        options={[{ value: "+00" }, { value: "+01" }]}
                        name="countryCode"
                        label="Phone nymber"
                        type="text"
                        placeholder="+00"
                        variant="underline"
                      />
                    </div>
                    <div className={styles.phoneNumber}>
                      <TextField
                        name="phoneNumber"
                        type="text"
                        placeholder="000 00 000 00"
                        variant="underline"
                      />
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button type="submit" size="large" color="black">
            Next
          </Button>
          <Button type="button" size="large" color="monochromatic">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
