import React, { useState, useEffect } from "react";
import { getAddresses } from "../../../api";
import styles from "./ShippingAddressesModal.module.scss";

import Modal from "../index";
import Button from "../../Button";
import NewShippingAddressModal from "../NewShippingAddressModal";

export default ({ onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = () => {
    getAddresses().then(({ response }) => setAddresses(response.addresses));
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  if (isModalVisible) {
    return (
      <NewShippingAddressModal
        onClose={() => {
          fetchAddresses();
          setIsModalVisible(false);
        }}
      />
    );
  }
  return (
    <Modal isOpen={true}>
      <div className={styles.modalHeader}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="14"
          onClick={onClose}
        >
          <path
            fill="var(--black)"
            fillRule="evenodd"
            d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
          />
        </svg>
      </div>
      <div className={styles.modalBody}>
        <svg
          width="84px"
          height="84px"
          viewBox="0 0 26 26"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Symbols" stroke="var(--black)" fillRule="evenodd">
            <circle
              id="Oval"
              fill="#212126"
              stroke="#212126"
              cx="13"
              cy="13"
              r="12.5"
            />
            <g
              id="noun_Location_2565177"
              transform="translate(8.4, 6.5) scale(0.55)"
              fill="var(--white)"
              fillRule="nonzero"
              stroke="var(--white)"
            >
              <g id="Group" transform="translate(0.000000, 0.400020)">
                <path
                  d="M8.699219,0.6582 C4.0294757,0.6582 0.2324219,4.45526 0.2324219,9.125 C0.2324219,12.52049 2.288697,16.14011 4.3007812,18.95703 C6.312865,21.77395 8.326172,23.78711 8.326172,23.78711 C8.53280127,23.9935282 8.86758973,23.9935282 9.074219,23.78711 C9.074219,23.78711 11.087525,21.77395 13.099609,18.95703 C15.111693,16.14011 17.166016,12.52049 17.166016,9.125 C17.166016,4.45526 13.368962,0.6582 8.699219,0.6582 L8.699219,0.6582 Z M8.699219,1.7168 C12.796996,1.7168 16.107422,5.02722 16.107422,9.125 C16.107422,12.07952 14.194947,15.60247 12.238281,18.3418 C10.468518,20.81947 9.021012,22.26145 8.699219,22.58984 C8.376844,22.26084 6.931473,20.81891 5.1621094,18.3418 C3.2054436,15.60247 1.2910156,12.07952 1.2910156,9.125 C1.2910156,5.02722 4.6014414,1.7168 8.699219,1.7168 Z"
                  id="Shape"
                />
                <path
                  d="M8.699219,5.41992 C6.659732,5.41992 4.9960938,7.08551 4.9960938,9.125 C4.9960938,11.16449 6.659732,12.83008 8.699219,12.83008 C10.738706,12.83008 12.404297,11.16449 12.404297,9.125 C12.404297,7.08551 10.738706,5.41992 8.699219,5.41992 Z M8.699219,6.47852 C10.16674,6.47852 11.345703,7.65748 11.345703,9.125 C11.345703,10.59252 10.16674,11.77148 8.699219,11.77148 C7.231698,11.77148 6.054688,10.59252 6.054688,9.125 C6.054688,7.65748 7.231698,6.47852 8.699219,6.47852 Z"
                  id="Shape"
                />
              </g>
            </g>
          </g>
        </svg>
        <div className={styles.modalTitle}>My shipping addresses</div>
        <div className={styles.shippingAddresses}>
          {addresses.map(({ alias, address, city }, index) => (
            <div key={index} className={styles.address}>
              <div className={styles.addressName}>{alias}</div>
              <div className={styles.addressInscription}>
                {`${address} - ${city.city}, ${city.country.name}`}
              </div>
            </div>
          ))}
          <div className={styles.buttons}>
            <Button
              type="submit"
              size="large"
              color="black"
              onClick={() => setIsModalVisible(true)}
            >
              Create new +
            </Button>
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
      </div>
    </Modal>
  );
};
