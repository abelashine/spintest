import React from "react";
import QRCode from "qrcode.react";
import styles from "./QrModal.module.scss";
import SpinLogoBlack from "../../../../static/images/logo/spinByLablacoLogoBlack.svg";
import SpinLogoQR from "../../../../static/images/logo/QR_logo.png";
import crossBtn4 from "../../../../static/icons/crossBtn4.svg";

import Modal from "../../../../components/Modal";

const QrModal = ({ productInfo, isQROpened, setIsQROpened, slug, token }) => {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL.slice(0, -4);
    return (
        <Modal isOpen={isQROpened}>
            <div className={styles.qrHeader}>
                <img
                    src={crossBtn4}
                    alt="Cross"
                    className={styles.closeButton}
                    onClick={() => setIsQROpened(false)}
                />
                <img
                    src={SpinLogoBlack}
                    alt="spinLogoBlack"
                    className={styles.logoToImg}
                />
            </div>
            <div className={styles.qrcode}>
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
                    size={334}
                    imageSettings={{
                        src: SpinLogoQR,
                        width: 94,
                        height: 94,
                    }}
                />
                {productInfo && (
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
                )}
            </div>
        </Modal>
    );
};

export default QrModal;
