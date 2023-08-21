import React, { useState } from "react";
import UploadSelectionInput from "../UploadSelectionInput";
import { validateHashtag } from "../../../utils/validations";
import styles from "./HashesFieldBlock.module.scss";

const HashesFieldBlock = ({ values, name, totalNames, label }) => {
  const [hashtagsData, setHashtagsData] = useState(values[totalNames]);
  if (values[name].includes(" ")) {
    values[name] = values[name].replace(" ", "");
  }
  const addHashTag = (value) => {
    const val = "#" + validateHashtag(value).toLowerCase();
    const updatedHashTags = [...new Set([...hashtagsData, val])];
    setHashtagsData(updatedHashTags);
    values[totalNames] = updatedHashTags;
  };
  const deleteHashTag = (index) => {
    const updatedHashtags = values[totalNames].filter((h, i) => i !== index);
    setHashtagsData(updatedHashtags);
    values[totalNames] = updatedHashtags;
  };
  return (
    <section className={styles.hashtagsBlock}>
      <UploadSelectionInput
        name={name}
        label={label}
        type="hashtags"
        onClick={addHashTag}
        isSpaceBtn
      />
      <div className={styles.hashtagsBlock__hashtags}>
        {hashtagsData.map((hashtag, index) => (
          <span
            onClick={() => deleteHashTag(index)}
            key={index}
            className={styles.hashtagsBlock__hashtags_hashtag}
          >
            {hashtag}
          </span>
        ))}
      </div>
    </section>
  );
};

export default HashesFieldBlock;
