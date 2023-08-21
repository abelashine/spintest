import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ShoesIcon from "../../../../static/icons/ShoesIcon.svg";
import BagIcon from "../../../../static/icons/Bag.svg";
import PaintingIcon from "../../../../static/icons/Painting.svg";
import ARIcon from "../../../../static/icons/ARIcon.svg";
import ShopIcon from "../../../../static/icons/Shop.svg";
import vrMask from "../../../../static/icons/vr-mask-icon.svg";
import shopIcon from "../../../../static/icons/shop-redisgn-icon.svg";
import styles from "./PhygitalNFTsExplanation.module.scss";


const PhygitalNFTsExplanation = () => {

  const {
    productInfo,
  } = useSelector((state) => state.profileReducer);

  const [productType, setProductType] = useState("phygital");
  const [description, setDescription] = useState("Wear");
  const [nftTypeText, setNftTypeText] = useState("garments");
  const [descriptionIcon, setDescriptionIcon] = useState(BagIcon);

  useEffect(() => {
    console.log("Hereeeee"+JSON.stringify(productInfo));
    console.log("For Art "+productInfo?.for_art);
    if (productInfo?.product_type == 1)
    {
      setProductType("phygital");
    }
    else if (productInfo?.product_type == 2)
    {
      setProductType("digital");
    }
    
    if (productInfo?.for_art)
    {
      setDescription("Exhibit");
      setNftTypeText("art");
      setDescriptionIcon(PaintingIcon);
    }
    else
    {
      setDescription("Wear");
      setNftTypeText("garments");
      setDescriptionIcon(BagIcon);
    }

  }, [productInfo, productType, description]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.header}>How to use {productType} NFTs</p>
      </div>

      {(productInfo?.product_type == 1) && 
      (
        <div className={styles.container}>
          <div className={styles.iconContainer}>
            <img src={descriptionIcon} alt="Bag" width="23px" height="23px" />
          </div>
          <span>
            {description} it IRL: {description.toLowerCase()} your {nftTypeText} in the physical world
          </span>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <img src={ARIcon} alt="ARIcon" width="21px" height="23px" />
        </div>
        <span>
          View it in AR: view your {nftTypeText} in the digital world with SPIN, through your phone
        </span>
      </div>

      <div className={styles.container}>
        <div className={styles.iconContainer}>
            <img src={vrMask} alt="VR mask" width="21px" height="23px" />
        </div>
        <span>
          {description} in VR: {description.toLowerCase()} your {nftTypeText} in the digital world with SPIN, through your VR headset
        </span>
      </div>

      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <img src={ShopIcon} alt="Shop" width="21px" height="23px" />
        </div>
        <span>
            Pass it on: re-sell, rent or swap your NFTs with the PASS ON feature from your VAULT
        </span>
      </div>
    </div>
  );
};

export default PhygitalNFTsExplanation;
