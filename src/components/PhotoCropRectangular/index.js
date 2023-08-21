import React, { useState, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import ReactCrop from "react-image-crop";
import styles from "./PhotoCropRectangular.module.scss";
import Range from "../Inputs/Range";
import Button from "../Button";
import { getCroppedImg, getImgSizes } from "../../utils";

const MIN_IMG_WIDTH = 500;
const MIN_IMG_HEIGHT = 310;
const MIN_CANVAS_WIDTH = 1080;
const MIN_CANVAS_HEIGHT = 1080;

const PhotoCropRectangular = ({
  onCloseCrop,
  onSaveCrop,
  image,
  isCircled,
  isPost,
  withCrop,
}) => {
  const [zoom, setZoom] = useState(1);
  const [coefficient, setCoefficient] = useState(1);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [edited, setEdited] = useState(null);

  const [crop, setCrop] = useState({
    aspect: isPost ? "" : 1,
    width: MIN_IMG_WIDTH,
    height: MIN_IMG_HEIGHT,
    x: 0,
    y: 0,
  });
  const [resultCrop, setResultCrop] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentCropSize, setCurrentCropSize] = useState(null);

  useEffect(() => {
    const imageRef = new Image();
    imageRef.src = image;

    const calculate = (width, height) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const { imgWidth, imgHeight } = getImgSizes(
        width,
        height,
        MIN_IMG_WIDTH,
        MIN_IMG_HEIGHT
      );
      const hRatio = MIN_IMG_WIDTH / imgWidth;
      const vRatio = MIN_IMG_HEIGHT / imgHeight;
      const ratio = Math.min(hRatio, vRatio);
      const hQualityRatio = MIN_CANVAS_WIDTH / imgWidth;
      const vQualityRatio = MIN_CANVAS_HEIGHT / imgHeight;
      const qualityRatio = Math.min(hQualityRatio, vQualityRatio);
      canvas.width = Number((imgWidth * qualityRatio).toFixed(0));
      canvas.height = Number((imgHeight * qualityRatio).toFixed(0));
      const newImage = new Image(
        Number((imgWidth * ratio).toFixed(0)),
        Number((imgHeight * ratio).toFixed(0))
      );
      newImage.src = image;
      setCurrentCropSize({
        width: imgWidth * ratio,
        height: imgHeight * ratio,
      });
      newImage.addEventListener("load", () => {
        ctx.drawImage(
          newImage,
          0,
          0,
          imgWidth,
          imgHeight,
          0,
          0,
          imgWidth * qualityRatio,
          imgHeight * qualityRatio
        );
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setCurrentImage(url);
        });
      });
    };

    const listener = () => {
      calculate(imageRef.width, imageRef.height);
    };

    imageRef.addEventListener("load", listener);
    return () => {
      imageRef.removeEventListener("load", listener);
    };
  }, [image]);

  useEffect(() => {
    if (!isPost) {
      setCrop({
        aspect: 1,
        width: MIN_IMG_WIDTH,
        height: MIN_IMG_HEIGHT,
        x: 0,
        y: 0,
      });
    } else if (currentCropSize) {
      setCrop({
        aspect: "",
        width: currentCropSize.width,
        height: currentCropSize.height,
        x: 0,
        y: 0,
      });
    }

    document.body.style.position = "relative";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.position = "static";
      document.documentElement.style.overflow = "initial";
      document.body.style.overflow = "initial";
    };
  }, [isPost, currentCropSize]);

  const onClickSave = () => {
    const getCroppedImage = async (image) => {
      let width = 310,
        height = 310;
      if (isPost) {
        width = currentCropSize.width;
        height = currentCropSize.height;
      }
      const result1 = await getCroppedImg(
        image,
        resultCrop || crop,
        width,
        height,
        "image/jpeg"
      );
      const result2 = await getCroppedImg(
        image,
        resultCrop || crop,
        width,
        height,
        "image/webp"
      );
      onSaveCrop({
        tosave: result1,
        topopup: result2,
      });
    };
    if (withCrop && edited && (resultCrop || crop)) {
      getCroppedImage(edited.getImage());
    } else if (edited) {
      edited.getImage().toBlob((blob) => {
        const imageData = {
          tosave: blob,
          topopup: blob,
        };
        onSaveCrop(imageData);
      });
    }
  };

  const setEditorRef = (editor) => setEdited(editor);

  const zoomChange = (value) => {
    const scale = value * coefficient;
    setZoom(scale);
    if (+value === 1 && +coefficient === 1) {
      setPosition({ x: 0.5, y: 0.5 });
    } else if (+value !== 1 && +coefficient === 1) {
      setPosition(null);
    } else if (+value - +coefficient > 1) {
      setPosition(null);
    } else {
      setPosition({ x: 0.5, y: 0.5 });
    }
  };
  const getStartCoefficient = (imgInfo) => {
    let scale = 1;
    if (imgInfo.height > imgInfo.width) {
      const scaleCoef = 1 / (imgInfo.height / imgInfo.width);
      scale = scaleCoef;
    } else {
      const scaleCoef = 1 / (imgInfo.width / imgInfo.height);
      scale = scaleCoef;
    }
    setCoefficient(scale);
  };
  useEffect(() => {
    setZoom(coefficient);
  }, [coefficient]);

  if (!isPost && withCrop) {
    return (
      <div className={styles.PhotoCrop}>
        <AvatarEditor
          ref={setEditorRef}
          className={styles.imageCroper}
          width={400}
          height={200}
          image={image}
          border={0}
          borderRadius={isCircled ? 50 : 0}
          scale={Number(zoom)}
          position={position}
          onLoadSuccess={getStartCoefficient}
        />
        <div className={styles.zoom}>
          <Range min={1} max={10} step={0.1} onChange={zoomChange} />
        </div>
        <Button
          className={styles.save}
          color="blue"
          size="large"
          type="button"
          onClick={onClickSave}
        >
          SAVE
        </Button>
        <Button
          className={styles.save}
          color="transparent"
          size="large"
          type="button"
          onClick={onCloseCrop}
        >
          Cancel
        </Button>
      </div>
    );
  }
  return (
    <div className={styles.PhotoCrop}>
      {currentCropSize && (
        <div className={styles.container}>
          {withCrop ? (
            <ReactCrop
              src={image}
              crop={crop}
              onChange={(crop) => setCrop(crop)}
              onComplete={(crop) => setResultCrop(crop)}
              className={styles.crop}
              minWidth="39"
              minHeight="39"
              keepSelection={true}
              renderComponent={
                <div style={{ height: currentCropSize.height }}>
                  <AvatarEditor
                    ref={setEditorRef}
                    className={styles.imageCroper}
                    width={currentCropSize.width}
                    height={currentCropSize.height}
                    image={currentImage}
                    border={0}
                    borderRadius={isCircled ? 50 : 0}
                    scale={Number(zoom)}
                    position={{ x: 0.5, y: 0.5 }}
                  />
                </div>
              }
            />
          ) : (
            <AvatarEditor
              ref={setEditorRef}
              className={styles.imageCroper}
              width={400}
              height={200}
              image={image}
              border={0}
              borderRadius={isCircled ? 50 : 0}
              scale={Number(zoom)}
            />
          )}
        </div>
      )}
      <div className={styles.zoom}>
        <Range min={1} max={10} step={0.1} onChange={zoomChange} />
      </div>
      <Button
        className={styles.save}
        color="blue"
        size="large"
        type="button"
        onClick={onClickSave}
      >
        SAVE
      </Button>
      <Button
        className={styles.cancel}
        color="transparent"
        size="large"
        type="button"
        onClick={onCloseCrop}
      >
        Cancel
      </Button>
    </div>
  );
};

export default PhotoCropRectangular;
