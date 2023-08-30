import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Journey.module.scss";
import infoicon from "../../../../../static/icons/infoicon.svg";
import { useSelector } from "react-redux";
import { getTransactionsToRender } from "./helpers";

import TransactionItem from "./TransactionItem";
import AddInfo from "./AddInfo";
import ToolTipModal from "../../../../../components/Modal/ToolTipModal";

const Journey = ({ token }) => {
  const params = useParams();
  const { productInfo, transactionHistory } = useSelector(
    (state) => state.profileReducer
  );
  const { userInfo } = useSelector((state) => state.authReducer);
  const [isOwnerWatches, setIsOwnerWatches] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState("");

  const watchLocaleStorage = () => {
    const userSlug = JSON.parse(localStorage.getItem("user_info"))?.slug;
    const isOwnerWatches = productInfo.current_owner === userSlug;
    setIsOwnerWatches(isOwnerWatches);
  };
  useEffect(() => {
    watchLocaleStorage();
    window.addEventListener("storage", watchLocaleStorage);
    return () => window.removeEventListener("storage", watchLocaleStorage);
  }, []);

  const transactions =
    transactionHistory && productInfo
      ? getTransactionsToRender(
          transactionHistory[0].history,
          params,
          productInfo
        )
      : [];

  const isOwnRentalProduct =
    productInfo.for_rent &&
    userInfo?.slug === productInfo.poster.slug &&
    productInfo.in_wardrobe;

  const openBlockchainPage = () => {
    let scanURL = "";
    if (
      process.env.REACT_APP_BASE_URL.includes("lablaco-dev.it") ||
      process.env.REACT_APP_BASE_URL.includes("localhost")
    ) {
      scanURL = "testnet.flowscan.org";
    } else if (process.env.REACT_APP_BASE_URL.includes("lablaco.com")) {
      scanURL = "flowscan.org";
    }
    if (!transactionHistory[0].history[0].txHash) {
      setIsNotificationOpen("Unable to find hash of this transaction");
    } else {
      let txHash;
      if (window.location.href.includes("product")) {
        txHash = transactionHistory[0].history[0].txHash;
      } else if (window.location.href.includes("tokenizedProduct")) {
        txHash =
          transactionHistory[0].history[
            transactionHistory[0].history.length - 1
          ].txHash;
      }
      window.open(`https://${scanURL}/transaction/${txHash}`, "_blank");
    }
  };
  if (!transactionHistory) return null;
  return (
    <div className={styles.Journey}>
      {!!isNotificationOpen && (
        <ToolTipModal
          onClose={() => setIsNotificationOpen("")}
          text={isNotificationOpen}
        />
      )}

      <div className={styles.JourneyTextMain}>
        <p>
          To ensure transparency, the product journey and ownership of each item
          is traced on the{" "}
          <br/> 
          <a className={styles.link} href="https://flowscan.org/">
            Blockchain
          </a>
        </p>
        {/* <img src={infoicon} alt="infoicon" onClick={openBlockchainPage} /> */}
      </div>
      {transactions.map((item, index) => (
        <TransactionItem
          key={item.slug + item.timestamp + item.avatar}
          data={item}
          productInfo={productInfo}
          length={transactions.length}
          index={index + 1}
        />
      ))}
      {isOwnerWatches && !isOwnRentalProduct && (
        <AddInfo
          productLink={token}
          token={transactionHistory[0].transaction_id}
        />
      )}
    </div>
  );
};
export default Journey;
