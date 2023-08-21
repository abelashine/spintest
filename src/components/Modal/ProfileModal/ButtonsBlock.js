import React from "react";
import Button from "../../Button";
import styles from "./ProfileModal.module.scss";

const ButtonsBlock = ({ onClose }) => {
  return (
    <div className={styles.buttons}>
      <Button type="submit" size="large" color="blue">
        Save
      </Button>
      <Button
        type="button"
        size="large"
        color="monochromatic"
        onClick={onClose}
      >
        Cancel
      </Button>
    </div>
  );
};

export default ButtonsBlock;
