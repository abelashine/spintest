import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./AddInfo.module.scss";
import moreButton from "../../../../../../static/icons/more.png";
import { uploadSelectionActions } from "../../../../../../actions/uploadSelection";

import UploadJourney from "../../../../../../components/Modal/UploadJourney";
import PhotoCrop from "../../../../../../components/PhotoCrop";

const AddInfo = ({ productLink, token }) => {
  const dispatch = useDispatch();
  const [cropModal, setCropModal] = useState(false);
  const [journeyModal, setJourneyModal] = useState(false);
  const [journeyImage, setJourneyImage] = useState(null);
  const [cities, setCities] = useState([]);

  const onPublishHandler = (values) => {
    const shortCityValue = cities.find((c) => c.value === values.location)
      ?.name;
    const dataToRequest = {
      id: token,
      photo: values.photo,
      title: values.title,
      description: values.description,
      location: shortCityValue,
      hashtags: JSON.stringify(values.hashtags),
    };
    dispatch(
      uploadSelectionActions.addProductMemory(productLink, dataToRequest, () =>
        setJourneyModal(false)
      )
    );
  };
  const goFuther = (imgData) => {
    setJourneyImage(imgData.topopup);
    setCropModal(false);
    setJourneyModal(true);
  };
  const src = journeyImage ? URL.createObjectURL(journeyImage) : null;
  return (
    <div className={styles.addInfo}>
      <div className={styles.addPhoto}>
        <input
          id="photo"
          type="file"
          onClick={(e) => {
            e.target.value = "";
          }}
          onChange={({ target: { files } }) => {
            setJourneyImage(files["0"]);
            setCropModal(true);
          }}
        />
        <label htmlFor="photo">
          <img src={moreButton} alt="" />
          Add a photo and memory
        </label>
      </div>
      {cropModal && src && (
        <PhotoCrop
          image={src}
          onCloseCrop={() => {
            setCropModal(false);
          }}
          onSaveCrop={goFuther}
          // turned off for make equal to spin connect while crop not fixed
          // withCrop={true}
          isPost
        />
      )}
      {journeyModal && (
        <UploadJourney
          onClose={() => setJourneyModal(false)}
          uploadedImage={journeyImage}
          onSubmit={onPublishHandler}
          cities={cities}
          setCities={setCities}
        />
      )}
    </div>
  );
};

export default AddInfo;
