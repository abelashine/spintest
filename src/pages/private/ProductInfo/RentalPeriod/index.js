import React, { useEffect } from 'react'
import { useFormikContext } from "formik";
import styles from './RentalPeriod.module.scss'
import { getPeriodLimits } from '../helpers'

import UploadSelectionInput from '../../../../components/Inputs/UploadSelectionInput'

const RentalPeriod = ({ minValue, minPeriodOption, maxValue, maxPeriodOption }) => {
    const { values } = useFormikContext();
    const options = getPeriodLimits(values, minValue, minPeriodOption, maxValue, maxPeriodOption)
    useEffect(() => {
        values.rentalPeriod.value = options.valueOptions[0].name;
    }, [values.rentalPeriod.type]);
    return (
        <section className={styles.RentalPeriod}>
            <h3>Rental period</h3>
            <div className={styles.RentalPeriod__fields}>
                <UploadSelectionInput
                    name={`rentalPeriod.value`}
                    type="select"
                    variants={options.valueOptions}
                />
                <UploadSelectionInput
                    name={`rentalPeriod.type`}
                    type="select"
                    variants={options.periodsOptions}
                />
            </div>
        </section>
    )
}

export default RentalPeriod
