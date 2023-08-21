import React from "react";
import styles from "./UploadSelection.module.scss";
import { cross } from "../icons";
import SpinLogoBlack from "../../../static/images/logo/spinByLablacoLogoBlack.svg";
import SpinLogoMinimal from "../../../static/images/logo/spinConnectMinimal.svg";
import windows from "../../../static/icons/windows.svg"
import apple from "../../../static/icons/apple.svg"

export default ({ _, onClose }) => {

    const handleMacDownload = async () => {
        const yml = await fetch("https://lplus-releases.s3.eu-central-1.amazonaws.com/macos-signed-latest/latest-mac.yml").then(r => r.text())
        const { fileName, fileLink } = getFileNameLink(/url:.*.dmg/gm, 'macos', yml)
        startDownload(fileName, fileLink)
    }
    const handleWindowsDownload = async () => {
        const yml = await fetch("https://lplus-releases.s3.eu-central-1.amazonaws.com/windows-signed-latest/latest.yml").then(r => r.text())
        const { fileName, fileLink } = getFileNameLink(/url:.*.exe/gm, 'windows', yml)
        startDownload(fileName, fileLink)
    }

    const startDownload = (fileName, fileLink) => {
        const link = document.createElement('a')
        link.href = fileLink
        link.setAttribute(
            'download',
            fileName,
        )
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setTimeout(() => onClose(), 350)
    }

    const getFileNameLink = (r, system, yml) => {
        const fileName = yml.match(r)[0].replace('url: ', '')
        const fileLink = `https://lplus-releases.s3.eu-central-1.amazonaws.com/${system}-signed-latest/${fileName}`
        return { fileName, fileLink }
    }

    return (
        <div className={styles.modalOverlay}>
            <button className={styles.closeButton} type="button" onClick={onClose}>
                {cross}
            </button>

            <div className={styles.modalWindow}>
                <div className={styles.header}>
                    <img src={SpinLogoBlack} alt="spinLogoBlack" />
                </div>
                <div className={styles.body}>
                    <img src={SpinLogoMinimal} alt="Spin Connect" />
                    <p className={styles.description}>To start minting your Phygital NFTs, please download the SPIN
                        connect app on your desktop computer.</p>

                    <div className={styles.buttons}>
                        <a role="button" onClick={handleMacDownload}>
                            <div className={styles.downloadButton}>
                                <img className={styles.appleIcon} src={apple} alt="Mac OS" />
                                <p>Download for Mac</p>
                            </div>
                        </a>
                        <a role="button" onClick={handleWindowsDownload}>
                            <div className={styles.downloadButton}>
                                <img className={styles.windowsIcon} src={windows} alt="Windows" />
                                <p>Download for Windows</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
};
