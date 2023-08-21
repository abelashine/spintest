import React, { useEffect, useState } from "react";
import styles from "./EmptyBrandTab.module.scss";
import { useDispatch, useSelector } from "react-redux";
import plusIcon from "../../static/icons/plusIcon.svg";
import { placeholderTexts } from "./helpers";

import Button from "../Button";
import UploadSelection from "../Modal/UploadSelection";
import { foreignProfilebrandInfo } from "../../api";
import { useHistory } from "react-router-dom";
import { unsubscribedActions } from "../../actions/errors/unsubscribed";

const EmptyBrandTab = ({ tabname }) => {
  const [isUploadSelectionOpened, setIsUploadSelectionOpened] = useState(false);
  const { userInfo } = useSelector((state) => state.authReducer);

  const [userSubscription, setUserSubscription] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const openUploadSelection = () => {
    setIsUploadSelectionOpened(true);
    document.body.style.overflow = "hidden";
  };
  const closeUploadSelection = () => {
    setIsUploadSelectionOpened(false);
    document.body.style.overflow = "initial";
  };
  const getProfileSubscriptions = async () => {
    const { error, response } = await foreignProfilebrandInfo(userInfo.slug);
    if (error) {
      history.push("/error");
    } else {
      try {
        if (response.subscription.active) {
          setUserSubscription(true);
        }
      } catch {
        setUserSubscription(false);
      }
    }
  };

  useEffect(() => {
    if (userInfo?.business_role) {
      getProfileSubscriptions();
    }
  }, [userInfo]);
  return (
    <>
      <div className={styles.EmptyBrandTab}>
        <img
          className={styles.EmptyBrandTab__plusIcon}
          src={plusIcon}
          alt="Plus icon"
          onClick={() => {
            if (userSubscription) {
              openUploadSelection();
            } else {
              dispatch(unsubscribedActions.showUnsubscribedUserModal());
            }
          }}
        />
        <p className={styles.EmptyBrandTab__inscription}>
          {placeholderTexts[tabname].one}
          <br /> {placeholderTexts[tabname].two}
        </p>
        <Button
          color="white"
          size="extraLarge"
          onClick={() => {
            if (userSubscription) {
              openUploadSelection();
            } else {
              dispatch(unsubscribedActions.showUnsubscribedUserModal());
            }
          }}
        >
          Get started
        </Button>
      </div>
      {isUploadSelectionOpened && (
        <UploadSelection
          role={userInfo?.business_role}
          onClose={closeUploadSelection}
        />
      )}
    </>
  );
};

export default EmptyBrandTab;
