import React, { useState, useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import TextFieldV2 from "../../../Inputs/TextFieldV2";
import { validateHashtag } from "../../../../utils/validations";
import styles from "./HashesFieldBlock.module.scss";
import backArrowV2 from "../../../../static/icons/back-arrowV2.svg";

const HashesFieldBlock = ({ name, nameToSave }) => {
  const { values } = useFormikContext();
  const hashtagsRef = useRef(null);

  const [hashtagsData, setHashtagsData] = useState(values.hashtags);
  useEffect(() => {
    hashtagsRef.current.addEventListener("keydown", addOnSpaceBtn);
    return () =>
      hashtagsRef.current.removeEventListener("keydown", addOnSpaceBtn);
  }, [values[name]]);

  if (values[name].includes(" ")) {
    values[name] = values[name].replace(" ", "");
  }
  const addHashTag = () => {
    let val = validateHashtag(values[name]).toLowerCase();
    if (val) {
      val = "#" + val;
    } else {
      values[name] = "";
      return;
    }
    values[name] = "";
    const updatedHashTags = [...new Set([...hashtagsData, val])];
    setHashtagsData(updatedHashTags);
    values[nameToSave] = updatedHashTags;
  };
  const deleteHashTag = (index) => {
    const updatedHashtags = values[nameToSave].filter((h, i) => i !== index);
    setHashtagsData(updatedHashtags);
    values[nameToSave] = updatedHashtags;
  };
  const addOnSpaceBtn = (e) => {
    if (e.code !== "Space") return;
    addHashTag();
  };

  return (
    <section className={styles.hashtagsBlock}>
      <div className={styles.hashtagsBlock__field} ref={hashtagsRef}>
        <TextFieldV2 name={name} placeholder="Type here..." />
        <img src={backArrowV2} alt="Add arrow" onClick={addHashTag} />
      </div>

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
