export const addImg = (
  event,
  setCanOpen,
  helpers,
  setImage,
  setCroppedImage
) => {
  const type = event.type;
  let image = null;
  if (type === "change") {
    image = [...event.target.files][0];
    setCanOpen(true);
  }
  helpers.setValue(image);
  setImage(URL.createObjectURL(image));
  setCroppedImage(false);
  event.preventDefault();
};

export const resetImg = (helpers, setImage, setIsDeleteBtn) => {
  helpers.setValue(null);
  setImage(null);
  setIsDeleteBtn(false);
};

export const saveImg = (
  imgData,
  setImage,
  helpers,
  setCroppedImage,
  setIsDeleteBtn
) => {
  setImage(URL.createObjectURL(imgData.topopup));
  setCroppedImage(true);
  setIsDeleteBtn(true);
  helpers.setValue(new File([imgData.tosave], "avatar.jpeg"));
};
