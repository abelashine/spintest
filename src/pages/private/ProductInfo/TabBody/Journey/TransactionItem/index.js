import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import backArrow from "../../../../../../static/icons/back-arrow.svg";
import styles from "./TransactionItem.module.scss";
import { profileActions } from "../../../../../../actions/profile";
import { getTransactionTimeStamp, getMemoryTimestamp } from "../helpers";

import Avatar from "../../../../../../components/Avatar";
import ConfirmDeleteMemory from "../../../../../../components/Modal/ConfirmDeleteProductModal";
import MemoryDescription from "./MemoryDescription";
import AvatarProfile from "../../../../../../components/AvatarProfile";

const CheckMark = () => (
  <div
  className={styles.CheckMark}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.42029 0.622038C7.583 0.784759 7.583 1.04858 7.42029 1.2113L3.25362 5.37797C3.09091 5.54068 2.82708 5.54068 2.66436 5.37797L0.581022 3.29463C0.418305 3.13192 0.418305 2.86809 0.581022 2.70538C0.743743 2.54267 1.00756 2.54267 1.17028 2.70538L2.95899 4.49409L6.83104 0.622038C6.99375 0.459321 7.25758 0.459321 7.42029 0.622038Z"
        fill="#E8EBEE"
      />
    </svg>
  </div>
);

const TransactionItem = ({ data, length, index }) => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const [isOpen, setIsOpen] = useState(true);
  const imagePosition = isOpen ? styles.opened : styles.closed;
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [memoryId, setMemoryId] = useState(null);
  const dispatch = useDispatch();

  const prepareToDeleteMemory = (id) => {
    setMemoryId(id);
    setIsConfirmOpen(true);
  };
  const onCloseModal = () => {
    setIsConfirmOpen(false);
    setMemoryId(null);
  };
  const deleteMemory = () => {
    dispatch(profileActions.deleteTransactionMemory(memoryId, data.slug));
  };

  return (
    <section className={styles.TransactionItem}>
      <ConfirmDeleteMemory
        isOpened={isConfirmOpen}
        onClose={deleteMemory}
        onModalClose={onCloseModal}
      />
      <Link
        to={`/${data.slug}/profile`}
        className={styles.TransactionItem__avatar}
        id="avatarPlace"
      >
        <AvatarProfile
          url={data.avatar}
          isBrand={
            //data.blue_check
            false
          }
          isSmall
        />
      </Link>
      <div className={styles.TransactionItem__data}>
        <div className={styles.TransactionItem__data_commondata}>
          <Link
            className={styles.TransactionItem__slug}
            to={`/${data.slug}/profile`}
          >
            @{data.slug}
            {data.blue_check && <CheckMark />}
          </Link>
          <p>
            {data.address} - {getTransactionTimeStamp(data.timestamp)}
          </p>
        </div>
        {isOpen &&
          data.memories &&
          data.memories.map((memory, i) => (
            <div
              key={memory.id}
              className={styles.TransactionItem__data_details}
            >
              <div className={styles.imageWrapper}>
                {memory.image && <img className={styles.memoryImage} src={memory.image} alt="memoryImage" />}
              </div>
              <p>{memory.title}</p>
              <MemoryDescription text={memory.description} />
              <span className={styles.textlink}>
                {memory.hashtags.map((h) => h).join(" ")}
              </span>
              <p className={styles.daterow}>
                {memory.location} - {getMemoryTimestamp(memory.timestamp)}
              </p>
              {index === length && userInfo?.slug === data.slug && (
                <p
                  className={styles.delete}
                  onClick={() => prepareToDeleteMemory(memory.id)}
                >
                  Delete
                </p>
              )}
            </div>
          ))}
      </div>
      {/* {data.memories.length > 0 && (
        <img
          className={imagePosition}
          src={backArrow}
          alt="Back arrow"
          onClick={() => setIsOpen(!isOpen)}
        />
      )} */}
    </section>
  );
};

export default TransactionItem;
