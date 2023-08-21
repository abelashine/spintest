import React, { useState } from "react";
import Item from "../../../pages/private/ProductInfo/TabBody/Impact/Item";
import styles from "./FirstTimeUserPopup.module.scss";
import Arrow from "../Shared/Arrow";
import drop from "../../../static/icons/drop.svg";
import glass from "../../../static/icons/glass.svg";
import cloud from "../../../static/icons/cloud.svg";
import train from "../../../static/icons/train.svg";
import ImageChecked from "../../ImageChecked";
import firstImage from "../../../static/images/fourStepUser/FourStepUser__one.png";
import secondImage from "../../../static/images/fourStepUser/FourStepUser__two.png";
import thirdImage from "../../../static/images/fourStepUser/FourStepUser__three.png";
import storyIcon from "../../../static/images/fourStepUser/PRODUCT STORY ICON.png";
import skiimIcon from "../../../static/images/fourStepUser/SKIIM ICON.png";
import louisaIcon from "../../../static/images/fourStepUser/LOUISA ICON.png";
import mariaIcon from "../../../static/images/fourStepUser/MARIA ICON.png";

const OWNERS = ["skiim_london", "louisa", "maria"];
const OWNERS_IMG = [skiimIcon, louisaIcon, mariaIcon];

const waterIcon = () => (
  <img className={styles.modal__impact__images__water} src={drop} alt="water" />
);
const glassIcon = () => (
  <img className={styles.modal__impact__images} src={glass} alt="glass" />
);
const co2Icon = () => (
  <img className={styles.modal__impact__images__cloud} src={cloud} alt="co2" />
);
const trainIcon = () => (
  <img className={styles.modal__impact__images} src={train} alt="train" />
);
const LablaCoinIcon = () => (
  <svg
    width="36px"
    height="36px"
    viewBox="0 0 36 36"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Coin</title>
    <g
      id="SPIN---MOBILE"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        id="SPIN---POPUP---FIRST-TIME-USER---2"
        transform="translate(-190.000000, -372.000000)"
      >
        <g id="Group" transform="translate(182.000000, 367.000000)">
          <g id="Group-11" transform="translate(8.793103, 5.280000)">
            <g id="Group-8" fill="#1FF19C">
              <ellipse
                id="Oval"
                cx="17.5862069"
                cy="17.6"
                rx="17.5862069"
                ry="17.6"
              ></ellipse>
            </g>
            <path
              d="M18.256024,21.1409043 L18.256024,8.12307692 L14.8806366,8.12307692 L14.8806366,21.196123 C14.8806366,24.7669375 16.8225803,27.0769231 20.4566013,27.0769231 L21.6445623,27.0769231 L21.6445623,23.5843353 L20.482903,23.5843353 C18.8697308,23.5797337 18.256024,22.857288 18.256024,21.1409043 Z"
              id="Path"
              fill="#FFFFFF"
            ></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const Impact = () => (
  <>
    <div className={styles.modal__image}>
      <div className={""}>
        <img alt="" src={firstImage} />
      </div>
    </div>
    <div className={styles.modal__impact}>
      <Item
        saved={10000}
        water
        icon={waterIcon()}
        color="#000"
        glass={glassIcon()}
        style={{ margin: "20px 0" }}
        waterIconStyle={{
          border: "1px solid black",
          width: "32px",
          height: "32px",
        }}
      />
      <Item
        icon={co2Icon()}
        saved={44}
        color="#000"
        train={trainIcon()}
        style={{ margin: "20px 0" }}
        waterIconStyle={{
          border: "1px solid black",
          width: "32px",
          height: "32px",
        }}
      />
    </div>
  </>
);

const History = ({ owners, ownersImages }) => {
  const [expandedAreasNum, setExpanded] = useState(0);
  const handleExpand = (isExpanded) =>
    isExpanded
      ? setExpanded(expandedAreasNum + 1)
      : setExpanded(expandedAreasNum - 1);
  const imageHeight = 42,
    margin = 10,
    expanedArea = 123;
  const getLineHeight = () =>
    owners.length * imageHeight +
    (owners.length - 1) * margin +
    expanedArea * expandedAreasNum;

  return (
    <div className={styles.modal__history}>
      <div
        style={{ height: `${getLineHeight()}px` }}
        className={styles.modal__history__line}
      />
      {owners.map((o, idx) => (
        <Owner
          isLast={idx === owners.length - 1}
          expand={handleExpand}
          owner={o}
          ownerImage={ownersImages[idx]}
        />
      ))}
    </div>
  );
};

const Owner = ({ owner, ownerImage, expand, isLast }) => {
  const [expanded, toggleExpanded] = useState(owner === "louisa" && isLast);

  const expandedContent = () => (
    <div className={styles["modal__info--expanded"]}>
      <div className={styles["modal__owner--expanded__picture"]}>
        <img alt="" src={storyIcon} style={{ width: "100%" }} />
      </div>
      <div className={styles["modal__owner--expanded__comment"]}>
        I wore this jacket at my favourite party!
      </div>
      <div className={styles["modal__owner--expanded__location_date"]}>
        <LocationDate />
      </div>
    </div>
  );

  const LocationDate = () => (
    <div className={styles.modal__location_date}>
      <div className={styles.modal__location}>
        {owner === "skiim_london" ? "London, UK" : "New York, USA"}
      </div>
      <div className={styles.modal__date}>
        {owner === "skiim_london" ? "- 01.03.2020" : "- 10.04.2020"}
      </div>
    </div>
  );

  const handleExpand = () => {
    toggleExpanded(!expanded);
    !isLast && expand(!expanded);
  };

  return (
    <div className={styles.modal__owner}>
      <ImageChecked size={44} image={ownerImage} />
      <div className={styles.modal__owner_info}>
        <div className={styles.modal__username}>
          <b>@{owner}</b>
        </div>
        <div className={styles.modal__info}>
          <LocationDate />
          {expanded && expandedContent()}
        </div>
      </div>
      <Expand
        onClick={handleExpand}
        style={{ float: "left" }}
        direction={expanded ? "up" : "down"}
      />
    </div>
  );
};

const Expand = (props) => (
  <span className={styles.modal__owner__arrow} onClick={props.onClick}>
    <Arrow {...props} />
  </span>
);

const PreownedItems = (props) => {
  const PreownedItem = (props) => (
    <div className={styles.modal__preowned_items}>
      <div className={styles.modal__preowned_items_image}>
        <img alt="" src={props.image} />
      </div>
      <div className={styles.modal__green_lablaco_icon}>
        <LablaCoinIcon />
      </div>
      <div className={styles.modal__potential_gain}>
        <b>+10LC</b>
      </div>
    </div>
  );

  return (
    <div style={{ marginTop: "35px" }}>
      <PreownedItem image={firstImage} />
      <PreownedItem image={secondImage} />
      <PreownedItem image={thirdImage} />
    </div>
  );
};

const TextContainer = ({ step }) => {
  const ImpactText = () => (
    <>
      Welcome to SPIN by lablaco, now you can share your preowned items with the
      world by simply
      <strong> uploading</strong> them with instant <b>water</b> and{" "}
      <b>CO2 impact calculation</b>.
    </>
  );

  const PreownedItemsText = () => (
    <>
      {" "}
      Earn <strong>Lablacoin</strong> by sharing your preowned items to get{" "}
      <strong>items for free</strong> from other users and brands, with
      worldwide <strong>automatic home pick-up</strong> and delivery.
    </>
  );

  const HistoryText = () => (
    <>
      {" "}
      When you get an item, you will receive the <strong>ownership</strong>{" "}
      traced on <strong>blockchain</strong> that will be stored in your{" "}
      <strong>digital wardrobe</strong>, enabling you to add stories to your
      items.
    </>
  );

  const LastText = () => (
    <>
      {" "}
      When you stop using your item <strong>pass it on</strong> in a tap,
      prolonging its lifecycle, keeping clothes away from landfill and{" "}
      <strong>in the loop</strong> by <strong>spinning</strong> with a global
      community.
    </>
  );

  const Wrap = ({ children }) => (
    <div className={styles.modal__description}> {children} </div>
  );

  switch (step) {
    case 0:
      return (
        <Wrap>
          {" "}
          <ImpactText />{" "}
        </Wrap>
      );
    case 1:
      return (
        <Wrap>
          {" "}
          <PreownedItemsText />{" "}
        </Wrap>
      );
    case 2:
      return (
        <Wrap>
          {" "}
          <HistoryText />{" "}
        </Wrap>
      );
    case 3:
      return (
        <Wrap>
          {" "}
          <LastText />{" "}
        </Wrap>
      );
    default:
      return null;
  }
};

const Content = ({ step }) => (
  <div className={styles.modal__content}>
    <TextContainer step={step} />
    {step === 0 && <Impact />}
    {step === 1 && <PreownedItems />}
    {step === 2 && (
      <History owners={OWNERS.slice(0, -1)} ownersImages={OWNERS_IMG} />
    )}
    {step === 3 && <History owners={OWNERS} ownersImages={OWNERS_IMG} />}
  </div>
);

export default Content;
