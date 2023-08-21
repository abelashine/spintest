import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./NewCardModal.module.scss";
import { backArrow, walletBigBlack, cross } from "../icons";
import { getClientSecret, confirmCardSetup, addNewCard } from "../../../api";
import Button from "../../Button";
import Modal from "..";
import { useDispatch } from "react-redux";
import { authActions } from "../../../actions/auth";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const NewCardModal = ({
  onClose,
  submitButtonText = "Save",
  submitButtonColor = "blue",
  isCancelButtonNeed = true,
  isPaginationNeed = false,
  isCrossNeed = false,
  setIsModalNeedOnProductPage
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
        card: cardElement
      }
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
          holder_name: values.holder_name
        });
        dispatch(authActions.finishLoading());
        onClose();
      }
    });
  };

  return (
    elements && (
      <Modal isOpen={true}>
        <div className={styles.NewCardModal}>
          <button
            className={styles.backButton}
            onClick={
              isCrossNeed
                ? () => {
                    setIsModalNeedOnProductPage(false);
                  }
                : onClose
            }
          >
            {isCrossNeed ? cross : backArrow}
          </button>
          <div className={styles.bigIconContainer}>{walletBigBlack}</div>
          <h1>New card</h1>
          <div className={styles.errorContainer}>
            <p>{confirmError}</p>
          </div>
          <Formik
            initialValues={{
              cardNumber: "",
              ccv: "",
              expirationDate: ""
            }}
            onSubmit={createCard}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <CardElement options={{ hidePostalCode: true }} />
                <div className={styles.buttonsContainer}>
                  <div style={{ marginBottom: "15px" }}>
                    <Button
                      type="submit"
                      size="large"
                      color={submitButtonColor}
                    >
                      {submitButtonText}
                    </Button>
                  </div>
                  {isCancelButtonNeed ? (
                    <Button
                      type="button"
                      size="large"
                      color="monochromatic"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  ) : null}
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
      </Modal>
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
  setIsModalNeedOnProductPage
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
