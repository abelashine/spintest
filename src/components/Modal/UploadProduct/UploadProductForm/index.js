import React from "react";
import styles from "./UploadProductForm.module.scss";
import UploadSelectionInput from "../../../Inputs/UploadSelectionInput";

import PriceBlock from "../PriceBlock";
import { CardSelect } from "../../../Inputs/ProductRequest/CardSelect";
import { AddressSelect } from "../../../Inputs/ProductRequest/AddressSelect";

const UploadProductForm = ({
  categories,
  characteristics,
  values,
  errors,
  touched,
  addresses,
  cards,
  setCurrentSelect,
  setIsAddressModalVisible,
  setIsWalletModalVisible,
}) => {
  return (
    <>
      <div className={styles.fieldsInputs}>
        <UploadSelectionInput
          name="name"
          label="Brand and title"
          placeholder="*Type here"
          isError={{ text: errors.name, touched: touched.name }}
        />
        <UploadSelectionInput
          name="category"
          label="Category"
          placeholder="*Select"
          type="select"
          variants={categories}
          readOnly={false}
          isError={{ text: errors.category, touched: touched.category }}
          isAutocomplete
        />
        <PriceBlock
          characteristics={characteristics}
          values={values}
          errors={errors}
          touched={touched}
        />
        <UploadSelectionInput
          name="description"
          label="Description and composition"
          placeholder="*Describe the item with its condition, colour, style…"
          isError={{ text: errors.description, touched: touched.description }}
        />
        <UploadSelectionInput
          name="shippingCosts"
          label="Shipping costs"
          placeholder="Receiver"
          type="select"
          variants={[
            {
              name: "Receiver will pay",
              value: "Receiver will pay",
            },
            {
              name: "I will pay",
              value: "I will pay",
            },
          ]}
        />
        {values.shippingCosts === "I will pay" && (
          <CardSelect
            name="card_id"
            label="Payment method"
            placeholder="*Select"
            variants={cards}
            isError={{ text: errors.card_id, touched: touched.card_id }}
            onAddNew={() => setIsWalletModalVisible(true)}
            setActiveSelect={setCurrentSelect}
          />
        )}
        {addresses.length && (
          <AddressSelect
            name="address_id"
            label="Delivery address"
            placeholder="*Select"
            variants={addresses}
            isError={{ text: errors.address_id, touched: touched.address_id }}
            onAddNew={() => setIsAddressModalVisible(true)}
            setActiveSelect={setCurrentSelect}
          />
        )}
      </div>
    </>
  );
};

export default UploadProductForm;
