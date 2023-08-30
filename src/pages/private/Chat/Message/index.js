import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { optionsHandling, dateFormatted } from "../helpers";
import { Link } from "react-router-dom";
import styles from "./Message.module.scss";

import Avatar from "../../../../components/Avatar";
import RentalBlock from "../RentalBlock";
import ProductSuccess from "../ProductSuccess";
import Options from "../Options";
import MessageText from "./MessageText";
import AvatarDialog from "../../../../components/AvatarDialog";

export const Message = ({
  messageId,
  content,
  avatar_url,
  date,
  me,
  productImage,
  chatRoomId,
  clientId,
  extra,
  slug,
  messageType,
  setWasItPushed,
}) => {
  console.log(content);
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const dispatch = useDispatch();
  const optionsHandler = (status) => {
    optionsHandling(
      status,
      extra,
      dispatch,
      chatRoomId,
      messageId,
      clientId,
      messageType,
      me,
      userInfo,
      setWasItPushed
    );
  };

  const requestStatusCode = extra && JSON.parse(extra).requestConfirmStatus;
  const uvulaClass = me ? styles.rightUvula : styles.leftUvula;
  const isProductImg =
    messageType === "rentStart" ||
    messageType === "rentGiveback" ||
    messageType === "spinRequest";
  const isOptions =
    (messageType === "spinRequest" && requestStatusCode === "0" && !me) ||
    (messageType === "rentGiveback" && !me);
  const isTermSoon =
    messageType === "rentOneDayLeft" ||
    messageType === "rentOneDayDelay" ||
    messageType === "rentOverdue";
  return (
    <div className={styles.Message}>
      <div className={me ? styles.user_message : styles.interloc_message}>
        {!me && (
          <figure className={isTermSoon ? styles.imageRental :styles.image }>
            <Link to={`/${slug}/profile/`}>
              <AvatarDialog url={avatar_url} />
            </Link>
          </figure>
        )}

        <div className={styles.contentWrapper}>
          <span className={uvulaClass}></span>
          <div className={styles.content}>
            <MessageText content={content} />

            {isProductImg && (
              <ProductSuccess
                src={productImage}
                messageType={messageType}
                requestStatusCode={requestStatusCode}
              />
            )}
            {isTermSoon && (
              <RentalBlock
                productImage={productImage}
                me={me}
                extra={extra}
                messageType={messageType}
                setWasItPushed={setWasItPushed}
              />
            )}
            <div className={styles.slugContainer}>
              <span className={styles.messageSlug}>@{slug}</span>
              <span
                className={me ? styles.messageTime : styles.messageTimeUser}
              >
                {dateFormatted(date)}
              </span>
            </div>

            {isOptions && requestStatusCode === "0" && (
              <Options optionsHandler={optionsHandler} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
