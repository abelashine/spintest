import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./QrModal.module.scss";
import { useRef } from "react";

import QRCode from "qrcode.react";
import Modal from "../../../../components/Modal";
import SpinLogoBlack from "../../../../static/images/logo/spinByLablacoLogoBlack.svg";
import SpinLogoQR from "../../../../static/images/logo/QR_logo.png";
import spinLogoWhite from "../../../../static/icons/spin-logo-white.png";
import crossBtn4 from "../../../../static/icons/close.png";
import ModalBottomLong from "../../../../components/Modal/ModalBottomLong";
import spinBackground from "../../../../static/icons/spin-background.png";
import Avatar from "../../../../components/Avatar";
import blueMarkIcon from "../../../../static/icons/blue-3.png";
import downArrow from "../../../../static/icons/down-arrow.png";
const QrModal = ({ productInfo, isQROpened, setIsQROpened, slug, token }) => {
  const qrCodeRef = useRef(null);
  const handleDownloadClick = () => {
    const svgElement = qrCodeRef.current.querySelector("svg");
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      svgString
    )}`;

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qrcode.svg";
    link.click();
  };
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL.slice(0, -4);
  return (
    <ModalBottomLong isOpen={isQROpened}>
      <div className={styles.qrHeader}></div>
      <div className={styles.productInformation}>
        <div
          className={styles.closeButton}
          onClick={() => setIsQROpened(false)}
        >
          <img
            src={crossBtn4}
            alt="Cross button"
            onClick={() => {
              setIsQROpened(false);
            }}
          />
        </div>
        <div className={styles.productSlug}>
          <span className={styles.productSlugText}>{productInfo.slug}</span>

          {productInfo.type == "brand" && (
            <img src={blueMarkIcon} className={styles.blueMarkIcon} />
          )}
          <div className={styles.avatar}>
            <Avatar url={productInfo.image.url} />
          </div>
        </div>
      </div>
      <span className={styles.productSlugText2}>{productInfo.slug}</span>

      <div className={styles.qrcode}>
        {console.log(productInfo)}
        {/* check if it is brand */}
        <div
          ref={qrCodeRef}
          style={{ position: "relative", display: "inline-block" }}
        >
          <QRCode
            value={
              slug
                ? `${window.location.origin}/product/${slug}`
                : token
                ? `${window.location.origin}/tokenizedProduct/${token}`
                : ""
            }
            level="Q"
            renderAs="svg"
            size={307}
            id="123456"
            imageSettings={{
              src: spinBackground,
              width: 105,
              height: 105,
            }}
          />
          <img
            src={spinLogoWhite}
            alt="Overlay Image"
            width={77}
            height={28}
            style={{
              position: "absolute",
              top: "42%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          />
          <div className={styles.downloadButtonBackground}>
            <img
              className={styles.downloadButton}
              src={downArrow}
              onClick={handleDownloadClick}
            />
          </div>{" "}
        </div>
      </div>
      {/* {productInfo && (
          <>
            <div className={styles.name}>{productInfo.name || " "}</div>
            <div className={styles.slug}>{`@${productInfo.poster.slug}`}</div>
            <p className={styles.bio}>{productInfo.description}</p>
            <a
              href={
                slug
                  ? `${window.location.origin}/product/${productInfo.slug}`
                  : token
                  ? `${window.location.origin}/tokenizedProduct/${token}`
                  : ""
              }
            >
              {slug
                ? `${REACT_APP_BASE_URL}/product/${productInfo.slug}`
                : token
                ? `${window.location.origin}/tokenizedProduct/${token}`
                : ""}
            </a>
          </>
        )} */}
    </ModalBottomLong>
  );
};

export default QrModal;
