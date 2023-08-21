import React from "react";
import { JOURNEY, COMPOSITION, IMPACT } from "../tabs";
import Journey from "./Journey";
import Composition from "./Composition";
import Impact from "./Impact";

const TabBody = ({ tab, tokenizedBrandInfo, token }) => {
  if (tab === JOURNEY) {
    return <Journey token={token} />;
  }
  if (tab === COMPOSITION) {
    return <Composition />;
  }
  if (tab === IMPACT) return <Impact tokenizedBrandInfo={tokenizedBrandInfo} />;

  return <Journey token={token} />;
};

export default TabBody;
