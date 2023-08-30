import React from "react";
import { Formik } from "formik";
import { getInitialValues } from "./initForm";
import styles from "./PickUpForm.module.scss";
import routes from "../../../../routes";

import RentalPeriod from "../RentalPeriod";
import Summarize from "../Summarize";
import RentSummarize from "../RentSummarize";
import { CardSelect } from "../../../../components/Inputs/ProductRequest/CardSelect";
import DiscountFields from "../DiscountFields";
import BottomButton from "./BottomButton";

const PickUpForm = ({
  productInfo,
  onSubmit,
  setActiveSelect,
  setIsWalletModalVisible,
  cards,
  allowApply,
  isButtonDisabled,
  history,
  isPublic,
  currentQuantity,
  total,
  setTotal,
  setTempValues,
  currentSize,
  checkoutProductType,
}) => {
  const startValues = getInitialValues(productInfo);
  const onClickHandler = (values) => {
    if (isPublic) {
      history.push(routes.prelogin);
    } else {
      setTempValues(values);
    }
  };
  return (
    <div key="2" className={styles.PickUpForm}>
      <Formik initialValues={startValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {productInfo.for_rent && (
              <RentalPeriod
                minValue={productInfo.minimum_rental_period}
                minPeriodOption={productInfo.minimum_rental_time}
                maxValue={productInfo.maximum_rental_period}
                maxPeriodOption={productInfo.maximum_rental_time}
              />
            )}
            {cards && productInfo.price > 0 && parseFloat(total) !== 0 && (
              <CardSelect
                onAddNew={() => setIsWalletModalVisible(true)}
                setActiveSelect={setActiveSelect}
                variants={cards}
                onClickHandler={onClickHandler}
                onSubmit={onSubmit}
                total={total}
              />
            )}
            {!productInfo.giveaway && <DiscountFields />}
            {productInfo.for_rent ? (
              <RentSummarize
                productInfo={productInfo}
                currentQuantity={currentQuantity}
                total={total}
                setTotal={setTotal}
              />
            ) : (
              <Summarize
                productInfo={productInfo}
                shipPrice="0.00"
                currentQuantity={currentQuantity}
                total={total}
                setTotal={setTotal}
                //[Leo - 2210191536] checkout product type will be handed down to summarize from pickupform directly
                checkoutProductType = {checkoutProductType}
              />
            )}
            <BottomButton
              allowApply={allowApply}
              isButtonDisabled={isButtonDisabled}
              onClickHandler={onClickHandler}
              total={total}
              currentSize={currentSize}
              onSubmit={onSubmit}
            />
            
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PickUpForm;
