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

const CheckMark = () =>
    <svg style={{ width: "100%", maxWidth: 16, marginRight: 5, marginLeft: 5 }} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(.4 .5)" fill="none" fillRule="evenodd">
            <ellipse fill="#239EFE" cx="7.1" cy="6.9" rx="7.1" ry="6.9" />
            <path
                d="M9.3 5l.5.5a.6.6 0 010 .8L7.2 8.8l-.4.4-.2.1h-.2L6 9.2 4.3 7.6a.6.6 0 010-.9l.4-.4c.3-.2.6-.2.9 0l.8.8 2.1-2c.2-.2.6-.2.8 0z"
                fill="#FFF"
            />
        </g>
    </svg>

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
        <Avatar
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
              style={{ display: "flex" }}
              to={`/${data.slug}/profile`}
          >
              @{data.slug}
              {
                  data.blue_check &&
                    <CheckMark />
              }
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
                {memory.image && <img src={memory.image} alt="memoryImage" />}
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
      {data.memories.length > 0 && (
        <img
          className={imagePosition}
          src={backArrow}
          alt="Back arrow"
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
    </section>
  );
};

export default TransactionItem;
