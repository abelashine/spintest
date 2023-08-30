import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./NewCardModal.module.scss";
import { backArrow, walletBigBlack, cross } from "../icons";
import { getClientSecret, confirmCardSetup, addNewCard } from "../../../api";
import cardIcon from "../../../static/icons/Card.png";
import Button from "../../Button";
import Modal from "..";
import { useDispatch } from "react-redux";
import { authActions } from "../../../actions/auth";
import ModalBottom from "../ModalBottom";
import x from "../../../static/icons/x.png"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const NewCardModal = ({
  onClose,
  submitButtonText = "SAVE",
  submitButtonColor = "blue",
  isCancelButtonNeed = true,
  isPaginationNeed = false,
  isCrossNeed = false,
  setIsModalNeedOnProductPage,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [confirmError, setConfirmError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getClientSecret().then((res) =>
      setClientSecret(res.response.client_secret)
    );
  }, []);

  const createCard = async (values) => {
    if (!stripe || !elements || !clientSecret) {
      return;
    }
    dispatch(authActions.startLoading());

    const cardElement = elements.getElement(CardElement);

    const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        type: "card",
        card: cardElement,
      },
    });

    if (error) {
      setConfirmError(error.message);
      dispatch(authActions.finishLoading());
      return;
    } else {
      confirmCardSetup(setupIntent.client_secret);
    }

    stripe.createToken(cardElement).then(async ({ token, error }) => {
      if (error) {
        dispatch(authActions.finishLoading());
        setConfirmError(error.message);
      } else {
        await addNewCard({
          source_id: setupIntent.payment_method,
          card_country: token.card.country,
          card_last4: token.card.last4,
          card_exp_month: token.card.exp_month,
          card_exp_year: token.card.exp_year,
          holder_name: values.holder_name,
        });
        dispatch(authActions.finishLoading());
        onClose();
      }
    });
  };

  return (
    elements && (
      <ModalBottom isOpen={true}>
        <div className={styles.NewCardModal}>
          <button
            className={styles.closeButton}
            onClick={
              isCrossNeed
                ? () => {
                    setIsModalNeedOnProductPage(false);
                  }
                : onClose
            }
          >
            {/* {isCrossNeed ? cross : backArrow} */}
           <img src={x} />
          </button>
          <div className={styles.bigIconContainer}>
            <img src={cardIcon} />
          </div>
          <div className={styles.titleContainer}>Add New Card</div>
          <div className={styles.errorContainer}>
            <p>{confirmError}</p>
          </div>
          <Formik
            initialValues={{
              cardNumber: "",
              ccv: "",
              expirationDate: "",
            }}
            onSubmit={createCard}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <span className={styles.cardNumberText}>Card Number</span>
                <CardElement options={{ hidePostalCode: true }} />
                <div className={styles.buttonsContainer}>
                  <div style={{ marginBottom: "15px" }}>
                    <button
                      className={styles.submitButton}
                      type="submit"
                      size="large"
                      color={submitButtonColor}
                    >
                      {submitButtonText}
                    </button>
                  </div>
                  
                </div>
                {isPaginationNeed && (
                  <div className={styles.stepsProgressBar}>
                    <div className={styles.current}></div>
                    <div className={styles.current}></div>
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </ModalBottom>
    )
  );
};

const CardModal = ({
  onClose,
  submitButtonText,
  submitButtonColor,
  isCancelButtonNeed,
  isPaginationNeed,
  isCrossNeed,
  setIsModalNeedOnProductPage,
}) => (
  <Elements stripe={stripePromise}>
    <NewCardModal
      onClose={onClose}
      submitButtonText={submitButtonText}
      submitButtonColor={submitButtonColor}
      isCancelButtonNeed={isCancelButtonNeed}
      isPaginationNeed={isPaginationNeed}
      isCrossNeed={isCrossNeed}
      setIsModalNeedOnProductPage={setIsModalNeedOnProductPage}
    />
  </Elements>
);

export default CardModal;
