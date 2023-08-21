import React, { useState, useEffect, useRef } from "react";
import styles from "./SelectField.module.scss";

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
    if (focus) {
      fieldRef.current.focus();
    }
  }, [focus]);
  const step = label === "Day" ? 1 : label === "Month" ? 2 : 3;
  const isDisabled = focusMem.includes(step);

  const listHandler = () => {
    if (!isDisabled) return;
    if (label === "Day" && fieldNum !== 1) {
      setFieldNum(1);
    } else if (label === "Month" && fieldNum !== 2) {
      setFieldNum(2);
    } else if(label === 'Year' && fieldNum !== 3) {
      setFieldNum(3);
    }
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
    if (label === "Day") {
      setFieldNum(2);
      setFocusMem([...focusMem, 2]);
    } else if (label === "Month") {
      setFieldNum(3);
      setFocusMem([...focusMem, 3]);
    } else setFocusMem([...focusMem, 4]);
  };
  const filteredOptions = !value
    ? options
    : options.filter((item) =>
        item.value.toLowerCase().includes(value.toLowerCase())
      );

  return (
    <div className={styles.SelectField} data-value={isDisabled}>
      <div className={styles.typerow} onClick={listHandler}>
        <label htmlFor={`field${label}date`}>{label}</label>
        <input
          id={`field${label}date`}
          type="text"
          placeholder="Type here..."
          value={value}
          onChange={onChangeHandler}
          ref={fieldRef}
          disabled={!isDisabled}
          autoComplete="off"
        />
      </div>
      {isOpened && focus && filteredOptions.length !== 0 && (
        <ul className={styles.list}>
          {filteredOptions.map((item) => (
            <li key={item.value} onClick={onChooseOption}>
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectField;
