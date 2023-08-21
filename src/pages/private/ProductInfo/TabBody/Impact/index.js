import React from "react";
import styles from "./Impact.module.scss";
import Item from "./Item";

const Impact = ({ tokenizedBrandInfo }) => {
  return (
    <div className={styles.Impact}>
      <div className={styles.ImpactText}>
        By keeping this product in the loop, you are saving the following
        estimated resources. <br />
        Make sure to PASS ON your products, when you stop using them, and make a
        positive impact!
      </div>
      {tokenizedBrandInfo && (
        <div className={styles.ImpactItems}>
          <Item
            saved={tokenizedBrandInfo.h2o_saved}
            water
            icon={
              <svg width="19" height="30" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.3 4.6c4 6.5 6.7 11 6.7 14.9 0 3.9-3 7-6.7 7a6.9 6.9 0 01-6.7-7c0-4 2.6-8.4 6.7-15zm0-4.3c-5.5 8.6-9 14-9 19.2 0 5.2 4 9.5 9 9.5 4.9 0 8.9-4.3 8.9-9.5S14.7 9 9.2.3z"
                  fill="#FFF"
                  fillRule="nonzero"
                />
              </svg>
            }
          />
          <Item
            icon={
              <svg width="63" height="63" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#FFF" fill="none" fillRule="evenodd">
                  <path
                    d="M30.6 41.4c-2.2 0-4.2-1-5.6-2.6a7.2 7.2 0 01-9-4.2 8 8 0 013-9.8 7.6 7.6 0 015-6.1c2.7-1 5.6-.2 7.5 2 2-1.2 4.4-1.3 6.5-.3 2 1 3.5 3.1 3.8 5.5 2.3.8 4 3 4.2 5.5.3 2.5-.7 5-2.7 6.4a6.1 6.1 0 01-6.7.3 7.3 7.3 0 01-6 3.3zm-5.2-3.9l.2.3c1.2 1.6 3 2.6 5 2.6 2.2 0 4.2-1.3 5.4-3.3l.3-.5.4.3c1.8 1.3 4 1.3 5.8.1a5.8 5.8 0 002.5-5.6c-.3-2.2-1.8-4-3.8-4.6l-.3-.1v-.4c-.3-2.1-1.5-4-3.4-5-1.9-.9-4-.7-5.8.5l-.4.2-.3-.3a6.1 6.1 0 00-6.6-2c-2.4.7-4.1 2.9-4.4 5.5v.3l-.3.1a6.8 6.8 0 00-2.7 8.7c1.4 3.1 4.9 4.6 8 3.4l.4-.2z"
                    strokeWidth="1.5"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </g>
              </svg>
            }
            saved={tokenizedBrandInfo.co2_saved}
          />
        </div>
      )}
    </div>
  );
};

export default Impact;
