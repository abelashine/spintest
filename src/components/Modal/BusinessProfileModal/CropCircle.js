import React,{ useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Modal, Button } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';

const boxStyle = {
  width: "380px",
  height: "380px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom:100
};
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// Modal
const CropperCircleModal = ({ src, modalOpen, setModalOpen, onSavePreview }) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);

  // handle save
  const handleSave = async () => {
    if (cropRef.current) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      onSavePreview(dataUrl);
      setModalOpen(false);
    }
  };

  return (
    <Modal show={modalOpen} onHide={() => setModalOpen(false)} style={modalStyle}>
      <Modal.Body>
        <div style={boxStyle}>
          <AvatarEditor
            ref={cropRef}
            image={src}
            style={{ width: "100%", height: "100%" }}
            borderRadius={150}
            color={[0, 0, 0, 0.72]}
            scale={slideValue / 10}
            rotate={0}
          />

          {/* Bootstrap Range Slider */}
          <RangeSlider
            min={10}
            max={50}
            style={{ margin: "0 auto", width: "80%" }}
            value={slideValue}
            onChange={(e) => setSlideValue(e.target.value)}
          />

          <Button
            variant="outline-secondary"
            size="sm"
            style={{ marginRight: "10px" }}
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="sm"
            style={{ background: "#5596e6" }}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

// Container
const CropCircle = () => {
  // image src
  const [src, setSrc] = useState(null);

  // preview
  const [preview, setPreview] = useState(null);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

  // ref to control input element
  const inputRef = useRef(null);
  console.log("Input ref", inputRef);

  // handle Click
  const handleInputClick = (e) => {
    console.log("handleInputClick");
    e.preventDefault();
    inputRef.current.click();
  };

  // handle Change
  const handleImgChange = (e) => {
    console.log("handleImgChange");

    setSrc(URL.createObjectURL(e.target.files[0]));
    setModalOpen(true);
  };

  // handle saving preview
  const onSavePreview = (dataUrl) => {
    console.log("data  ",dataUrl)
    setPreview(dataUrl);
  };

  return (
    <>
      <img src={preview} alt="" />
      <header>
        <h1>React Avatar Cropper</h1>
        <hr />
      </header>
      <main className="container">
        <CropperCircleModal
          modalOpen={modalOpen}
          src={src}
          setModalOpen={setModalOpen}
          onSavePreview={onSavePreview}
        />
        <a href="/" onClick={handleInputClick}>
          Add an image
        </a>
        <small>Click to select image</small>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImgChange}
        />
        <div className="img-container">
          <img
            src={
              preview ||
              "https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
            }
            alt=""
            width="200"
            height="200"
          />
        </div>
      </main>
    </>
  );
};

export default CropCircle;