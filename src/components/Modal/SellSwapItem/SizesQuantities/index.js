/*eslint-disable */
import React, { useState, useEffect } from "react";
import SizeNumberBlock from "./SizeNumberBlock";
import styles from "./SizesQuantities.module.scss";
import { useFormikContext } from "formik";

const index = ({ characteristics, isDisabled }) => {
  const { values, errors, setFieldTouched } = useFormikContext();
  const [itemSizes, setItemSizes] = useState(values.itemsizes);
  const [sizesList, setSizesList] = useState(characteristics.sizes);

  useEffect(() => {
    setItemSizes(values.itemsizes);
    const updatedSizesList = characteristics.sizes.filter(
      (size) => !values.itemsizes.find((s) => s.size === size.description)
    );
    setSizesList(updatedSizesList);
  }, [values.itemsizes]);

  const addSizeBlock = (values, errors) => {
    const lastElemIndex = values.itemsizes.length - 1;
    const noEmptyPrevious = values.itemsizes[lastElemIndex].size;
    const isThereError = errors.itemsizes?.filter((v) => v).length;
    if (!noEmptyPrevious || isThereError) return;
    setItemSizes([...itemSizes, { size: "", quantity: "1" }]);
    values.itemsizes = [...values.itemsizes, { size: "", quantity: "1" }];
  };

  const deleteSizeBlock = (values, index) => {
    const updatedItemSizes = values.itemsizes.filter((s, i) => i !== index);
    setItemSizes(updatedItemSizes);
    values.itemsizes = updatedItemSizes;
    setFieldTouched("itemsizes", false);
  };

  return (
    <section>
      {itemSizes.map((itemsize, index, array) => {
        return (
          <SizeNumberBlock
            key={itemsize + index}
            sizesList={sizesList}
            index={index}
            deleteSizeBlock={deleteSizeBlock}
            array={array}
            isDisabled={isDisabled}
          />
        );
      })}

      {!isDisabled && (
        <div className={styles.plusItemsize}>
          <span
            onClick={() => addSizeBlock(values, errors)}
            className={styles.plusItemsize__icon}
          >
            +
          </span>
        </div>
      )}
    </section>
  );
};

export default index;
