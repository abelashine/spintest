import React from "react";
import { ReactComponent as MoodboardIcon } from "../../../static/icons/moodBoardIconNew.svg";
import storeicon from "../../../static/icons/store.png";
import storeiconwhite from "../../../static/icons/store-white.png";
import vaulticon from "../../../static/icons/vault.png";
import vaulticonwhite from "../../../static/icons/vault-white.png";
import worldsicon2 from "../../../static/icons/world_tab_icon_active.svg";
import artefcatIconBlack from "../../../static/icons/artefcatsBlack.png";
import artefcatIconWhite from "../../../static/icons/artefcatsWhite.png";
import wearableIconBlack from "../../../static/icons/wearableBlack.png";
import architectureIconBlack from "../../../static/icons/architectureBlack.png";
import wearableWhite from "../../../static/icons/wearableWhite.png";

const tabs = (viewAs, store, foreignBrandInfo) => {
  if (
    (store?.type === "brand" && foreignBrandInfo?.type === "brand") ||
    (!viewAs && store.business_role) ||
    (viewAs && foreignBrandInfo?.business_role)
  ) {
    return [
      {
        name: "art",
        label: "Artefacts",
        icon: [
          <img src={artefcatIconBlack} alt="articon" />,
          <img src={artefcatIconWhite} alt="articonwhit" />,
        ],
        fill: true,
      },
      {
        name: "store",
        label: "WEARABLES",
        icon: [
          <img src={wearableIconBlack} alt="werableblack" />,
          <img src={wearableWhite} alt="wearablewhite" />,
        ],
        fill: true,
      },
      // architecture
      {
        name: "architecture",
        label: "architecture",
        icon: [
          <img src={architectureIconBlack} alt="werableblack" />,
          <img src={wearableWhite} alt="wearablewhite" />,
        ],
        fill: true,
      },
    ];
  }

  return [
    {
      name: "vault",
      label: "VAULT",
      icon: [
        <img src={vaulticon} alt="vaulticon" />,
        <img src={vaulticonwhite} alt="vaulticon" />,
      ],
      fill: true,
    },
    {
      name: "store",
      label: "STORE",
      icon: [
        <img src={storeicon} alt="storeicon" />,
        <img src={storeiconwhite} alt="storeicon" />,
      ],
      fill: true,
    },
    // {
    //   name: "architecture",
    //   label: "",
    //   icon: <img src={worldsicon2} alt="worldsicon" />,
    //   fill: true,
    // },
  ];
};

export default tabs;
