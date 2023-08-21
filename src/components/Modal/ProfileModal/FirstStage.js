import React, { useState } from "react";
import { useFormikContext } from "formik";

import styles from "./ProfileModal.module.scss";

import WizardForm from "../../../components/WizardForm";
import ImageUploader from "../../../components/Inputs/ImageUploader";
import pencil from "../../../static/icons/pencil.svg";
import ImagesWithIcons from "./ImagesWithIcons";
import Tab from "./Tab";
import PublicDetailCompany from "./PublicDetailCompany";
import PrivateDetailCompany from "./PrivateDetailCompany";

const FirstStage = () => {
  const { values, errors, touched } = useFormikContext();
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <PublicDetailCompany />;
      case 1:
        return <PrivateDetailCompany />;
      default:
        return null;
    }
  };
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <WizardForm.Page>
      <ImagesWithIcons />
      <Tab handleTabClick={handleTabClick} activeTab={activeTab} />
      <div className="tab-content">{renderTabContent()}</div>
    </WizardForm.Page>
  );
};

export default FirstStage;
