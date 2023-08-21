import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderContent}>
        <a href="https://lablaco.com">
          <div className={styles.Logo}>
            <svg viewBox="0 0 43 9" xmlns="http://www.w3.org/2000/svg">
              <g fill="#FFF" fillRule="nonzero">
                <path d="M39.36 2.02c-1.7 0-3.07 1.4-3.07 3.21a3.09 3.09 0 003.07 3.19 3.1 3.1 0 003.08-3.19 3.12 3.12 0 00-3.08-3.21zm0 4.98c-.84 0-1.51-.72-1.51-1.74 0-1.06.67-1.8 1.5-1.8.84 0 1.5.74 1.5 1.8.02 1.02-.66 1.74-1.5 1.74zM32.4 7c-.86 0-1.55-.72-1.55-1.74 0-1.06.7-1.8 1.54-1.8.66 0 1.22.46 1.45 1.15h1.64a3.14 3.14 0 00-3.08-2.58 3.15 3.15 0 00-3.13 3.21c0 1.84 1.4 3.2 3.13 3.2a3.12 3.12 0 003.1-2.58h-1.65c-.23.69-.8 1.14-1.46 1.14zM1.65 5.8V.03H.1v5.79c0 1.58.9 2.6 2.58 2.6h.56V6.88H2.7c-.76.01-1.04-.3-1.04-1.08zM7.1 1.97a3.12 3.12 0 00-3.14 3.2c0 1.76 1.32 3.2 2.93 3.2h3.35v-3.2a3.1 3.1 0 00-3.13-3.2zm0 4.95c-.86 0-1.56-.75-1.56-1.73 0-1 .7-1.75 1.57-1.75.86 0 1.56.78 1.56 1.75l.02 1.74-1.58-.01zM25.24 1.97a3.12 3.12 0 00-3.15 3.2c0 1.76 1.32 3.2 2.93 3.2h3.35v-3.2a3.1 3.1 0 00-3.13-3.2zm0 4.95c-.87 0-1.57-.75-1.57-1.73 0-1 .7-1.75 1.57-1.75.86 0 1.56.78 1.56 1.75l.02 1.74-1.58-.01zM20.34 5.86V.04h-1.58v5.82c0 1.67.94 2.73 2.73 2.54V6.98c-.77.06-1.15-.26-1.15-1.12zM14.73 2.03h-1.77V.04h-1.6l.02 5.18a3.1 3.1 0 003.13 3.21 3.12 3.12 0 003.15-3.21c0-1.77-1.32-3.19-2.93-3.19zm-.22 4.93c-.8 0-1.44-.65-1.55-1.52V3.47h1.55c.87 0 1.57.75 1.57 1.73 0 1.01-.7 1.76-1.57 1.76z" />
              </g>
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Header;