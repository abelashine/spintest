import React from "react";
import { useFormikContext } from "formik";
import styles from "./FirstFormPart.module.scss";
import UploadSelectionInput from "../../../Inputs/UploadSelectionInput";
import UploadTextarea from "../../../Inputs/UploadTextarea";
import HashesFieldBlock from "../../../Inputs/HashesFieldBlock";
import SizesQuantities from "../SizesQuantities";
import SellItemFields from "../SellItemFields";
import RentFieldsOne from "../RentFieldsOne";
import RentFieldsTwo from "../RentFieldsTwo";
import Button from "../../../../components/Button";
import { gendersData } from "../../../../static/data/dataForForms";

const FirstFormPart = ({
  categories,
  characteristics,
  topTitle,
  productInfo,
  isEdit,
}) => {
  const { values, errors, touched } = useFormikContext();
  console.log('values', values)
  return (
    <>
      <div className={styles.formtitle}>
        <p className={styles.formtitle__text}>Item information</p>
      </div>
      <div className={styles.fieldsInputs}>
        {/* TODO:
          "Brand name" was commented here, because there is no enough
              functionality, which provides its workflow fully
          Also was commented validation of this field in file initForm.js
            on one more level up
         */}
        {/* <UploadSelectionInput
          name="brandname"
          label="Brand name"
          placeholder="*Type here..."
          isError={{ text: errors.brandname, touched: touched.brandname }}
        /> */}
        <UploadSelectionInput
          name="itemname"
          label="Item name"
          placeholder="*Type here..."
          isError={{ text: errors.itemname, touched: touched.itemname }}
          isDisabled={isEdit === "isPassOn"}
        />
        <UploadSelectionInput
          name="itemsku"
          label="Item SKU"
          placeholder="*Type here..."
          isError={{ text: errors.itemsku, touched: touched.itemsku }}
          isDisabled={isEdit === "isPassOn"}
        />
        <div className={styles.itemCategory}>
          <UploadSelectionInput
            name="itemcategory"
            label="Item category"
            placeholder="*Type here..."
            type="select"
            variants={categories}
            isError={{
              text: errors.itemcategory,
              touched: touched.itemcategory,
            }}
            readOnly={false}
            isAutocomplete
            isDisabled={isEdit === "isPassOn"}
          />
        </div>
        {isEdit === "isPassOn" && (Boolean(productInfo?.composition) || Boolean(values.itemcomposition) || !productInfo?.for_art) && (
          <UploadSelectionInput
            name="itemcomposition"
            label="Item composition"
            placeholder="*Type here..."
            isError={{
              text: errors.itemcomposition,
              touched: touched.itemcomposition,
            }}
            isDisabled={isEdit === "isPassOn"}
          />
        )}
        <UploadTextarea
          value={values.itemdescription}
          name="itemdescription"
          label="Item description"
          placeholder="*Type here..."
          isDisabled={isEdit === "isPassOn"}
        />
        <SizesQuantities
          characteristics={characteristics}
          isDisabled={isEdit === "isPassOn"}
        />
        {!productInfo?.for_art && (
          <div className={styles.itemGender}>
            <UploadSelectionInput
              name="itemgender"
              label="Item gender"
              placeholder="*Select"
              type="select"
              variants={gendersData}
              isError={{ text: errors.itemgender, touched: touched.itemgender }}
              isDisabled={isEdit === "isPassOn"}
            />
          </div>
        )}
        {topTitle === "Sell item" && (
          <SellItemFields
            characteristics={characteristics}
            isDisabled={isEdit === "isPassOn"}
            productInfo={productInfo}
          />
        )}
        {topTitle === "Rent item" && (
          <RentFieldsOne characteristics={characteristics} />
        )}
        <HashesFieldBlock
          values={values}
          name="itemhashtagfield"
          totalNames="itemhashtags"
          label="Item hashtags"
        />
        {topTitle === "Rent item" && (
          <RentFieldsTwo productInfo={productInfo} />
        )}
      </div>
      <div className={styles.delimiter} />
      <Button type="submit" color="white" size="middle">
        Next
      </Button>
    </>
  );
};
export default FirstFormPart;
