// ------------
// Hong Kong city iasn't returned by Google Maps service as a city, only as country,
// that is why this is the exception for this case, when user is looking for the Hong Kong location
// in the respective field
// start structure is kept here to remember
const cityHongKong = {
  description: "Hong Kong",
  matched_substrings: [{ length: 4, offset: 0 }],
  place_id: "ChIJD5gyo-3iAzQRfMnq27qzivA",
  reference: "ChIJD5gyo-3iAzQRfMnq27qzivA",
  structured_formatting: {
    main_text: "Hong Kong",
    main_text_matched_substrings: [{ length: 4, offset: 0 }],
  },
  terms: [{ offset: 0, value: "Hong Kong" }],
  types: (3)[("country", "political", "geocode")],
};
export const isThereHongKongCoincidence = (str) => {
  if (
    str.length >= 3 &&
    cityHongKong.description.toLowerCase().includes(str.trim().toLowerCase())
  ) {
    return [
      {
        name: cityHongKong.description,
        value: cityHongKong.description,
        shortValue: cityHongKong.place_id,
      },
    ];
  } else return null;
};
// -------------
