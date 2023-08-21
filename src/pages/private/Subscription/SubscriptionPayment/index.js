import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../actions/auth";
import {
  createSubscription,
  getAddresses,
  getProfileCards,
  subscriptionShippingAddress,
} from "../../../../api";
import Footer from "../../../../components/Footer/FooterSpin";
import Header from "../../../../components/Header/HeaderSpin";
import Modal from "../../../../components/Modal";
import NewCardModal from "../../../../components/Modal/NewCardModal";
import NewShippingAddressModal from "../../../../components/Modal/NewShippingAddressModal";
import ErrorSubscriptionModal from "../../../../components/Modal/SubscriptionModals/ErrorSubscriptionModal";
import SuccessfulSubscriptionModal from "../../../../components/Modal/SubscriptionModals/SuccessfulSubscriptionModal";
import { subscriptionData } from "../../../../static/data/subscriptionData";
import emptyCheckbox from "../../../../static/icons/checkbox.svg";
import checkedCheckbox from "../../../../static/icons/checked-checkbox.svg";
import printerIcon from "../../../../static/icons/lplus_printer_icon.png";
import rfidIcon from "../../../../static/icons/lplus_rfid_icon.png";
import spinIcon from "../../../../static/icons/spin_icon.png";
import SubscriptionForm from "../SubscriptionForms";
import styles from "./SubscriptionPayment.module.scss";

const SubscriptionPayment = ({
  subscriptionType,
  isOpened,
  onClose,
  setIsSubsStatusChanged,
  isUpgrade=false,
  setIsUpgradeSubscriptionShow,
  setIsShow,
  setCardData,
  subscriptionActive,
  onUpgradeSubscription,
}) => {
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
  const data = createData().find((el) => el.type === subscriptionType);
  const dispatch = useDispatch();
  const [
    isSuccessfulSubscriptionModalOpened,
    setIsSuccessfulSubscriptionModalOpened,
  ] = useState(false);
  const [
    isErrorSubscriptionModalOpened,
    setIsErrorSubscriptionModalOpened,
  ] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);

  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [isWalletModalVisible, setIsWalletModalVisible] = useState(false);
  const [tempValues, setTempValues] = useState(null);
  const [totalPriceToPay, setTotalPriceToPay] = useState(data.price * 12);
  const [hasPrinter, setHasPrinter] = useState(true);
  const [hasRFIDWriter, setHasRFIDWriter] = useState(true);
  const [voucherCode, setVoucherCode] = useState(null);

  const [activeSelect, setActiveSelect] = useState("");

  useEffect(() => {
    fetchAddresses();
    fetchCards();
  }, []);
  const fetchAddresses = () => {
    getAddresses().then(({ response }) => {
      setAddresses(response.addresses);
    });
  };
  const fetchCards = () => {
    getProfileCards().then(({ response }) => setCards(response.cards));
  };

  const createUserSubscription = async (
    card_id,
    address_id,
    checkedVoucherCode
  ) => {
    const { error, response } = await createSubscription(
      data.stripe_price,
      card_id,
      data.type === "pro" ? false : hasPrinter,
      data.type === "pro" || data.type === "prime" ? false : hasRFIDWriter,
      checkedVoucherCode
    );
    if (error || !response) {
      dispatch(authActions.finishLoading());
      setIsErrorSubscriptionModalOpened(true);
    } else {
      await subscriptionShippingAddress(
        data.type === "pro" ? false : hasPrinter,
        data.type === "pro" || data.type === "prime" ? false : hasRFIDWriter,
        address_id
      );
      dispatch(authActions.finishLoading());
      setIsSuccessfulSubscriptionModalOpened(true);
      setIsSubsStatusChanged({ subscriptionType, success: true });
    }
  };

  const checkVouchers = (voucher_code) => {
    const vouchers = [
      process.env.REACT_APP_ONE_MONTH_FREE,
      process.env.REACT_APP_THREE_MONTHS_FREE,
      process.env.REACT_APP_SIX_MONTHS_FREE,
      process.env.REACT_APP_TWELVE_MONTHS_FREE,
    ];
    return vouchers.some((v) => v === voucher_code) ? voucher_code : null;
  };

  const onSubmit = async (values) => {
    if (isUpgrade) {
      if (values.card_id === "" && subscriptionType !== 'essential') {
        setIsWalletModalVisible(true);
      } else {
        setIsShow(false)
        onUpgradeSubscription(values.card_id)
      }
    } else {
      if (
        (values.card_id !== "" && values.address_id !== "") ||
        (checkVouchers(voucherCode) && hasPrinter && hasRFIDWriter) ||
        ((values.card_id || data.type === "essential") &&
          hasPrinter &&
          hasRFIDWriter)
      ) {
        dispatch(authActions.startLoading());
        const { error, response } = await createUserSubscription(
          values.card_id || null,
          values.address_id || null,
          checkVouchers(voucherCode)
        );
      } else if (values.address_id === "" && (!hasPrinter || !hasRFIDWriter)) {
        setIsAddressModalVisible(true);
      } else if (
        values.card_id === "" &&
        (data.type !== "essential" ||
          (data.type === "essential" && (!hasPrinter || !hasRFIDWriter))) &&
        (!checkVouchers(voucherCode) || !hasPrinter || !hasRFIDWriter)
      ) {
        setIsWalletModalVisible(true);
      } else {
        setIsErrorSubscriptionModalOpened(true);
      }
    }
  };

  useEffect(() => {
    const pricePerYear = data.price * 12;
    if (hasPrinter && hasRFIDWriter) {
      setTotalPriceToPay(pricePerYear);
    }
    if (!hasPrinter && hasRFIDWriter) {
      setTotalPriceToPay(pricePerYear + data.printer.price);
    }
    if (!hasRFIDWriter && hasPrinter) {
      setTotalPriceToPay(pricePerYear + data.rfid.price);
    }
    if (!hasPrinter && !hasRFIDWriter) {
      setTotalPriceToPay(pricePerYear + data.rfid.price + data.printer.price);
    }
  }, [hasPrinter, hasRFIDWriter, totalPriceToPay]);

  return (
    <Modal isOpen={isOpened} isSub={true}>
      <div className={styles.SubscriptionPayment}>
        <Header isPayment={true} onClose={() => onClose()} />
        <div className={styles.section}>
          <div className={styles.topText}>
            <h2>{data.type.toUpperCase()}</h2>
            {data.price === 0 ? (
              <h3>FREE</h3>
            ) : (
              <h3>
                {data.currency.symbol}
                {data.price} {data.currency.currency} per month
              </h3>
            )}
            <p>
              <br />
              <br />
              <br />
              Congrats, you are upgrading to SPIN connect{" "}
              {data.type.toUpperCase()}, the n1 Circular Retail system in the
              world.
              <br />
              <br />
              Making circularity the new wave of growth for your business, while
              leveraging top tier technologies, such as Blockchain, IOT and much
              more.
              <br />
              <br />
              Keep growing sustainably and set yourself new KPIs, to move beyond
              traditional capitalism.
            </p>
          </div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th></th>
                <th>
                  Product name/
                  <br />
                  Username
                </th>
                <th>
                  Product
                  <br />
                  code
                </th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <div className={styles.square}>
                    <img src={spinIcon} alt="sub logo"></img>
                  </div>
                </td>
                <td>
                  {data.type.toUpperCase()} subscription
                  <br />
                  @spinconnect
                </td>
                <td>{data.short}</td>
                {data.price === 0 ? (
                  <td>FREE</td>
                ) : (
                  <td>
                    {data.currency.symbol}
                    {data.price * 12} {data.currency.currency}
                  </td>
                )}

                <td>12 months *</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.delimiter} />
          <table>
            <tbody>
              <tr>
                {data.type !== "pro" ? (
                  <td>
                    <label className={styles.PrinterCheckBox}>
                      <input
                        onChange={() => setHasPrinter(!hasPrinter)}
                        type="checkbox"
                        className={styles.PrinterCheckBox__input}
                        checked={hasPrinter}
                      />
                      {!hasPrinter ? (
                        <img
                          className={styles.PrinterCheckBox__img}
                          src={checkedCheckbox}
                        />
                      ) : (
                        <img
                          className={styles.PrinterCheckBox__img}
                          src={emptyCheckbox}
                        />
                      )}
                    </label>
                  </td>
                ) : (
                  <td></td>
                )}
                <td>
                  <div className={styles.square}>
                    <img src={printerIcon} alt="printer image"></img>
                  </div>
                </td>
                <td>
                  {data.printer.type}
                  <br />
                  @spinconnect
                </td>
                <td>{data.printer.short}</td>
                <td
                  style={{
                    textDecoration:
                      data.type === "pro" ? "line-through" : "initial",
                  }}
                >
                  {data.currency.symbol}
                  {data.printer.price} {data.currency.currency}
                </td>
                <td>1 printer</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.delimiter} />
          <table>
            <tbody>
              <tr>
                {data.type !== "pro" && data.type !== "prime" ? (
                  <td>
                    <label className={styles.PrinterCheckBox}>
                      <input
                        onChange={() => setHasRFIDWriter(!hasRFIDWriter)}
                        type="checkbox"
                        className={styles.PrinterCheckBox__input}
                        checked={hasRFIDWriter}
                      />
                      {!hasRFIDWriter ? (
                        <img
                          className={styles.PrinterCheckBox__img}
                          src={checkedCheckbox}
                        />
                      ) : (
                        <img
                          className={styles.PrinterCheckBox__img}
                          src={emptyCheckbox}
                        />
                      )}
                    </label>
                  </td>
                ) : (
                  <td></td>
                )}
                <td>
                  <div className={styles.square}>
                    <img src={rfidIcon} alt="RFID image"></img>
                  </div>
                </td>
                <td>
                  {data.rfid.type}
                  <br />
                  @spinconnect
                </td>
                <td>{data.rfid.short}</td>
                <td
                  style={{
                    textDecoration:
                      data.type === "pro" || data.type === "prime" ? "line-through" : "initial",
                  }}
                >
                  {data.currency.symbol}
                  {data.rfid.price} {data.currency.currency}
                </td>
                <td>1 writer</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.delimiter} />
          <div className={styles.currentCheckoutTab}>
            <SubscriptionForm
              productInfo={data}
              addresses={addresses}
              activeSelect={activeSelect}
              setIsAddressModalVisible={setIsAddressModalVisible}
              setActiveSelect={setActiveSelect}
              setIsWalletModalVisible={setIsWalletModalVisible}
              cards={cards}
              setTempValues={setTempValues}
              setTotal={setTotalPriceToPay}
              total={totalPriceToPay}
              onSubmit={onSubmit}
              setVoucherCode={setVoucherCode}
              hasPrinter={hasPrinter}
              printerPrice={data.printer.price}
              hasRFIDWriter={hasRFIDWriter}
              RFIDPrice={data.rfid.price}
            />
          </div>
          {isAddressModalVisible && (
            <NewShippingAddressModal
              onUpdateAddresses={() => {
                fetchAddresses();
              }}
              onClose={() => {
                fetchAddresses();
                setIsAddressModalVisible(false);
              }}
            />
          )}
          {isWalletModalVisible && (
            <NewCardModal
              onClose={() => {
                fetchCards();
                setIsWalletModalVisible(false);
              }}
            />
          )}
        </div>
        <Footer />
        <SuccessfulSubscriptionModal
          isOpened={isSuccessfulSubscriptionModalOpened}
          onModalClose={() => {
            onClose();
            setIsSuccessfulSubscriptionModalOpened(false);
          }}
        />
        <ErrorSubscriptionModal
          isOpened={isErrorSubscriptionModalOpened}
          onModalClose={() => {
            onClose();
            setIsErrorSubscriptionModalOpened(false);
          }}
          onClose={() => {
            setIsErrorSubscriptionModalOpened(false);
          }}
        />
      </div>
    </Modal>
  );
};

export default SubscriptionPayment;
