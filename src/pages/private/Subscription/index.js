import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Subscription.module.scss";
import Button from "../../../components/Button";
import Footer from "../../../components/Footer/FooterSpin";
import Header from "../../../components/Header/HeaderSpin";
import SubscriptionPayment from "./SubscriptionPayment";
import { subscriptionData } from "../../../static/data/subscriptionData";
import {
  updateSubscription,
  cancelSubscription,
  foreignProfilebrandInfo,
  getProfileCards,
  subscriptionRepay,
} from "../../../api";
import SubscriptionReceiptsModal from "../../../components/Modal/SubscriptionModals/SubscriptionReceiptsModal";
import CancelSubscriptionModal from "../../../components/Modal/SubscriptionModals/CancelSubscriptionConfirmModal";
import UpgradeSubscriptionModal from "../../../components/Modal/SubscriptionModals/UpgradeSubscriptionConfirmModal";
import CancelSubscriptionFinishModal from "../../../components/Modal/SubscriptionModals/CancelSubscriptionModal";
import UpgradeSubscriptionFinishModal from "../../../components/Modal/SubscriptionModals/UpgradeSubscriptionModal";
import { authActions } from "../../../actions/auth";
import UnactiveSubscriptionModal from "../../../components/Modal/SubscriptionModals/UnactiveSubscriptionModal";
import NewCardModal from "../../../components/Modal/NewCardModal";
import ErrorSubscriptionModal from "../../../components/Modal/SubscriptionModals/ErrorSubscriptionModal";
import SuccessfulSubscriptionModal from "../../../components/Modal/SubscriptionModals/SuccessfulSubscriptionModal";

const Subscription = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(null);
  const [currentType, setCurrentType] = useState(null);
  const [isShow, setIsShow] = React.useState(false);
  const [subData, setSubData] = useState({});
  const [isReceiptsShow, setIsReceiptShow] = useState(false);
  const [isCancelSubscriptionShow, setIsCancelSubscriptionShow] = useState(
    false
  );
  const [isUpgradeSubscriptionShow, setIsUpgradeSubscriptionShow] = useState(
    false
  );
  const [
    isCancelSubscriptionFinishShow,
    setIsCancelSubscriptionFinishShow,
  ] = useState(false);
  const [
    isUpgradeSubscriptionFinishShow,
    setIsUpgradeSubscriptionFinishShow,
  ] = useState(false);
  const [tempValues, setTempValues] = useState(null);
  const [isSubscriptionCancelled, setIsSubscriptionCancelled] = useState(false);
  const [notActive, setNotActive] = useState(null);
  const [isUnactiveModalShow, setIsUnactiveModalShow] = useState(false);
  const [cards, setCards] = useState([]);
  const fetchCards = () => {
    if (userInfo?.slug) {
      getProfileCards().then(({ response }) => setCards(response.cards));
    }
  };
  const [isWalletModalVisible, setIsWalletModalVisible] = useState(false);
  const [activeSelect, setActiveSelect] = useState("");
  const [isSubsStatusChanged, setIsSubsStatusChanged] = useState(false);
  const [receiptData, setReceiptData] = useState([]);
  const [subscriptionActive, setSubscriptionActive] = useState("");
  const [isUpgrade, setIsUpgrade] = useState(false);
  const [cardData, setCardData] = useState(null);

  const [
    isSuccessfulSubscriptionModalOpened,
    setIsSuccessfulSubscriptionModalOpened,
  ] = useState(false);
  const [
    isErrorSubscriptionModalOpened,
    setIsErrorSubscriptionModalOpened,
  ] = useState(false);

  useEffect(() => {
    fetchCards();
  }, [isUnactiveModalShow]);

  const REACTIVATE_STATUSES = ["past_due", "incomplete"];

  const OLD_ESSENTIAL_IDS = process.env.REACT_APP_OLD_ESSENTIAL_IDS.split(" ");
  const OLD_PRIME_IDS = process.env.REACT_APP_OLD_PRIME_IDS.split(" ");
  const OLD_WHITELABEL_IDS = process.env.REACT_APP_OLD_WHITELABEL_IDS.split(
    " "
  );

  const createData = () => {
    const prices = [
      process.env.REACT_APP_ESSENTIAL,
      process.env.REACT_APP_PRIME,
      process.env.REACT_APP_WHITELABEL,
    ];
    const info = subscriptionData;
    return info.map((el, index) => {
      return {
        ...el,
        stripe_price: prices[index],
      };
    });
  };

  const data = createData();
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );

  const handleClick = () => {
    if (userInfo?.slug) {
      setIsShow(true);
    } else {
      history.push("/login");
    }
  };

  const repayUserSubscription = async (card_id) => {
    const { error, response } = await subscriptionRepay(notActive, card_id);
    if (error || !response) {
      dispatch(authActions.finishLoading());
      setIsUnactiveModalShow(false);
      setIsErrorSubscriptionModalOpened(true);
    } else {
      dispatch(authActions.finishLoading());
      setIsUnactiveModalShow(false);
      setIsSuccessfulSubscriptionModalOpened(true);
    }
  };

  const onSubmit = async (values) => {
    if (values.card_id !== "") {
      dispatch(authActions.startLoading());
      const { error, response } = await repayUserSubscription(values.card_id);
    } else if (values.card_id === "") {
      setIsWalletModalVisible(true);
    } else {
      setIsErrorSubscriptionModalOpened(true);
    }
  };

  const getProfileSubscriptions = async () => {
    const { error, response } = await foreignProfilebrandInfo(userInfo?.slug);
    if (!error) {
      try {
        if (response.subscription.status === "active") {
          setNotActive(null);
          setSubData(response.subscription);
          // setIsSubscriptionCancelled(
          //   response.subscription.end_after_current_period
          // );
          const currentPlan = data.find(
            (el) => el.stripe_price === response.subscription.plan
          );
          const isOldEssential = OLD_ESSENTIAL_IDS.find(
            (id) => id === response.subscription.plan
          );
          const isOldPrime = OLD_PRIME_IDS.find(
            (id) => id === response.subscription.plan
          );
          const isOldWhitelabel = OLD_WHITELABEL_IDS.find(
            (id) => id === response.subscription.plan
          );
          if (currentPlan) {
            setSubscriptionActive(currentPlan.type);
          } else if (isOldEssential) {
            setSubscriptionActive("essential");
          } else if (isOldPrime) {
            setSubscriptionActive("prime");
          } else if (isOldWhitelabel) {
            setSubscriptionActive("pro");
          }
        } else if (
          response.subscription.invoices.slice(-1)[0].stripe_id &&
          !response.subscription.invoices.slice(-1)[0].paid &&
          REACTIVATE_STATUSES.includes(response.subscription.status)
        ) {
          setNotActive(response.subscription.invoices.slice(-1)[0].stripe_id);
          setSubData(response.subscription);
          const currentPlan = data.find(
            (el) => el.stripe_price === response.subscription.plan
          );
          const isOldEssential = OLD_ESSENTIAL_IDS.find(
            (id) => id === response.subscription.plan
          );
          const isOldPrime = OLD_PRIME_IDS.find(
            (id) => id === response.subscription.plan
          );
          const isOldWhitelabel = OLD_WHITELABEL_IDS.find(
            (id) => id === response.subscription.plan
          );
          if (currentPlan) {
            setSubscriptionActive(currentPlan.type);
          } else if (isOldEssential) {
            setSubscriptionActive("essential");
          } else if (isOldPrime) {
            setSubscriptionActive("prime");
          } else if (isOldWhitelabel) {
            setSubscriptionActive("pro");
          }
        }
      } catch (e) {}
    }
  };
  const createSubscriptionData = () => {
    const subscriptions = subData.invoices;
    return subscriptions.map((el) => {
      return {
        paid: el.paid,
        date: new Date(el.payment_date),
        code: el.invoice_number,
        plan:
          data.find((e) => e.stripe_price === el.for_plan)?.type ||
          subscriptionActive,
        price: el.price
          ? parseInt(el.price / 100)
          : data.find((e) => e.type === subscriptionActive).price,
      };
    });
  };

  const updateUserSubscription = async (card_id=null) => {
    const { error, response } = await updateSubscription(
      data.find((el) => el.type === subscriptionActive).stripe_price, card_id
    );
    if (error || !response) {
      dispatch(authActions.finishLoading());
      history.push("/error");
    } else {
      dispatch(authActions.finishLoading());
      setIsUpgradeSubscriptionFinishShow(true);
      setIsUpgradeSubscriptionShow(false);
      setIsReceiptShow(false);
    }
  };
  const cancelUserSubscription = async () => {
    const { error, response } = await cancelSubscription(
      data.find((el) => el.type === subscriptionActive).stripe_price
    );
    if (error || !response) {
      dispatch(authActions.finishLoading());
      history.push("/error");
    } else {
      dispatch(authActions.finishLoading());
      setIsCancelSubscriptionFinishShow(true);
      setIsCancelSubscriptionShow(false);
      setIsReceiptShow(false);
    }
  };

  useEffect(() => {
    getProfileSubscriptions();
  }, [
    isShow,
    isUpgradeSubscriptionShow,
    isCancelSubscriptionShow,
    isReceiptsShow,
    isSuccessfulSubscriptionModalOpened,
  ]);

  const onUpgrade = () => {
    if (subscriptionActive === "essential") {
      setCurrentType(data[1].type)
    } else if (subscriptionActive === "prime") {
      setCurrentType(data[2].type)
    } else {
      setCurrentType(data[0].type)
    }
    setIsUpgrade(true)
    setIsShow(true)
  }

  useEffect(() => {
    if (isSubsStatusChanged.success) {
      setSubscriptionActive(isSubsStatusChanged.subscriptionType);
    }
  }, [isSubsStatusChanged.success]);

  return (
    <div>
      <div className={styles.Subscriptions}>
        <SuccessfulSubscriptionModal
          isOpened={isSuccessfulSubscriptionModalOpened}
          onModalClose={() => {
            setIsSuccessfulSubscriptionModalOpened(false);
          }}
        />
        <ErrorSubscriptionModal
          isOpened={isErrorSubscriptionModalOpened}
          onModalClose={() => {
            setIsErrorSubscriptionModalOpened(false);
          }}
          onClose={() => {
            setIsUnactiveModalShow(true);
            setIsErrorSubscriptionModalOpened(false);
          }}
        />
        {isWalletModalVisible && (
          <NewCardModal
            onClose={() => {
              fetchCards();
              setIsWalletModalVisible(false);
              setIsUnactiveModalShow(true);
            }}
          />
        )}
        {subData && (
          <SubscriptionReceiptsModal
            isOpened={isReceiptsShow}
            subData={receiptData}
            onModalClose={() => setIsReceiptShow(false)}
            onCancel={() => setIsCancelSubscriptionShow(true)}
            onUpgrade={onUpgrade}
            currentSubType={subscriptionActive}
            isCancelled={isSubscriptionCancelled}
          />
        )}
        {subscriptionActive !== "" && !isSubscriptionCancelled && (
          <CancelSubscriptionModal
            isOpened={isCancelSubscriptionShow}
            onModalClose={() => setIsCancelSubscriptionShow(false)}
            onClose={() => {
              dispatch(authActions.startLoading());
              cancelUserSubscription();
            }}
            cancelData={{
              type: subscriptionActive,
              price: data.find((el) => el.type === subscriptionActive).price,
            }}
          />
        )}
        {subscriptionActive !== data[2].type && subscriptionActive !== "" && (
          <UpgradeSubscriptionModal
            isOpened={isUpgradeSubscriptionShow}
            onModalClose={() => setIsUpgradeSubscriptionShow(false)}
            onClose={() => {
              dispatch(authActions.startLoading());
              updateUserSubscription();
            }}
            upgradeData={{
              type: subscriptionActive,
              new_type:
                data[data.findIndex((el) => el.type === subscriptionActive) + 1]
                  .type,
              price:
                data[data.findIndex((el) => el.type === subscriptionActive) + 1]
                  .price,
            }}
          />
        )}
        {subscriptionActive !== "" && (
          <CancelSubscriptionFinishModal
            isOpened={isCancelSubscriptionFinishShow}
            onModalClose={() => setIsCancelSubscriptionFinishShow(false)}
          />
        )}
        {subscriptionActive !== "" && (
          <UpgradeSubscriptionFinishModal
            isOpened={isUpgradeSubscriptionFinishShow}
            onModalClose={() => setIsUpgradeSubscriptionFinishShow(false)}
            subscriptionType={
              data[data.findIndex((el) => el.type === subscriptionActive)].type
            }
          />
        )}
        {subscriptionActive !== "" && notActive && (
          <UnactiveSubscriptionModal
            isOpened={isUnactiveModalShow}
            onModalClose={() => setIsUnactiveModalShow(false)}
            onSubmit={onSubmit}
            setActiveSelect={setActiveSelect}
            setIsWalletModalVisible={setIsWalletModalVisible}
            cards={cards}
            setTempValues={setTempValues}
          />
        )}
        <Header />
        {isShow && (
          <SubscriptionPayment
            subscriptionType={currentType}
            setIsSubsStatusChanged={setIsSubsStatusChanged}
            isOpened={isShow}
            onClose={() => setIsShow(false)}
            isUpgrade={isUpgrade}
            setIsShow={setIsShow}
            setIsUpgradeSubscriptionShow={setIsUpgradeSubscriptionShow}
            setCardData={setCardData}
            subscriptionActive={subscriptionActive}
            onUpgradeSubscription={(card_id) => {
              dispatch(authActions.startLoading());
              updateUserSubscription(card_id);
            }}
          />
        )}

        <div className={styles.main}>
          <div
            className={`${styles.section} ${styles.essential} ${
              currentTab === "essential" ? styles.active : ""
            }`}
            onClick={() => setCurrentTab(data[0].type)}
            onMouseOver={() => setCurrentTab(data[0].type)}
            onMouseLeave={() => setCurrentTab("")}
          >
            <h2>{data[0].type.toUpperCase()}</h2>
            <h3>{data[0].price === 0 ? "FREE" : data[0].price}</h3>
            <p>
              • Up to 10 SKU uploads
              <br />
              • Per SKU Upload Fee: $20 USD
              <br />
              • Per Item Upload Fee: $5 USD
              <br />
              • Transaction Fee: 30%
              <br />
              • App store, with ecosystem of traceability plugins and product
              IDs (coming soon)
              <br />
              • Products smart contracts with creators royalty system
              <br />
              • Art and Photography NFT system
              <br />
              • Customer digital ownership of items
              <br />
              • Global automatic pick up and delivery and returns of items
              <br />
              • Automated Take-Back Program
              <br />• Multiple circular retail business models, to sell,
              re-sell, rent, swap, borrow, pre-oder and auction
            </p>
            {subscriptionActive === data[0].type && !notActive && (
              <Button
                color="green"
                size="large"
                onClick={() => {
                  setReceiptData(createSubscriptionData());
                  setIsReceiptShow(true);
                }}
              >
                ACTIVE
              </Button>
            )}
            {subscriptionActive !== data[0].type && (
              <Button
                color="white"
                size="large"
                onClick={() => {
                  setCurrentType(data[0].type);
                  handleClick();
                }}
                disabled={subscriptionActive !== ""}
              >
                ACTIVATE
              </Button>
            )}
            {subscriptionActive === data[0].type && notActive && (
              <Button
                color="red"
                size="large"
                onClick={() => {
                  setIsUnactiveModalShow(true);
                }}
              >
                REACTIVATE
              </Button>
            )}
          </div>
          <div
            className={`${styles.section} ${styles.prime} ${
              currentTab === "prime" ? styles.active : ""
            }`}
            onClick={() => setCurrentTab(data[1].type)}
            onMouseOver={() => setCurrentTab(data[1].type)}
            onMouseLeave={() => setCurrentTab("")}
          >
            <h2>{data[1].type.toUpperCase()}</h2>
            <h3>
              {data[1].currency.symbol}
              {data[1].price} {data[1].currency.currency} per month
            </h3>
            <p>
              • x1 NFT RFID writer
              <br />
              • Up to 1,000 SKU uploads
              <br />
              • Per SKU Upload Fee: $5 USD
              <br />
              • Per Item Upload Fee: $2 USD
              <br />
              • Transaction Fee: 5%
              <br />
              • App store, with ecosystem of traceability plugins and product
              IDs (coming soon)
              <br />
              • Products smart contracts with creators royalty system
              <br />
              • Art and Photography NFT system
              <br />
              • Customer digital ownership of items
              <br />
              • Global automatic pick up and delivery and returns of items
              <br />
              • Automated Take-Back Program
              <br />• Multiple circular retail business models, to sell,
              re-sell, rent, swap, borrow, pre-oder and auction
            </p>
            {subscriptionActive === data[1].type && !notActive && (
              <Button
                color="green"
                size="large"
                onClick={() => {
                  setReceiptData(createSubscriptionData());
                  setIsReceiptShow(true);
                }}
              >
                ACTIVE
              </Button>
            )}
            {subscriptionActive !== data[1].type && (
              <Button
                color="white"
                size="large"
                onClick={() => {
                  setCurrentType(data[1].type);
                  handleClick();
                }}
                disabled={subscriptionActive !== ""}
              >
                ACTIVATE
              </Button>
            )}
            {subscriptionActive === data[1].type && notActive && (
              <Button
                color="red"
                size="large"
                onClick={() => {
                  setIsUnactiveModalShow(true);
                }}
              >
                REACTIVATE
              </Button>
            )}
          </div>
          <div
            className={`${styles.section} ${styles.whitelabel} ${
              currentTab === "whitelabel" ? styles.active : ""
            }`}
            onClick={() => setCurrentTab(data[2].type)}
            onMouseOver={() => setCurrentTab(data[2].type)}
            onMouseLeave={() => setCurrentTab("")}
          >
            <h2>{data[2].type.toUpperCase()}</h2>
            <h3>
              {data[2].currency.symbol}
              {data[2].price} {data[2].currency.currency} per month
            </h3>
            <p>
              • x1 NFT label printer
              <br />
              • x1 NFT RFID writer
              <br />
              • Unlimited SKU uploads
              <br />
              • Per SKU Upload Fee: $3 USD
              <br />
              • Per Item Upload Fee: $1 USD
              <br />
              • Transaction Fee: 2%
              <br />
              • RFID writer and reader integration
              <br />
              • App store, with ecosystem of traceability plugins and product
              IDs (coming soon)
              <br />
              • Products smart contracts with creators royalty system
              <br />
              • Art and Photography NFT system
              <br />
              • Customer digital ownership of items
              <br />
              • Global automatic pick up and delivery and returns of items
              <br />
              • Automated Take-Back Program
              <br />• Multiple circular retail business models, to sell,
              re-sell, rent, swap, borrow, pre-oder and auction
            </p>
            {subscriptionActive === data[2].type && !notActive && (
              <Button
                color="green"
                size="large"
                onClick={() => {
                  setReceiptData(createSubscriptionData());
                  setIsReceiptShow(true);
                }}
              >
                ACTIVE
              </Button>
            )}
            {subscriptionActive !== data[2].type && (
              <Button
                color="white"
                size="large"
                onClick={() => {
                  setCurrentType(data[2].type);
                  handleClick();
                }}
                disabled={subscriptionActive !== ""}
              >
                ACTIVATE
              </Button>
            )}
            {subscriptionActive === data[2].type && notActive && (
              <Button
                color="red"
                size="large"
                onClick={() => {
                  setIsUnactiveModalShow(true);
                }}
              >
                REACTIVATE
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Subscription;
