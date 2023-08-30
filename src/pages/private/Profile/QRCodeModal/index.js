import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./QRCodeModal.module.scss";
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

const QRCodeModal = ({ setIsQRCodeOpened, profileInfo }) => {
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

  const { slug } = useParams();
  useEffect(() => {
    document
      .getElementsByTagName("image")[0]
      .setAttribute("preserveAspectRatio", "xMidYMin");
  }, []);
  if (!profileInfo) return null;
  return (
    <ModalBottomLong isOpen>
      <div className={styles.qrHeader}></div>
      <div className={styles.profileInformation}>
        <div
          className={styles.closeButton}
          onClick={() => setIsQRCodeOpened(false)}
        >
          <img
            src={crossBtn4}
            alt="Cross button"
            onClick={() => {
              setIsQRCodeOpened(false);
            }}
          />
        </div>
        <div className={styles.profileSlug}>
          <span className={styles.profileSlugText}>{profileInfo.slug}</span>

          {profileInfo.type == "brand" && (
            <img src={blueMarkIcon} className={styles.blueMarkIcon} />
          )}
          <div className={styles.avatar}>
            <Avatar url={profileInfo.image.url} />
          </div>
        </div>
      </div>
      <span className={styles.profileSlugText2}>{profileInfo.slug}</span>

      <div className={styles.qrcode}>
        {console.log(profileInfo)}
        {/* check if it is brand */}
        <div
          ref={qrCodeRef}
          style={{ position: "relative", display: "inline-block" }}
        >
          <QRCode
            value={`${window.location.origin}/${slug}/profile`}
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
          <div   className={styles.downloadButtonBackground}>
            <img
              className={styles.downloadButton}
              src={downArrow}
              onClick={handleDownloadClick}
            />
          </div>{" "}
        </div>
      </div>
    </ModalBottomLong>
  );
};

export default QRCodeModal;
