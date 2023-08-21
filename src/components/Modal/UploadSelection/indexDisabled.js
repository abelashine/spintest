  import React, { useState } from "react";
import styles from "./UploadSelection.module.scss";
import sneaker from "../../../static/icons/sneaker.svg";
import photo from "../../../static/icons/image.svg";
import rentitem from "../../../static/icons/rentitem.svg";
import sellitem from "../../../static/icons/sellitem.svg";
import swapitem from "../../../static/icons/swapitem.svg";

import MintNFT from "../MintNFT";
import SellSwapItem from "../SellSwapItem";
import UploadProduct from "../UploadProduct";

import Button from "../../Button";

const currentContent = (activeModal, setActiveModal, onClose) => {
  switch (activeModal) {
    case "photo":
      return (
        <MintNFT
          onClose={() => setActiveModal(null)}
          onSubmit={() => {
            setActiveModal(null);
            onClose();
          }}
          topTitle="Publish Art NFT"
        />
      );

    case "rentitem":
      return (
        <SellSwapItem
          onClose={() => setActiveModal(null)}
          onSubmit={() => {
            setActiveModal(null);
            onClose();
          }}
          topTitle="Rent item"
        />
      );

    case "sellitem":
      return (
        <SellSwapItem
          onClose={() => setActiveModal(null)}
          onSubmit={() => {
            setActiveModal(null);
            onClose();
          }}
          topTitle="Sell item"
        />
      );

    case "swapitem":
      return (
        <SellSwapItem
          onClose={() => setActiveModal(null)}
          onSubmit={() => {
            setActiveModal(null);
            onClose();
          }}
          topTitle="Swap item"
        />
      );

    case "product":
      return (
        <UploadProduct
          onClose={() => setActiveModal(null)}
          onSubmit={() => {
            setActiveModal(null);
            onClose();
          }}
        />
      );
    default:
      return;
  }
};

export default ({ role, onClose }) => {
  const [activeModal, setActiveModal] = useState(null);

  if (activeModal) {
    return currentContent(activeModal, setActiveModal, onClose);
  }

  return (
    <div className={styles.UploadSelection}>
      {role && (
        <>
          <Button
            type="button"
            color="white"
            size="middle"
            onClick={() => setActiveModal("photo")}
          >
            <img src={photo} width="26" height="23" alt="" />
            New art NFT
          </Button>
          <Button
            type="button"
            color="white"
            size="middle"
            onClick={() => setActiveModal("rentitem")}
            className={styles.menuBtn}
          >
            <img width="42" height="22" src={rentitem} alt="" />
            Rent product
          </Button>
          <Button
            type="button"
            color="white"
            size="middle"
            onClick={() => setActiveModal("sellitem")}
            className={styles.menuBtn}
          >
            <img width="42" height="22" src={sellitem} alt="" />
            Sell product
          </Button>
          <Button
            type="button"
            color="white"
            size="middle"
            onClick={() => setActiveModal("swapitem")}
            className={styles.menuBtn}
          >
            <img width="42" height="22" src={swapitem} alt="" />
            Swap product
          </Button>
        </>
      )}

      {!role && (
        <Button
          type="button"
          color="white"
          size="middle"
          onClick={() => setActiveModal("product")}
        >
          <img width="42" height="22" src={sneaker} alt="" />
          Upload product
        </Button>
      )}

      <Button type="button" color="transparent" size="middle" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );
};
