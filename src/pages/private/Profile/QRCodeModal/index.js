import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./QRCodeModal.module.scss";

import QRCode from "qrcode.react";
import Modal from "../../../../components/Modal";
import SpinLogoBlack from "../../../../static/images/logo/spinByLablacoLogoBlack.svg";
import SpinLogoQR from "../../../../static/images/logo/QR_logo.png";
import crossBtn4 from "../../../../static/icons/crossBtn4.svg";

const QRCodeModal = ({ setIsQRCodeOpened, profileInfo }) => {
    const { slug } = useParams();
    useEffect(() => {
        document
            .getElementsByTagName("image")[0]
            .setAttribute("preserveAspectRatio", "xMidYMin");
    }, []);
    if (!profileInfo) return null;
    return (
        <Modal isOpen>
            <div className={styles.qrHeader}>
                <div
                    className={styles.closeButton}
                    onClick={() => setIsQRCodeOpened(false)}
                >
                    <img src={crossBtn4} alt="Cross button" />
                </div>
                <div className={styles.header}>
                    <img src={SpinLogoBlack} alt="spinLogoBlack" />
                </div>
            </div>
            <div className={styles.qrcode}>
                <QRCode
                    value={`${window.location.origin}/${slug}/profile`}
                    level="Q"
                    renderAs="svg"
                    size={334}
                    imageSettings={{
                        src: SpinLogoQR,
                        width: 94,
                        height: 94,
                    }}
                />
                <div className={styles.name}>{profileInfo.name}</div>
                <div className={styles.slug}>{`@${profileInfo.slug}`}</div>
                <p className={styles.bio}>{profileInfo.bio}</p>
                <a href={`${window.location.origin}/${slug}/profile`}>
                    {`${window.location.hostname}/${slug}/profile`}
                </a>
            </div>
        </Modal>
    );
};

export default QRCodeModal;
