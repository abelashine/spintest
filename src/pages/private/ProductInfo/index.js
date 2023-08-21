import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch, Link, useHistory } from "react-router-dom";
import { Mixpanel } from "../../../services/Mixpanel";
import { foreignProfilebrandInfo, transactionHistory } from "../../../api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "./ProductInfo.module.scss";
import View from "../../../static/icons/views.svg";
import {
  getAddresses,
  getProfileCards,
  wardrobe,
  getPaymentIntentSecret,
  follow,
} from "../../../api";
import {
  getProdV1,
  getProdV2,
  backBtnHandler,
  getRentalProduct,
  getSoldProduct,
  getSwappedProduct,
  closeConfirmDeleteProd,
} from "./helpers";
import { setDialogConnectionHandler } from "../../../utils";
import { profileActions } from "../../../actions/profile";
import { authActions } from "../../../actions/auth";
import { errorsActions } from "../../../actions/errors";
import routes from "../../../routes";
import SpinLogo from "../../../static/images/logo/spinByLablacoLogoWhite.svg";
import lablacoLogo from "../../../static/images/logo/lablacoLogo.svg";
import { ReactComponent as ShareButton } from "../../../static/icons/shareButton.svg";
import qrCodeIcon3 from "../../../static/icons/qrCodeIcon3.svg";
import ARIcon from "../../../static/icons/ARIcon.svg";
import backArrow from "../../../static/icons/back-arrow.svg";
import backArrowV2 from "../../../static/icons/back-arrowV2.svg";
import nextArrowV2 from "../../../static/icons/next-arrowV2.svg";
import yellowMarkCircle from "../../../static/icons/yellowMarkCircle.svg";
import followiconV1 from "../../../static/icons/followiconV1.svg";
import chaticonV1 from "../../../static/icons/chaticonV1.svg";
import { ReactComponent as MoodboardIcon } from "../../../static/icons/moodboardicon.svg";

import MyWalletModal from "../../../components/Modal/MyWalletModal";
import NewCardModal from "../../../components/Modal/NewCardModal";
import ShippingAddressModal from "../../../components/Modal/ShippingAddressesModal";
import NewShippingAddressModal from "../../../components/Modal/NewShippingAddressModal";
import TabsGroup from "../../../components/TabsGroup";
import TabBody from "./TabBody";
import Map from "../../../components/Map";
import Avatar from "../../../components/Avatar";
import PaymentModal from "../../../components/Modal/PaymentModal";
import GiveBackQRModal from "../../../components/Modal/GiveBackQRModal";
import ConfirmDeleteProductModal from "../../../components/Modal/ConfirmDeleteProductModal";
import ModalMemories from "../../../components/Modal/ModalMemories";
import { JOURNEY, IMPACT, tabsArray } from "./tabs";
import SellSwapItem from "../../../components/Modal/SellSwapItem";
import PickUpForm from "./PickUpForm";
import HomeDeliveryForm from "./HomeDeliveryForm";
import QrModal from "./QrModal";
import ProductTypeModal from "./ProductTypeModal";
import ClipBoardCopied from "../../../components/ClipBoardCopied";
import ButtonContainer from "./ButtonContainer";
import { useStripe } from "@stripe/react-stripe-js";
import { checkTkBckR } from "./helpers";
import PhygitalNFTsExplanation from "./PhygitalNFTsExplanation";
import { getMemoriesToRender } from "../../../components/Modal/ModalMemories/helpers";
import { Helmet } from 'react-helmet';

const CheckMark = () =>
  <svg style={{ width: "100%", maxWidth: 16, marginRight: 5, marginLeft: 5 }} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(.4 .5)" fill="none" fillRule="evenodd">
      <ellipse fill="#239EFE" cx="7.1" cy="6.9" rx="7.1" ry="6.9" />
      <path
        d="M9.3 5l.5.5a.6.6 0 010 .8L7.2 8.8l-.4.4-.2.1h-.2L6 9.2 4.3 7.6a.6.6 0 010-.9l.4-.4c.3-.2.6-.2.9 0l.8.8 2.1-2c.2-.2.6-.2.8 0z"
        fill="#FFF"
      />
    </g>
  </svg>

export default ({ isPublic, location: { state, pathname } }) => {
  // FIXME: REMOVE THIS SHIT
  const { token, slug } = useParams();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeTab, setTab] = useState(JOURNEY);
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );
  const {
    productInfo,
    productToken,
    tokenizedBrandInfo,
    certainDiscount,
    transactionHistory,
  } = useSelector((state) => state.profileReducer);
  const [profileInfo, setProfileInfo] = useState(null);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [currentSize, setCurrentSize] = useState(false);
  const [currentSizeId, setCurrentSizeId] = useState(null);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const sizeRef = useRef(null);
  const sizeIdRef = useRef(null);
  const quantityRef = useRef(null);
  const [availableQuantity, setAvailableQuantity] = useState(null);
  const [activeCheckoutTab, setActiveCheckoutTab] = useState("pickup_store");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [buyStatus, setBuyStatus] = useState(null);
  const [uniqueLinks, setUniqueLinks] = useState([]);
  const [allowApply, setAllowApply] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [totalPrice, setTotalPrice] = useState(9);
  const [totalPriceToPay, setTotalPriceToPay] = useState(null);
  const totalPriceToUse = useRef(null);
  useEffect(() => {
    totalPriceToUse.current = totalPriceToPay;
  }, [totalPriceToPay]);
  const [cards, setCards] = useState([]);
  const [addresses, setAddreses] = useState([]);
  const [isWalletModalVisible, setIsWalletModalVisible] = useState(false);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [
    isFirstTimeUserAddressModalVisible,
    setIsFirstTimeUserAddressModalVisible,
  ] = useState(false);
  const [
    isFirstTimeUserWalletModalVisible,
    setIsFirstTimeUserWalletModalVisible,
  ] = useState(false);
  const [isBothModalsOpened, setIsBothModalsOpened] = useState(false);
  const [
    isFirstTimeModalsSubmittedCorrectly,
    setIsFirstTimeModalsSubmittedCorrectly,
  ] = useState(false);
  const [isQROpened, setIsQROpened] = useState(false);
  const [activeSelect, setActiveSelect] = useState("");
  const [isConfirmDeleteModalOpened, setIsConfirmDeleteModalOpened] = useState(
    false
  );
  const [isStockFull, setIsStockFull] = useState(null);
  const [isUploadProductVisible, setIsUploadProductVisible] = useState("");
  const [isShareClicked, setIsShareClicked] = useState(false);
  const [wardrobeItem, setWardrobeItem] = useState({});
  const stripe = useStripe();
  const [isGiveBackModalOpened, setIsGiveBackModalOpened] = useState(false);
  const [checkDataTimer, setCheckDataTimer] = useState(false);
  const [tempValues, setTempValues] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMemoryModal, setIsMemoryModal] = useState(false);
  const [passonLink, setPassonLink] = useState("");
  //AR constants
  const [androidModelLink, setAndroidModelLink] = useState("");
  const [iosModelLink, setIosModelLink] = useState("");
  const [arAnchorMode, setArAnchorMode] = useState("floor");

  //Carousel Custom Arrows
  const arrowStyles = {
    position: 'absolute',
    zIndex: 1,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
    border: "none",
    background: "none",
    padding: 0,
  };

  const arrowImgStyles = {
    width: 8,
    height: 14,
  }

  const arrowParent = {
    position: 'relative',
  }
  const [isProductTypeModal, setIsProductTypeModal] = useState(false);

  //[Leo - 2210191101] to get access selected checkout product type from ProductTypeModel component
  const [selectedProductCheckOutType, setSelectedProductCheckOutType] = useState("");
  const setChosenCheckOutType = (messageType) => {
    setSelectedProductCheckOutType(messageType);
  }

  const pageDescription = `@${productInfo?.slug} • Join SPIN and experience curated Web3 marketplace for phygital Fashion, Art and Architecture.`;
  // useEffect hooks start
  useEffect(() => {
    const slug =
      state && state.viewedAs !== userInfo?.slug
        ? state.viewedAs
        : userInfo && userInfo.slug;
    if (slug) {
      wardrobe(slug).then((res) => {
        if (res.response) {
          const products = res.response.products;
          const currentProduct = products.find(
            (el) => el.passon_link === token
          );
          if (currentProduct) {
            setWardrobeItem((prev) => ({
              ...prev,
              currentOwner: currentProduct.current_owner,
              oldOwner: currentProduct.old_owner,
              productSlug: currentProduct.product_slug,
              isUserOwner: currentProduct.current_owner === userInfo?.slug,
            }));
          }
        }
      });
    }
    return () => {
      dispatch(profileActions.setProductInfo(null));
      dispatch(profileActions.setTransactionHistory(null));
    };
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(profileActions.fetchProdByToken(token, null, history));
      dispatch(profileActions.fetchTransactionHistory(token));
      dispatch(profileActions.fetchTokenizedBrandInfo(token));
    } else {
      dispatch(
        profileActions.fetchProdBySlug(
          slug,
          (res) => {
            getProdV1(res, setAllowApply, setIsStockFull, isPublic);
          },
          history
        )
      );
    }
  }, [slug, isPublic]);

  useEffect(() => {
    if (match.path === routes.checkoutProduct) {
      setIsOrderDetailsOpened(true);
    }
    else {
      setIsOrderDetailsOpened(false);
    }
  }, [match]);

  useEffect(() => {
    if (!isPublic) {
      fetchCards();
      fetchAddresses();
    }
  }, [isPublic]);
  useEffect(() => {
    if (isFirstTimeModalsSubmittedCorrectly === true) {
      if (activeCheckoutTab === "pickup_store" && cards.length > 0) {
        const values = {
          ...tempValues,
          card_id: (cards.length > 0 && cards[0].id) || "",
        };
        onSubmit(values);
      } else if (
        activeCheckoutTab === "home_delivery" &&
        addresses.length > 0 &&
        cards.length > 0
      ) {
        const values = {
          ...tempValues,
          address_id: (addresses.length > 0 && addresses[0].id) || "",
          card_id: (cards.length > 0 && cards[0].id) || "",
        };
        onSubmit(values);
      }
    }
  }, [cards, addresses, isFirstTimeModalsSubmittedCorrectly]);

  //used for ModelViewer AR
  useEffect(() => {
    console.log(productInfo);
    if (productInfo?.digital_twin) {
      setAndroidModelLink(`${productInfo.digital_twin?.ar_android}`);
      setIosModelLink(`${productInfo.digital_twin?.ar_ios}`);
      if (productInfo.digital_twin?.position == "wall") {
        setArAnchorMode("wall");
      }
      return;
    }
    if (productInfo && productInfo.digital_items.length > 0) {
      let genderTemp = "male";
      if (productInfo.gender === "N") {
        genderTemp = "non-binary"
      }
      else if (productInfo.gender === "F") {
        genderTemp = "female"
      }
      let index = 0;
      for (let i = 0; i < productInfo.digital_items.length; i++) {
        if (productInfo.digital_items[i].body_type === genderTemp) {
          index = i;
          break;
        }
      }

      //setAndroidModelLink(`${productInfo.digital_items[index].unity_model}?title=${productInfo.slug}&link=https://spin.lablaco.com/`);
      setAndroidModelLink(`${productInfo.digital_items[index].unity_model}`);
      //TODO [Leo - 2301160030] when need to show text box later. for now, it was causing bug to hide camera button in ios AR.
      //setIosModelLink(`${productInfo.digital_items[index].fbx_model}#callToAction=Go&checkoutTitle=${productInfo.slug}&checkoutSubtitle=Click%20here%20to%20view%20the%20NFT%20details%20on%20SPIN&price=${priceText}}`);
      setIosModelLink(`${productInfo.digital_items[index].fbx_model}`);
    }

  }, [productInfo, androidModelLink, iosModelLink]);

  useEffect(() => {
    // Kill me
    if (productInfo) {
      if (selectedProductCheckOutType === 'phygital') {
        const phygitalStock = productInfo.stocks.find((x) => x.type === '1')
        if (phygitalStock?.size) {
          setCurrentSize(phygitalStock.size.name);
          setCurrentSizeId(phygitalStock.size.id);
          setAvailableQuantity(phygitalStock.quantity);
        } else {
          setAvailableQuantity(phygitalStock?.quantity || 1);
        }
      } else if (selectedProductCheckOutType === 'digital') {
        const digitalStock = productInfo.stocks.find((x) => x.type === '2')
        setAvailableQuantity(digitalStock?.quantity || 1)
      }
      getProdV2(productInfo, setTotalPrice, setWardrobeItem);
      foreignProfilebrandInfo(productInfo.poster.slug)
        .then(({ response }) => {
          setIsFollowing(response.is_following);
          setProfileInfo(response);
        })
        .catch((err) => err);
    }
  }, [productInfo, selectedProductCheckOutType]);
  useEffect(() => {
    sizeRef.current = currentSize;
    sizeIdRef.current = currentSizeId;
    quantityRef.current = currentQuantity;
  }, [currentQuantity, currentSize, currentSizeId]);
  useEffect(() => {
    if (isGiveBackModalOpened) {
      checkTkBckR(
        checkDataTimer,
        isGiveBackModalOpened,
        { ...productInfo, passon_link: match.params.token },
        setCheckDataTimer,
        setIsGiveBackModalOpened,
        dispatch,
        history
      );
    } else clearInterval(checkDataTimer);
    return () => clearInterval(checkDataTimer);
  }, [isGiveBackModalOpened]);

  const [memories, setMemories] = useState([]);
  const [memoriesNumber, setMemoriesNumber] = useState(0);
  useEffect(() => {
    if (productInfo) {
      getMemoriesToRender(
        productInfo.slug,
        setMemories,
        setMemoriesNumber
      );
    }
  }, [transactionHistory, productInfo]);

  //[Leo - 2210191149] To Persist selected product model type in /checkout/slug state when page reload
  useEffect(() => {
    setSelectedProductCheckOutType(window.localStorage.getItem('selectedProductCheckOutType'));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('selectedProductCheckOutType', selectedProductCheckOutType)
  }, [selectedProductCheckOutType]);


  const fetchCards = () => {
    getProfileCards().then(({ response }) => setCards(response.cards));
  };

  const fetchAddresses = () => {
    getAddresses().then(({ response }) => {
      setAddreses(response.addresses);
    });
  };

  const submitFailed = () => {
    dispatch(authActions.finishLoading());
    setBuyStatus("failed");
    dispatch(errorsActions.showErrorRequestModal("Error"));
  };

  const submitSuccess = (response, type) => {
    setUniqueLinks(response.response.uniqueLinks);
    setBuyStatus("success");
    setIsModalOpened(true);
    setIsButtonDisabled(true);
    dispatch(authActions.finishLoading());
    Mixpanel.track(type);
  };

  const onSubmit = async (values) => {
    if (selectedProductCheckOutType === 'phygital' && !productInfo.for_art && !sizeRef.current) {
      setCurrentSize(null);
      return;
    }
    const realPrice = parseFloat(totalPriceToUse.current);
    if (
      values &&
      values.address_id === "" &&
      values.card_id === "" &&
      realPrice
    ) {
      setIsFirstTimeUserAddressModalVisible(true);
      setIsBothModalsOpened(true);
    } else if (values && values.address_id === "") {
      setIsFirstTimeUserAddressModalVisible(true);
      // check whether user on home delivery tab and card_id empty or
      // on pickup in store and price of product 0, then show only one modal
    } else if (
      values &&
      ((values.card_id === "" && activeCheckoutTab === "home_delivery") ||
        (values.card_id === "" && productInfo.price !== 0)) &&
      realPrice
    ) {
      setIsFirstTimeUserWalletModalVisible(true);
    } else {
      dispatch(authActions.startLoading());
      const resultData = {};
      resultData.products = [
        {
          product_id: productInfo.id,
          size_id: sizeIdRef.current,
          quantity: quantityRef.current,
          product_type: selectedProductCheckOutType === 'phygital' ? '1' : '2'
        },
      ];
      resultData.shippingCost = 0.0;
      if (activeCheckoutTab === "home_delivery" && values.address_id) {
        resultData.address_id = values.address_id;
        resultData.shippingCost = 9.0;
      } else {
        delete resultData.address_id;
      }
      resultData.card_id = productInfo.price > 0 && values.card_id;
      let clientSecret = null;
      if (!productInfo.giveaway) {
        const secretData = {
          price: realPrice,
          currency: productInfo.currency.currency,
        };
        if (productInfo.for_rent) {
          secretData.price_per_day = productInfo.price_per_day;
        }
        if (realPrice) clientSecret = await getPaymentIntentSecret(secretData);
        if (realPrice && !clientSecret.response) {
          submitFailed();
        }
      }
      let cardSource = null;
      if (productInfo.price !== 0 && realPrice) {
        cardSource = cards.find((val) => val.id === values.card_id)?.source;
      }
      // here is the condition to send correct requeest
      // in depending of product type
      if (activeCheckoutTab === "pickup_store" && productInfo.for_rent) {
        getRentalProduct(
          productInfo,
          certainDiscount,
          realPrice,
          submitFailed,
          submitSuccess,
          sizeIdRef.current,
          quantityRef.current,
          clientSecret,
          cardSource,
          values,
          stripe
        );
      } else if (productInfo.giveaway) {
        getSwappedProduct(
          resultData,
          productInfo,
          submitFailed,
          submitSuccess,
          activeCheckoutTab
        );
      } else {
        getSoldProduct(
          resultData,
          productInfo,
          certainDiscount,
          realPrice,
          submitFailed,
          submitSuccess,
          clientSecret,
          cardSource,
          stripe,
          activeCheckoutTab
        );
      }
    }
  };

  const openUploadPopup = (value) => {
    setIsUploadProductVisible(value);
    if (value === "isPassOn") {
      setPassonLink(token);
    }
  };

  const closeUploadSelection = () => {
    document.body.style.overflow = "initial";
    if (isUploadProductVisible === "isEdit") {
      history.push(`/${userInfo.slug}/profile/store`);
    }
  };

  const onShareHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsShareClicked(true);
  };

  const onBackArrow = () => {
    backBtnHandler(history, setIsOrderDetailsOpened);
  };

  const followUnfollow = () => {
    !isFollowing &&
      follow(productInfo.poster.slug).then(() => setIsFollowing(true));
  };

  const calculateQuantityByType = (stocks, initial=false) => {
    let quantities = {
      phygital: 0,
      digital: 0
    };
    for (let item of stocks) {
      if (item.type === "1") {
        if (initial) {
          quantities.phygital += item.initial_quantity;
        } else {
          quantities.phygital += item.quantity;
        }
      } else if (item.type === "2") {
        if (initial) {
          quantities.digital += item.initial_quantity;
        } else {
          quantities.digital += item.quantity;
        }
      }
    }
    return quantities;
}

  const onFollowHandler = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem("lastUrl", pathname);
      history.push(routes.prelogin);
    } else if (!isFollowing) {
      followUnfollow();
    } else {
      setDialogConnectionHandler(history, userInfo, profileInfo);
    }
  };
  const followBtnText = isFollowing ? "Chat" : "Follow";
  const followBtnImg = isFollowing ? chaticonV1 : followiconV1;

  const priceText = `${productInfo?.currency?.symbol || "€"}${productInfo?.for_rent
    ? productInfo?.price_per_day.toFixed(2)
    : productInfo?.price.toFixed(2)
    }`;
  const digitalPriceText = `${productInfo?.currency?.symbol || "€"}${productInfo?.digital_price?.toFixed(2)
    }`;
  const priceTitleText = productInfo?.for_rent
    ? "NFT prices per day"
    : "NFT prices and quantities";

  if (!productInfo) return null;

  // TODO:
  // this is a temporal filtering that is done here;
  // client asked to hide the 'Impact' tab for products, which were uploaded by the
  // brands with slugs: "DOVER STREET LITTLE MARKETt", "WEINSANTO";
  // later it has to be removed
  // =======
  let temporalTabsArray = [...tabsArray];
  if (
    productInfo.brand.toUpperCase() === "DOVER STREET LITTLE MARKET" ||
    productInfo.brand.toUpperCase() === "WEINSANTO"
  ) {
    temporalTabsArray = temporalTabsArray.filter((tab) => tab.name !== IMPACT);
  }
  // =======
  return (
    <div className={styles.ProductInfo}>
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href={`${process.env.PUBLIC_URL}/favicon.png`} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content={pageDescription}
        />
        <meta 
          property="og:image" content={productInfo?.image?.url} 
        />
        <meta
          name="keywords"
          content="circularfashionspin, fashiontech, sustainablefashion, sustainablefashion, circulareconomy,
          blockchain, tokenize, tokenization, circularretail, transparency, socialcommerce, shopping, influencers,
          influencer, brand, brands, store, stores, design, fashion, sustainability, circularity"
        />
      </Helmet>
      {/*MODALS start*/}
      {log("Product Info : " + JSON.stringify(productInfo))};
      <GiveBackQRModal
        isOpened={isGiveBackModalOpened}
        productInfo={{
          ...productInfo,
          old_owner: wardrobeItem.oldOwner,
          passon_link: match.params.token,
        }}
        onModalClose={() => setIsGiveBackModalOpened(false)}
      />
      {isFirstTimeUserAddressModalVisible &&
        (isBothModalsOpened ? (
          <NewShippingAddressModal
            onClose={() => {
              fetchAddresses();
              setIsFirstTimeUserAddressModalVisible(false);
              setIsFirstTimeUserWalletModalVisible(true);
            }}
            isCancelButtonNeed={false}
            submitButtonText={"Next"}
            submitButtonColor={"black"}
            isPaginationNeed={true}
            isCrossNeed={true}
            setIsModalNeedOnProductPage={setIsFirstTimeUserAddressModalVisible}
          />
        ) : (
          <NewShippingAddressModal
            onClose={() => {
              fetchAddresses();
              setIsFirstTimeUserAddressModalVisible(false);
              setIsFirstTimeModalsSubmittedCorrectly(true);
            }}
            isCancelButtonNeed={false}
            submitButtonText={"Pay"}
            submitButtonColor={"blue"}
            isCrossNeed={true}
            setIsModalNeedOnProductPage={setIsFirstTimeUserAddressModalVisible}
          />
        ))}

      {isFirstTimeUserWalletModalVisible &&
        (isBothModalsOpened ? (
          <NewCardModal
            onClose={() => {
              fetchCards();
              setIsFirstTimeUserWalletModalVisible(false);
              setIsBothModalsOpened(false);
              setIsFirstTimeModalsSubmittedCorrectly(true);
            }}
            isCancelButtonNeed={false}
            submitButtonText={"Pay"}
            submitButtonColor={"blue"}
            isPaginationNeed={true}
            isCrossNeed={true}
            setIsModalNeedOnProductPage={setIsFirstTimeUserWalletModalVisible}
          />
        ) : (
          <NewCardModal
            onClose={() => {
              fetchCards();
              setIsFirstTimeUserWalletModalVisible(false);
              setIsFirstTimeModalsSubmittedCorrectly(true);
            }}
            isCancelButtonNeed={false}
            submitButtonText={"Pay"}
            submitButtonColor={"blue"}
            isCrossNeed={true}
            setIsModalNeedOnProductPage={setIsFirstTimeUserWalletModalVisible}
          />
        ))}

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
      {isShareClicked && (
        <ClipBoardCopied
          setIsActive={setIsShareClicked}
          copiedObjectName="product"
        />
      )}
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
      {productInfo && (
        <ConfirmDeleteProductModal
          isOpened={isConfirmDeleteModalOpened}
          onClose={() =>
            closeConfirmDeleteProd(
              state?.wardrobeId,
              setIsConfirmDeleteModalOpened,
              history
            )
          }
          onModalClose={() => setIsConfirmDeleteModalOpened(false)}
        />
      )}

      {isUploadProductVisible && tokenizedBrandInfo && (
        <SellSwapItem
          onClose={() => {
            setIsUploadProductVisible("");
            document.body.style.overflow = "initial";
          }}
          onSubmit={() => {
            setIsUploadProductVisible("");
            closeUploadSelection();
            history.push("/");
          }}
          productInfo={productInfo}
          isEdit={isUploadProductVisible}
          passonLink={passonLink}
        />
      )}

      {productInfo && (
        <PaymentModal
          isOpened={isModalOpened}
          isSuccess={buyStatus === "success"}
          onClose={() => {
            setIsModalOpened(false);
            setIsOrderDetailsOpened(false);
          }}
          onModalClose={() => {
            setIsModalOpened(false);
          }}
          productInfo={productInfo}
        />
      )}
      <QrModal
        productInfo={productInfo}
        isQROpened={isQROpened}
        setIsQROpened={setIsQROpened}
        slug={slug}
        token={token}
      />
      {isMemoryModal && (
        <ModalMemories onClose={() => setIsMemoryModal(false)} />
      )}
      {/*MODALS end*/}

      <div className={styles.header}>
        {userInfo && (
          <button
            onClick={onBackArrow}
            className={styles.backBtn}
            type="button"
          >
            <img src={backArrow} alt="Back arrow" />
          </button>
        )}

        <img src={SpinLogo} alt="SpinLogo" className={styles.logoImg} />
        <div className={`${styles.profileCoins}`}>
          <ShareButton
            onClick={onShareHandler}
            className={styles.shareButton}
          />
        </div>
      </div>

      {/* ----------Component to Work on Model Viewer start------------------- */}


      <div className={styles.Carausel}>
        <Carousel
          useKeyboardArrows
          swipeable={false}
          //emulateTouch
          showStatus={false}
          showArrows={true}
          showThumbs={false}
          style={arrowParent}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, left: 'calc(50% - 165px)' }}
              >
                <img src={backArrowV2}
                  style={arrowImgStyles} />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, right: 'calc(50% - 165px)' }}
              >
                <img
                  src={nextArrowV2}
                  style={arrowImgStyles} />
              </button>
            )
          }

          renderIndicator={(e, isSelected) => (
            <div
              className={`${styles.dot} ${isSelected ? styles.active : ""}`}
            />
          )}
        >
          <div className={styles.ModelViewerStyle}>
            <model-viewer
              id="id-model-viewer"
              src={androidModelLink}
              ios-src={iosModelLink}
              poster={productInfo.images[0].url}
              alt="Model Not Included"
              loading="eager"
              touch-action="pan-y"
              disable-zoom
              ar
              ar-modes="scene-viewer webxr quick-look"
              ar-placement={arAnchorMode}
              camera-controls
              auto-rotate
            >
              <button slot="ar-button" className={styles.CustomARBtn}>
              </button>
            </model-viewer>
          </div>

          {productInfo.images.map(({ url }, index) => (
            <div key={index} className={styles.CarauselWrapper}>
              <div
                className={styles.CarauselImage}
                style={{ backgroundImage: `url(${url})` }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <ProductTypeModal
        productInfo={productInfo}
        isProductTypeModal={isProductTypeModal}
        setIsProductTypeModal={setIsProductTypeModal}
        isPublic={isPublic}
        pathname={pathname}
        setSelectedProductType={setChosenCheckOutType}
      />
      {/* ----------Component to Work on Model Viewer end------------------- */}
      {isOrderDetailsOpened ? (
        <div className={styles.orderDetails}>
          <div className={styles.mainTitle}>ORDER DETAILS</div>
          {productInfo.for_art ? null : 
            (selectedProductCheckOutType === "phygital" ? (
              <>
                <div className={styles.label}>Size</div>
                <ul className={styles.sizesList}>
                  {productInfo.out_of_stock
                    ? "Out of stock"
                    : productInfo.stocks.filter(item => item.size).map(
                      ({ size: { name, id }, quantity }, index) =>
                        quantity > 0 && (
                          <li
                            key={index}
                            className={currentSize === name ? styles.active : ""}
                            onClick={() => {
                              setCurrentSize(name);
                              setCurrentSizeId(id);
                              setAvailableQuantity(quantity);
                            }}
                          >
                            {name}
                          </li>
                        )
                    )}
                </ul>
                {currentSize === null && (
                  <span className={styles.errorText}>Please, choose one size</span>
                )}
              </>
            ) : (
              selectedProductCheckOutType === "digital" ? (
                //[Leo - 2210191344] For the future if we need to add different UI when chosen type is digital
                <></>
              ) : (
                //[Leo - 2210191345] For the future to know when the chosen type is neither phygital or digital, bug maybe?
                <></>
              )))
          }
          <div className={styles.label}>Quantity</div>
          <ul className={styles.quantityList}>
            {productInfo.out_of_stock
              ? "Out of stock"
              : availableQuantity &&
              [
                ...Array(
                  availableQuantity > 5 ? 6 : availableQuantity
                ).keys(),
              ].map((number) => (
                <li
                  key={number}
                  className={
                    number + 1 === currentQuantity ? styles.active : ""
                  }
                  onClick={() => {
                    setCurrentQuantity(number + 1);
                    setTotalPrice((number + 1) * productInfo.price + 9);
                  }}
                >
                  {number > 4 ? "+" : number + 1}
                </li>
              ))}
          </ul>
          {selectedProductCheckOutType === "phygital" ? (
            <>
              <div className={styles.itemLocation}>
                <div className={styles.label}>Item location</div>
                {log("City" + productInfo.city)}
                <Map
                  coordinates={productInfo.city}
                  photo={productInfo.images[0].url}
                />
              </div>
              <div className={styles.checkoutTabs}>
                <TabsGroup
                  tabs={[
                    {
                      name: "pickup_store",
                      label: "Pick up in store",
                    },
                  ]}
                  activeTab={activeCheckoutTab}
                  onTabChange={(tab) => {
                    setActiveCheckoutTab("pickup_store");
                  }}
                  className={styles.tabs}
                />
              </div>
            </>
          ) : (
            <></>)}

          <div className={styles.currentCheckoutTab}>
            {activeCheckoutTab === "home_delivery" ? (
              <HomeDeliveryForm
                productInfo={productInfo}
                onSubmit={onSubmit}
                addresses={addresses}
                activeSelect={activeSelect}
                setIsAddressModalVisible={setIsAddressModalVisible}
                setActiveSelect={setActiveSelect}
                setIsWalletModalVisible={setIsWalletModalVisible}
                cards={cards}
                allowApply={allowApply}
                isPublic={isPublic}
                history={history}
                userInfo={userInfo}
                isButtonDisabled={isButtonDisabled}
                total={totalPriceToPay}
                setTotal={setTotalPriceToPay}
                setTempValues={setTempValues}
              />
            ) : (
              <PickUpForm
                productInfo={productInfo}
                onSubmit={onSubmit}
                setActiveSelect={setActiveSelect}
                setIsWalletModalVisible={setIsWalletModalVisible}
                cards={cards}
                allowApply={allowApply}
                isButtonDisabled={isButtonDisabled}
                history={history}
                isPubli={isPublic}
                currentQuantity={currentQuantity}
                total={totalPriceToPay}
                setTotal={setTotalPriceToPay}
                setTempValues={setTempValues}
                currentSize={currentSize}
                //[Leo - 2210191538] seleectedProductCheckOutType will be handed down to PickupForm>Summarize directly.
                //Logic was intended to solve the checkout always using phygital prices even user select digital.
                checkoutProductType={selectedProductCheckOutType}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <div className={styles.CompanyContainer}>
            <div className={styles.CompanyInfo}>
              <div className={styles.CompanyLogo}>
                <Link to={`/${productInfo.poster.slug}/profile`}>
                  <Avatar
                    url={productInfo.poster.image.url}
                    isBrand={
                      false
                      //productInfo.poster.business_role
                    }
                    isSmall
                  />
                </Link>
              </div>
              <div className={styles.CompanyText}>
                <div className={styles.CompanyName}>{productInfo.name}</div>
                <div className={styles.CompanyTag}>
                  <Link
                    style={{ display: "flex" }}
                    to={`/${productInfo.poster.slug}/profile`}
                  >
                    {`@${productInfo.poster.slug}`}
                    {
                      productInfo.poster.business_role &&
                      <CheckMark />
                    }
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.ViewContainer}>
              {(!userInfo || userInfo.slug !== productInfo.poster.slug) && (
                <button
                  className={`${styles.ActionButtons__followingBtn} ${isFollowing && styles.ActionButtons__chatBtn
                    }`}
                  onClick={onFollowHandler}
                >
                  <span>{followBtnText}</span>
                  <img src={followBtnImg} alt={`${followBtnText} icon`} />
                </button>
              )}
            </div>
          </div>
          <div className={styles.ActionButtons}>
            <div className={styles.iconContainer}>
              <img
                className={styles.icon}
                src={qrCodeIcon3}
                alt="QR Code Icon"
                onClick={() => setIsQROpened(true)}
              />
              <span>{" QR"}</span>
            </div>
            <div className={styles.iconContainer}>
              <img
                className={styles.icon}
                src={ARIcon}
                alt="QR Code Icon"
                onClick={() => {
                  const mv = document.getElementById('id-model-viewer');
                  //console.log(productInfo.digital_items);
                  mv.activateAR()
                }
                }
              />
              <span>{" AR"}</span>
            </div>
            <div className={styles.iconContainer}>
              <MoodboardIcon
                className={styles.icon}
                onClick={() => setIsMemoryModal(true)}
              />
              <span>
                {addMagnitude(memoriesNumber)}
                {" Memories"}
              </span>
            </div>
            <div className={styles.iconContainer}>
              <img className={styles.EyeIcon} src={View} alt="view" />
              <span>
                {addMagnitude(productInfo.view_count)}
                {productInfo.view_count === 1 ? " View" : " Views"}
              </span>
            </div>
          </div>
          <div className={styles.MainBody}>
            <div className={styles.MainText}>PRODUCT DETAILS</div>
            <div className={styles.MainTabs}>
              <TabsGroup
                activeTab={activeTab}
                tabs={temporalTabsArray}
                onTabChange={setTab}
              />
              <TabBody
                tab={activeTab}
                tokenizedBrandInfo={tokenizedBrandInfo}
                token={token || productToken}
              />
            </div>
          </div>
          <PhygitalNFTsExplanation />
          {match.path === routes.product && !productInfo.giveaway && (
            <div className={styles.Price}>
              <span className={styles.PriceHeader}>{priceTitleText}</span>
              {productInfo?.product_type == 1 ? (
                <span>
                  {"Phygital: "}
                  {priceText}
                  {` (${productInfo?.currency?.currency})`} <br/>
                  {
                    `Phygital available quantity: ${calculateQuantityByType(productInfo?.stocks).phygital}/` +
                    `${calculateQuantityByType(productInfo?.stocks, true).phygital}\n`
                  }
                </span>
              ) : null}
              {productInfo?.digital_price ? (
                <span>
                  {"Digital: "}
                  {digitalPriceText}
                  {` (${productInfo?.currency?.currency})`} <br/>
                  {
                    `Digital available quantity: ${calculateQuantityByType(productInfo?.stocks).digital}/` +
                    `${calculateQuantityByType(productInfo?.stocks, true).digital}\n`
                  }
                </span>
              ) : null}
            </div>
          )}

          <ButtonContainer
            isPublic={isPublic}
            setIsProductTypeModal={setIsProductTypeModal}
            setIsOrderDetailsOpened={setIsOrderDetailsOpened}
            setIsGiveBackModalOpened={setIsGiveBackModalOpened}
            openUploadPopup={openUploadPopup}
            setIsConfirmDeleteModalOpened={setIsConfirmDeleteModalOpened}
            isStockFull={isStockFull}
            pathname={pathname}
          />
          <div className={styles.lablacoLogo}>
            <img src={lablacoLogo} alt="Lablaco Logo" />
          </div>
        </>
      )}
    </div>
  );
};
const log = (variable) => {
  //console.log(variable);
}

const addMagnitude = (number) => {
  /*
    Adds a Magnitute sign to the number
   */

  const POWERS = [
    "", "K", "M", "B", "T"
  ]
  const STEP = 3;

  const powerOfK = Math.floor(Math.ceil(Math.log10(number + 1) - 1) / STEP);
  number = Math.floor(number / Math.pow(10, powerOfK * STEP));
  const result = `${number}${POWERS[powerOfK] || ""}`;
  return result;
}
