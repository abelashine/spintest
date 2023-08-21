import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { uploadSelectionActions } from "../../../actions/uploadSelection";
import UploadProductForm from './UploadProductForm/index.js'
import UploadImages from './UploadImages/index.js'
import { getInitialValues, validate } from './initForm'
import createProductInfo from './helpers.js'

import {
  productCharacteristics,
  productCategories,
  getAddresses,
  getProfileCards,
  updateWardrobeItem,
  downloadImage,
} from "../../../api";
import styles from "./UploadProduct.module.scss";

import MyWalletModal from "../../Modal/MyWalletModal";
import NewCardModal from "../../Modal/NewCardModal";
import ShippingAddressModal from "../../Modal/ShippingAddressesModal";
import NewShippingAddressModal from "../../Modal/NewShippingAddressModal";
import Button from "../../Button";

export default ({
  onClose,
  onSubmit,
  fromStartSwapping,
  productInfo,
  category,
  isPassOn,
  isEdit,
}) => {
  const userInfo = useSelector((store) => store.authReducer.userInfo);

  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const [addresses, setAddreses] = useState([]);
  const [characteristics, setCharacteristics] = useState(null);
  const [categories, setCategories] = useState(null);
  const [currentSelect, setCurrentSelect] = useState(null);
  const [isWalletModalVisible, setIsWalletModalVisible] = useState(false);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [images, setImages] = useState([]);

  const initialValues = getInitialValues(createProductInfo(productInfo, category));

  const fetchCards = () => {
    getProfileCards().then(({ response }) =>
      setCards([...response.cards, { card_last_digits: "Add New Card" }])
    );
  };

  const fetchAddresses = () => {
    getAddresses().then(({ response }) => 
      setAddreses([...response.addresses, { address: "Add New +" }])
    );
  };

  const modifyProduct = (data, isEdit=true) => {
    const resultInfo = { ...data };

    resultInfo.photos = resultInfo?.images.filter(img => img)
    resultInfo.composition = resultInfo.description

    resultInfo.currency_id =
      data.currency_id &&
      characteristics.currencies.find(
        ({ currency, id }) => id === data.currency_id
      ).id;

    if (data.shippingCosts !== "I will pay" && !data.card_id) {
      delete resultInfo.card_id;
    }

    if (isEdit) {
      resultInfo.product_slug = productInfo.slug;
      resultInfo.giveaway = productInfo.giveaway;
  
      resultInfo.hashtag_ids = [
        categories.find((category) => category.en === data.category).id,
      ];
    } else {
      resultInfo.slug = userInfo && userInfo.slug;
      if (isPassOn) {
        resultInfo.isPassOn = isPassOn;
        resultInfo.slug = productInfo.slug;
        resultInfo.productLinkId = productInfo.product_link_id;
      }

      if (isPassOn) {
        updateWardrobeItem(productInfo.id, userInfo.slug).then((res) => {
          res.text().then((text) => {});
        });
      }
    }

    resultInfo.hashtag_ids = [
      categories.find((category) => category.en === data.category).id,
    ];

    dispatch(
      isEdit ? (
        uploadSelectionActions.editProductAsync(resultInfo, () => {
          onSubmit && onSubmit();
          onClose && onClose();
        })
      ) : (
        uploadSelectionActions.uploadProductAsync(resultInfo, () => {
          onSubmit && onSubmit();
          onClose && onClose();
        })
      )    
    )
  }

  // Download images and set them through setImages hook
  useEffect(() => {
    if (productInfo && productInfo.images.length > 0) {
      productInfo.images.forEach((image) => {
        downloadImage(image.url).then((image) => {
          const imageArray = [];
          imageArray.push(image);
          setImages((prevImages) => [...imageArray, ...prevImages,]);
        });
      });
    }
  }, [productInfo]);

  // Fetches credit cards info and addresses, additionally sets product categories and characteristics
  useEffect(() => {
    fetchCards();
    fetchAddresses();

    productCategories().then(({ response }) =>
      setCategories(response.hashtags)
    );
    productCharacteristics().then(({ response }) =>
      setCharacteristics(response)
    );

    document.body.style.overflow = "hidden";

    if (fromStartSwapping) {
      document.querySelectorAll("[class^=NavBar]")[0].style.display = "none";
    }

    return () => {
      if (fromStartSwapping) {
        document.body.style.overflow = "initial";
        document.querySelectorAll("[class^=NavBar]")[0].style.display = "flex";
      }
    };
  }, [fromStartSwapping]);

  return (
    <div className={styles.uploadProduct}>
      {isWalletModalVisible &&
        (cards.length === 1 ? (
          <NewCardModal
            onClose={() => {
              fetchCards();
              setIsWalletModalVisible(false);
            }}
          />
        ) : (
          <MyWalletModal
            onClose={() => {
              fetchCards();
              setIsWalletModalVisible(false);
            }}
          />
        ))}
      {isAddressModalVisible &&
        (addresses.length === 1 ? (
          <NewShippingAddressModal
            onClose={() => {
              fetchAddresses();
              setIsAddressModalVisible(false);
            }}
          />
        ) : (
          <ShippingAddressModal
            onClose={() => {
              fetchAddresses();
              setIsAddressModalVisible(false);
            }}
          />
        ))}
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
        {isEdit ? "Edit product" : "Upload product"}
      </div>
      <div className={styles.uploadForm}>
        <Formik initialValues={initialValues} validate={(props) => validate(props, categories)} onSubmit={(data, props) =>
          isEdit ? modifyProduct(data, true) : modifyProduct(data, false)}>
          {({ values, handleSubmit, errors, touched }) => {
            return <form onSubmit={handleSubmit}>
              <UploadImages preloadPhotos={images} />
              <div className={styles.delimiter} />
              {characteristics && categories && (
                <>
                  <UploadProductForm
                    categories={categories}
                    characteristics={characteristics}
                    values={values}
                    errors={errors}
                    touched={touched}
                    addresses={addresses}
                    cards={cards}
                    setCurrentSelect={setCurrentSelect}
                    setIsAddressModalVisible={setIsAddressModalVisible}
                    setIsWalletModalVisible={setIsWalletModalVisible}
                  />
                  <Button type="submit" color="white" size="middle">
                    {isEdit ? "Edit" : "Upload"}
                  </Button>
                </>
              )}
              <div className={styles.delimiter} />
            </form>
          }}
        </Formik>
      </div>
    </div>
  );
};
