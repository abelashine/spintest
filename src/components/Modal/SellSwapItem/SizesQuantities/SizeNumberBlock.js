import React, { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import styles from "./SizesQuantities.module.scss";
import UploadSelectionInput from "../../../Inputs/UploadSelectionInput";
import IsDisabledFieldHOC from "../../../../utils/HOCs/IsDisabledFieldHOC";
import { quantity } from "../../../../static/data/dataForForms";
import { validateNumber } from "../../../../utils/validations";

const SizeNumberBlock = ({
  sizesList,
  index,
  deleteSizeBlock,
  array,
  isDisabled,
}) => {
  const { errors, touched, values, setFieldValue } = useFormikContext();
  const onDeleteBlock = () => deleteSizeBlock(values, index);
  const zIndex = { zIndex: array.length + 3 - index };
  const selectsGroupRef = useRef(null);
  useEffect(() => {
    if (values.itemsizes[index].quantity) {
      const num = validateNumber(values.itemsizes[index].quantity, 14, true);
      setFieldValue(`itemsizes[${index}].quantity`, String(num));
    }
  }, [values.itemsizes[index].quantity]);
  useEffect(() => {
    if (isDisabled) {
      selectsGroupRef.current.style.display = "flex";
      const HOCfieldBlock = selectsGroupRef.current.children[0];
      HOCfieldBlock.style.width = "100%";
    }
  }, []);
  return (
    <div>
      <div
        className={styles.selectsGroup}
        ref={selectsGroupRef}
        style={{ display: "flex" }}
      >
        <IsDisabledFieldHOC isDisabled={isDisabled}>
          <UploadSelectionInput
            name={`itemsizes[${index}].size`}
            label="Item size"
            type="select"
            placeholder="*Select"
            variants={sizesList}
            isError={{
              text:
                errors.itemsizes &&
                errors.itemsizes[index] &&
                errors.itemsizes[index].size,
              touched:
                touched.itemsizes &&
                touched.itemsizes[index] &&
                touched.itemsizes[index].size,
            }}
            inlineStyle={zIndex}
          />
        </IsDisabledFieldHOC>

        {!isDisabled && (
          <UploadSelectionInput
            name={`itemsizes[${index}].quantity`}
            label="Quantity"
            type="select"
            variants={quantity}
            readOnly={false}
            inlineStyle={zIndex}
            isError={{
              text:
                errors.itemsizes &&
                errors.itemsizes[index] &&
                errors.itemsizes[index].quantity,
              touched:
                touched.itemsizes &&
                touched.itemsizes[index] &&
                touched.itemsizes[index].quantity,
            }}
          />
        )}
      </div>
      {index > 0 && !isDisabled && (
        <div className={styles.minusItemSize}>
          <span
            onMouseDown={onDeleteBlock}
            className={styles.minusItemSize__icon}
          >
            -
          </span>
        </div>
      )}
    </div>
  );
};

export default SizeNumberBlock;
