import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  downloadImage,
  productCharacteristics,
  productCategories,
} from "../../../api";
import { Formik } from "formik";
import { uploadSelectionActions } from "../../../actions/uploadSelection";
import styles from "./SellSwapItem.module.scss";
import { getInitialValues, validate } from "./initForm";
import {
  createDataToRequest,
  createHistoryLayers,
  fetchAddresses,
  fetchCards,
  addPrevItemLayer,
  getCertainAction,
  onSubmitFinish,
} from "./helpers";
import UploadImages from "./UploadImages/index.js";
import FirstFormPart from "./FirstFormPart/index.js";
import SecondFormPart from "./SecondFormPart/index.js";
import AddPrevLayerModal from "../../../components/Modal/AddPrevLayerModal";
import NewCardModal from "../../../components/Modal/NewCardModal";
import NewShippingAddressModal from "../../../components/Modal/NewShippingAddressModal";
import backArrow from "../../../static/icons/back-arrow.svg";

const SellSwapItem = ({
  onClose,
  topTitle,
  onSubmit,
  isEdit,
  productInfo,
  passonLink,
}) => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const { transactionHistory } = useSelector((state) => state.profileReducer);
  const reduxDispatch = useDispatch();
  const [characteristics, setCharacteristics] = useState(null);
  const [categories, setCategories] = useState(null);
  const [formNum, setFormNum] = useState(0);
  const [prevLayers, setPrevLayers] = useState(
    createHistoryLayers(transactionHistory)
  );
  const [isAddPrevLayerModal, setIsAddPrevLayerModal] = useState(false);
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [addressField, setAddressField] = useState(null);
  const [addCardModal, setAddCardModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [kindProdString, setKindProdString] = useState(null);
  const [images, setImages] = useState([]);
  const modalRef = useRef(null);

  console.log('productInfo', productInfo)
  // useEffect hooks start
  useEffect(() => {
    (async function () {
      if (productInfo && productInfo.images.length > 0) {
        const imageArray = [];
        for (let i = 0; i < productInfo.images.length; i++) {
          const image = await downloadImage(productInfo.images[i].url);
          imageArray.push(image);
        }
        setImages(imageArray);
      }
    })();
  }, [productInfo]);
  useEffect(() => {
    productCategories(productInfo?.for_art).then(({ response }) =>
      setCategories(response.hashtags)
    );
    productCharacteristics().then(({ response }) =>
      setCharacteristics(response)
    );
    document.body.style.overflow = "hidden";
    fetchAddresses(setAddresses, setAddAddressModal, setAddressField);
    fetchCards(setCards, setAddCardModal);
    if (!isEdit && !productInfo) {
      setKindProdString(topTitle);
    } else {
      const title = productInfo.for_rent
        ? "Rent item"
        : productInfo.giveaway
          ? "Swap item"
          : "Sell item";
      setKindProdString(title);
    }
  }, []);

  useEffect(() => {
    setPrevLayers(createHistoryLayers(transactionHistory))
  }, [transactionHistory])
  // useEffect hooks end

  const onUpdateAddresses = () => {
    fetchAddresses(setAddresses, setAddAddressModal, setAddressField);
  };
  const onCloseAddCardModal = () => {
    fetchCards(setCards, setAddCardModal);
    setAddCardModal(false);
  };
  const history = useHistory();
  const returnToFirstFormPart = () => setFormNum(0);
  const uploadProduct = (data) => {
    if (formNum === 0) {
      setFormNum(1);
      modalRef.current.scrollTop = 0;
      return;
    }
    const isPassonLink = isEdit === "isPassOn" ? passonLink : null;
    const dataToRequest = createDataToRequest(
      data,
      categories,
      characteristics,
      prevLayers,
      productInfo,
      isPassonLink
    );
    const action = getCertainAction(isEdit, kindProdString);
    reduxDispatch(
      uploadSelectionActions[action](dataToRequest, (res) => {
        onSubmitFinish(
          isEdit,
          onClose,
          onSubmit,
          history,
          userInfo,
          isPassonLink,
          res
        );
      })
    );
  };
  const initialValues = getInitialValues(productInfo, isEdit);
  if (!characteristics || !categories) return null;

  return (
    <div className={styles.SellSwapItem} ref={modalRef}>
      {isAddPrevLayerModal && (
        <AddPrevLayerModal
          onClose={() => setIsAddPrevLayerModal(false)}
          addPrevItemLayer={(data) =>
            addPrevItemLayer(
              data,
              prevLayers,
              setPrevLayers,
              setIsAddPrevLayerModal
            )
          }
        />
      )}
      {addAddressModal && (
        <NewShippingAddressModal
          onClose={() => setAddAddressModal(false)}
          onUpdateAddresses={onUpdateAddresses}
        />
      )}
      {addCardModal && <NewCardModal onClose={onCloseAddCardModal} />}
      <div className={styles.header}>
        <img
          src={backArrow}
          alt="back-arrow"
          className={styles.arrow}
          onClick={!formNum ? onClose : returnToFirstFormPart}
        />
        {isEdit === "isEdit" ? "Edit item" : kindProdString}
      </div>
      <div className={styles.uploadForm}>
        <Formik
          initialValues={initialValues}
          // commented because of issue on second phase on passon
          // validate={(props) =>
          //   validate(props, formNum, kindProdString, categories, addresses)
          // }
          onSubmit={(data) => uploadProduct(data)}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <UploadImages preloadPhotos={images} />
              <div className={styles.delimiter} />
              {formNum === 0 ? (
                <FirstFormPart
                  categories={categories}
                  characteristics={characteristics}
                  topTitle={kindProdString}
                  productInfo={productInfo}
                  isEdit={isEdit}
                />
              ) : (
                <SecondFormPart
                  openModal={() => setIsAddPrevLayerModal(true)}
                  prevLayers={prevLayers}
                  setPrevLayers={setPrevLayers}
                  addresses={addresses}
                  cards={cards}
                  topTitle={kindProdString}
                  isEdit={isEdit}
                  addressField={addressField}
                  productInfo={productInfo}
                />
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SellSwapItem;
