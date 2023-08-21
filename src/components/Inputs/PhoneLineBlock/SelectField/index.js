import React, { useState, useEffect, useRef } from "react";
import styles from "./SelectField.module.scss";
import backArrow from "../../../../static/icons/back-arrow.svg";
import backArrowV3 from "../../../../static/icons/back-arrowV3.svg";

const SelectField = ({
  options,
  value,
  onChange,
  validate,
  label,
  focus,
  onSave,
  fieldNum,
  setFieldNum,
  focusMem,
  setFocusMem,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const fieldRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (!fieldRef.current.contains(event.target)) {
        // Clicked outside the component, close the options
        setIsOpened(false);
      }
    };

    // Attach event listener to the whole document
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (focus) {
      fieldRef.current.focus();
    }
  }, [focus]);
  const step = 1;
  const isDisabled = focusMem.includes(step);

  const listHandler = () => {
    if (!isDisabled) return;
    setFieldNum(1);
  };
  const onChangeHandler = (e) => {
    const str = validate(e.target.value);
    onChange(str);
    if (!isOpened) setIsOpened(true);
  };
  const onChooseOption = (e) => {
    onChange(e.target.innerHTML);
    onSave(e.target.innerHTML);
    setIsOpened(false);
    setFieldNum(2);
    setFocusMem([...focusMem, 2]);
  };
  const arrowBtnClass = isOpened ? styles.openArrowBtn : styles.arrowBtn;

  const filteredOptions = !value
    ? options
    : options.filter((item) =>
        item.value.toLowerCase().includes(value.toLowerCase())
      );

  return (
    <div className={styles.SelectField} data-value={isDisabled}>
      <div className={styles.typerow} onClick={listHandler}>
        <input
          id={`field${label}date`}
          type="text"
          placeholder="+000"
          value={value}
          onChange={onChangeHandler}
          ref={fieldRef}
          disabled={!isDisabled}
          autoComplete="off"
        />
      </div>
      {isOpened && focus && filteredOptions.length !== 0 && (
        <ul className={styles.list}>
          {filteredOptions.map((item, index) => (
            <li key={index} onClick={onChooseOption}>
              {item.value}
            </li>
          ))}
        </ul>
      )}
       <div className={styles.arrowImage}>
       <img src={backArrow} alt="Arrow"  className={arrowBtnClass} />
       </div>
    </div>
  );
};

export default SelectField;