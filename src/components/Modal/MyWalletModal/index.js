import React, { useState, useEffect } from "react";
import styles from "./MyWalletModal.module.scss";
import { getProfileCards } from "../../../api";
import { backArrow, walletBigBlack } from "../icons";

import Modal from "..";
import Button from "../../Button";
import NewCardModal from "../NewCardModal";

export default ({
  cardName = "Lorenzo Albrighi",
  cardNumber = 756289631561456,
  onClose,
}) => {
  const fetchCards = () => {
    getProfileCards().then(({ response }) => setCards(response.cards));
  };

  useEffect(() => {
    fetchCards();
  }, []);
  const [isNewCardModalVisible, setIsNewCardModalVisible] = useState(false);
  const [cards, setCards] = useState([]);

  if (isNewCardModalVisible) {
    return (
      <NewCardModal
        onClose={() => {
          fetchCards();
          setIsNewCardModalVisible(false);
        }}
      />
    );
  }

  return (
    <Modal isOpen={true}>
      <div className={styles.MyWalletModal}>
        <button className={styles.backButton} onClick={onClose}>
          {backArrow}
        </button>
        <div className={styles.bigIconContainer}>{walletBigBlack}</div>
        <h1>My wallet</h1>
        <div className={styles.cards}>
          {cards.map(({ card_last_digits, card_expire_at }, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardInfo} style={{ marginTop: "auto" }}>
                <div>{`*************${card_last_digits}`}</div>
                <div>{card_expire_at}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttonsContainer}>
          <div style={{ marginBottom: "15px" }}>
            <Button
              type="button"
              size="large"
              color="black"
              onClick={() => setIsNewCardModalVisible(true)}
            >
              Add New Card
            </Button>
          </div>
          <Button
            type="button"
            size="large"
            color="monochromatic"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
