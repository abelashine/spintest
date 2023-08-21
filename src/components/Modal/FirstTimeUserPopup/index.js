import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./FirstTimeUserPopup.module.scss";
import Button from '../../Button';
import Arrow from '../Shared/Arrow';
import Content from './Content';
import Pagination from '../Shared/Pagination';
import Modal from '../';
import spinLogo from '../../../static/images/fourStepUser/SPINLOGO.png';
import {authActions} from "../../../actions/auth";

const Header = ({ step, handlePrevious }) => (
    <>
        <div className={styles.modal__header}>
          <span onClick={(e) => handlePrevious()}>
            <Arrow style={{ float: 'left' }} />
          </span>
          <img src={spinLogo} alt="spin logo"/>
        </div>
        <div className={styles.modal__step} ><b>STEP {step + 1}</b></div>
    </>
);
const Footer = ({ step, handleNext, handleStartSpinning }) => (
  <div className={styles.modal__footer}>
    <Button
      className={styles.modal__button}
      onClick={(e) => (step < 3 ? handleNext() : handleStartSpinning())}
      color={step < 3 ? "black" : "blue"}
      size="middle"
    >
      {step < 3 ? "NEXT" : "START SPINNING"}
    </Button>
    <Pagination current={step} />
  </div>
);
export default (props) => {
  const [isModalOpen, setIsModalOpen] = useState(props.isOpen);
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step > 0 ? step - 1 : 0);
  const handleStartSpinning = () => {
    setIsModalOpen(false);
    dispatch(authActions.setPopupNeedInfo(false));
  };

  return (
    <Modal className={styles.modal_container} isOpen={isModalOpen}>
      <Header step={step} handlePrevious={handlePrevious} />
      <Content step={step} />
      <Footer
        handleNext={handleNext}
        handleStartSpinning={handleStartSpinning}
        step={step}
      />
    </Modal>
  );
};
