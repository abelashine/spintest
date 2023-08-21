import React, {useState, useEffect, useReducer} from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { uploadSelectionActions } from "../../../actions/uploadSelection";
import { getInitialValues, validate } from './initForm';
import {
  createNFTInfo,
} from "./helpers";
import {
  createHistoryLayers,
  addPrevItemLayer,
} from "../SellSwapItem/helpers";

import {
  productCharacteristics,
  getAddresses,
  productCategories
} from "../../../api";
import { quantity } from "../../../static/data/dataForForms";
 
import styles from "./MintNFT.module.scss";
import hashstyles from "../AddPrevLayerModal/HashesFieldBlock/HashesFieldBlock.module.scss";

import PriceBlock from "../UploadProduct/PriceBlock";
import ImageUploader from "../../Inputs/ImageUploader";
import UploadSelectionInput from "../../Inputs/UploadSelectionInput";
// import { AddressSelect } from "../../Inputs/ProductRequest/AddressSelect";
import ItemJourney from "../SellSwapItem/ItemJourney";
import AddPrevLayerModal from "../AddPrevLayerModal";
import CheckboxBlack from "../../Inputs/CheckboxBlack";
import Button from "../../Button";
import HashesFieldBlock from "../../Inputs/HashesFieldBlock";
import Royalties from "./Royalties";
import AddRoyaltiesModal from "./AddRoyaltiesModal";

export default ({ onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const initialValues = getInitialValues(createNFTInfo(""));
  const { transactionHistory } = useSelector((state) => state.profileReducer);
  const [addresses, setAddreses] = useState([])
  const [characteristics, setCharacteristics] = useState(null);
  // const [review, setReview] = useState(false);
  const [journeyModal, setJourneyModal] = useState(false);
  const [royaltiesModal, setRoyaltiesModal] = useState(false);
  const [prevLayers, setPrevLayers] = useState(createHistoryLayers(transactionHistory));
  const [creators, setCreators] = useState([{}]);
  const [usedRoyalties, setUsedRoyalties] = useState(0);
  const [termsActive, setTermsActive] = useState(null)
  const [categories, setCategories] = useState(null);
  const maxRoyalties = 10;

  const inlinestyle = {
    padding: "3px 0px 10px 0px",
    display: "flex",
    justifyContent: "center",
  };

  const price = "0.15";
  const currency = "EUR";
  const isDisabled = usedRoyalties >= maxRoyalties;

  useEffect(() => {
    productCategories().then(({ response }) =>
      setCategories(response.hashtags)
    );
  }, [productCategories]);

  const publishNFT = (values) => {
    if(!values.terms_and_conditions){
      setTermsActive(false)
    }else {
      const data = {
        title: values.title,
        description: values.description,
        fbx: values.fbx,
        raw: values.raw,
        image: values.photo,
        location: values.location,
        hashtag: values.hashtag,
        digital: values.productType === "digital",
        phygital: values.productType === "phygital",
        quantity: values.quantity,
        layers: values.layers,
        price: values.price,
        // currency: values.currency,
        creators: values.royalties,
      }

      dispatch(uploadSelectionActions.uploadContentAsync(data, onSubmit));
      onClose();
    }
  };
  const fetchAddresses = () => {
    getAddresses().then(({ response }) => 
      setAddreses([...response.addresses, { address: "Add New +" }])
    );
  };

  useEffect(() => {
    fetchAddresses();
    productCharacteristics().then(({ response }) =>
      setCharacteristics(response),
    );
  }, [])
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <div className={styles.MintNFT}>
      <div className={styles.header}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="14"
          className={styles.arrow}
          onClick={onClose}
        >
          <path
            fill="var(--white)"
            fillRule="evenodd"
              d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
          />
        </svg>
        Upload art NFT
      </div>
      <div className={styles.delimiter} />
      <div className={styles.uploadForm}>
        <Formik initialValues={initialValues} validate={(props) => validate(props)} onSubmit={(props) => publishNFT(props)}>
          {({ values, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.fields}>
                <div className={styles.selectsGroup}>
                  <UploadSelectionInput
                    name="businessModel"
                    label="Business Model"
                    type="select"
                    variants={[{"value": "Sell", "name": "Sell"}, {"value": "Swap", "name": "Swap"}, {"value": "Rent", "name": "Rent"}]}
                    errors={errors}
                    touched={touched}
                  />
                  <UploadSelectionInput
                    name="productType"
                    label="Product Type"
                    type="select"
                    variants={[{"value": "Digital", "name": "Digital"}, {"value": "Phygital", "name": "Phygital"}]}
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </div>
              <div className={`${styles.photo} ${values?.photo ? styles.filled : ""}`}>
                <ImageUploader
                  closeButton
                  name="photo"
                  placeholder="Add a cover image"
                  uploadPhoto
                  withCrop
                  isCircled={false}
                />
              </div>
              <div className={styles.fields} style={{margin: "10px auto 20px"}}>
                <label className={styles.nft_file_form}>
                  <span className={!values.fbx ? styles.nft_files_upload_button: styles.checkmark}>{!values.fbx ? "+" : ""}</span>
                  <input id="fbx" name="fbx" type="file" accept=".fbx" onChange={
                    (event) => {
                      values.fbx=event.currentTarget.files[0];
                      errors.fbx=null;
                      forceUpdate();
                      {/* if you have a problem with this hack, you are free to re-write this component */}
                    }}/>
                </label>
                {errors.fbx && touched.fbx && (
                  <div className={styles.errorText}>{errors.fbx}</div>
                )}
                <label className={styles.nft_file_form}>
                  <span className={!values.raw ? styles.nft_files_upload_button: styles.checkmark}>{!values.raw ? "+" : ""}</span>
                  <input id="raw" name="raw" type="file" accept=".raw" onChange={
                    (event) => {
                      values.raw=event.currentTarget.files[0];
                      errors.raw=null;
                      forceUpdate();
                    }} />
                </label>
                {errors.raw && touched.raw && (
                  <div className={styles.errorText}>{errors.raw}</div>
                )}
              </div>
              <div className={styles.delimiter} />
                <div className={styles.fields}>
                  <h3 className={styles.nftTitle}>NFT Information</h3>
                <UploadSelectionInput
                  name="title"
                  label="Title"
                  placeholder="Type here..."
                  isError={{text: errors.title, touched: touched.title }}
                  errors={errors}
                />
                <UploadSelectionInput
                  name="itemsku"
                  label="Item SKU"
                  placeholder="*Type here..."
                  touched={touched}
                  isError={{ text: errors.itemsku, touched: touched.itemsku }}
                  // isDisabled={isEdit === "isPassOn"}
                />
                <UploadSelectionInput
                  name="itemcategory"
                  label="Item Category"
                  placeholder="Photograph"
                  type="select"
                  variants={categories}
                  isError={{
                    text: errors.itemcategory,
                    touched: touched.itemcategory,
                  }}
                  readOnly={false}
                  isAutocomplete
                  // isDisabled={isEdit === "isPassOn"}
                />
                <UploadSelectionInput
                  name="description"
                  label="Description"
                  placeholder="*Describe your NFT and tell a story..."
                  isError={{ text: errors.description, touched: touched.description }}
                />
                {/* {addresses.length && (
                  <AddressSelect
                    name="address_id"
                    label="Location"
                    placeholder="*Type here..."
                    variants={addresses}
                    isError={{ text: errors.location, touched: touched.location }}
                    onAddNew={() => setIsLocationModalVisible(true)}
                    setActiveSelect={setCurrentSelect}
                    addressLabel="Location"
                  />
                )} */}
                {characteristics ? 
                  <>
                    <UploadSelectionInput
                      name="quantity"
                      label="Quantity"
                      type="select"
                      variants={quantity}
                      errors={errors}
                      touched={touched}
                    />
                    <PriceBlock
                      label='NFT Price'
                      characteristics={characteristics}
                      values={values}
                      errors={errors}
                      touched={touched}
                    />
                  </>
                  :
                  ""
                }
                <div className={hashstyles.inputFields__selectField}>
                  <HashesFieldBlock 
                    label="Hashtags"
                    name="hashtags"
                    totalNames="hashtags"
                    values={values}          
                  />
                </div>
              </div>
              <div className={styles.delimiter} />
              <div className={styles.fields}>
                <Royalties
                  openModal={() => setRoyaltiesModal(true)}
                  creators={creators}
                  setCreators={setCreators}
                  usedRoyalties={usedRoyalties}
                  setUsedRoyalties={setUsedRoyalties}
                  isDisabled={isDisabled}
                />
              </div>
              <div className={styles.delimiter} />
              {journeyModal && (
                <AddPrevLayerModal
                  onClose={() => setJourneyModal(false)}
                  addPrevItemLayer={(data) =>
                    addPrevItemLayer(
                      data,
                      prevLayers,
                      setPrevLayers,
                      setJourneyModal
                    )
                  }
                />
              )}
              {royaltiesModal && (
                <AddRoyaltiesModal
                  onClose={() => setRoyaltiesModal(false)}
                  availableRoyalties={maxRoyalties-usedRoyalties}
                  usedRoyalties={usedRoyalties}
                  setUsedRoyalties={setUsedRoyalties}
                  creators={creators}
                  setCreators={setCreators}
                />
              )}
              <div className={styles.fields}>
                <ItemJourney
                  openModal={() => setJourneyModal(true)}
                  prevLayers={prevLayers}
                  setPrevLayers={setPrevLayers}
                />
              </div>
              <div className={styles.delimiter} />
              <div className={styles.fields}>
                <p className={styles.textStyles}>
                  * A SPIN NFT is minted only when a transaction is made, and the blockchain minting price ({price} {currency} per NFT) will be deducted from your sales <br />
                  * SPIN NFTs are caring for the environment <br />
                  * The CO2 used to drive 1 mile by car is equivalent to minting 1,000,000 SPIN NFTs <br />
                </p>
                <span className={styles.checkbox} onChange={()=> {
                  values.terms_and_conditions ?  setTermsActive(false) : setTermsActive(true)
                }}>
                  <CheckboxBlack
                    name="terms_and_conditions"
                    value={values.terms_and_conditions}
                    inlineStyle={inlinestyle}
                    // isError={{ text: errors.terms_and_conditions, touched: touched.terms_and_conditions }}
                  />
                  <p>
                    I accept the terms and conditions and
                    <br/>
                    confirm to have all Intellectual Property
                    rights to mint and sell this NFT
                  </p>
                </span>
                {errors.terms_and_conditions && touched.terms_and_conditions && (
                  <div className={styles.errorText}>{errors.terms_and_conditions}</div>
                )}
              </div>
              <div className={styles.delimiter} />
              <Button color="white" type="submit" size="middle" >
                NEXT
              </Button>
              <div style={{paddingBottom: 40}} />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};