export const getInitialValues = (uploadedImage) => {
  return {
    photo: uploadedImage || null,
    title: "",
    description: "",
    location: "",
    hashtagfield: "",
    hashtags: [],
  };
};

export const validate = ({ photo, location }, locationCities) => {
  const errors = {};

  if (!photo) {
    errors.photo = "Required photo";
  }

  if (!location?.trim()) {
    errors.location = "Required";
  } else {
    const isCorrectAddress = locationCities.find(
      (data) => data.value === location.trim()
    );
    if (!isCorrectAddress) {
      errors.location = "You have to choose an existing address";
    }
  }

  return errors;
};
