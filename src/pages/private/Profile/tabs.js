import React from "react";
import { ReactComponent as MoodboardIcon } from "../../../static/icons/moodBoardIconNew.svg";
import storeicon from "../../../static/icons/storeicon.svg";
import vaulticon from "../../../static/icons/vaulticon.svg";
import worldsicon2 from "../../../static/icons/world_tab_icon_active.svg";
import shopIcon from "../../../static/icons/shopicon.svg"

const tabs = (viewAs, store, foreignBrandInfo) => {
  if (
    (store?.type === "brand" && foreignBrandInfo?.type === "brand") ||
    (!viewAs && store.business_role) ||
    (viewAs && foreignBrandInfo?.business_role)
  ) {
    return [
      {
        name: "art",
        label: "",
        icon: <MoodboardIcon />,
        fill: false,
      },
      {
        name: "store",
        label: "",
        icon: <img src={storeicon} alt="storeicon" />,
        fill: true,
      },
      {
        name: "architecture",
        label: "",
        icon: <img src={worldsicon2} alt="worldsicon" />,
        fill: true,
      },
    ];
  }

  return [
    {
      name: "vault",
      label: "",
      icon: <img src={vaulticon} alt="vaulticon" />,
      fill: true,
    },
    {
      name: "store",
      label: "",
      icon: <img src={shopIcon} alt="storeicon" />,
      fill: true,
    },
    {
      name: "architecture",
      label: "",
      icon: <img src={worldsicon2} alt="worldsicon" />,
      fill: true,
    },
  ];
};

export default tabs;
