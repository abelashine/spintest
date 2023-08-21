import React, { useState } from 'react'
import styles from "./AddPrevLayerModal.module.scss";
import {
    daysInMonth,
    monthNames,
    oneHundredAndTwentyYears,
} from "../../../static/data/dataForForms";
import { getKeptUsers } from "../../../api";

import Select from "../../Inputs/Select";

const TitleFields = ({ cities, setPrevUsers, prevUsers, setCities }) => {
    const [days, setDays] = useState(daysInMonth);
    const [monthsField, setMonthsField] = useState(monthNames);
    const [years, setYears] = useState(oneHundredAndTwentyYears);
    const searchUser = (query) => {
        getKeptUsers(query.toLowerCase(), 'business').then(({ response }) => {
            const certainPrevLayers = response.slugs.map((layer) => {
                layer.name = layer.slug;
                layer.value = layer.slug;
                return layer;
            });
            setPrevUsers(certainPrevLayers);
        });
    };
    const searchDay = (query) => {
        if (!query) setDays(daysInMonth);
        const days = daysInMonth.filter(
            (d) => String(d.value).startsWith(query) && query
        );
        setDays(days);
    };
    const searchMonth = (query) => {
        if (!query) setMonthsField(monthNames);
        const months = monthNames.filter((m) =>
            String(m.name.toLowerCase()).includes(query)
        );
        setMonthsField(months);
        return months;
    };
    const searchYear = (query) => {
        if (!query) setYears(oneHundredAndTwentyYears);
        const years = oneHundredAndTwentyYears.filter(
            (y) => String(y.value).startsWith(query) && query
        );
        setYears(years);
    };
    return (
        <>
            <div className={styles.modalTitle}>
                Add previous item layer
            </div>
            <div className={styles.inputFields__selectField}>
                <p className={styles.inputFields__selectField_label}>
                    Username
                </p>
                <Select
                    isAutocomplete
                    name="prevlayerusername"
                    variant="underline"
                    options={prevUsers}
                    onAutocomplete={(query) => searchUser(query)}
                    isTypeAndDropdown
                    inlineStyle={{ zIndex: "5" }}
                />
            </div>

            <div className={styles.inputFields__selectField}>
                <p className={styles.inputFields__selectField_label}>
                    City of transaction
                </p>
                <Select
                    isAutocomplete
                    name="cityoftransaction"
                    variant="underline"
                    options={cities}
                    inlineStyle={{ zIndex: "4" }}
                    isTypeAndDropdown
                    setCity={setCities}
                />
            </div>

            <div
                id={styles.selectFieldDropdown}
                className={styles.inputFields__selectFieldDropdown}
            >
                <p
                    className={styles.inputFields__selectFieldDropdown_label}
                >
                    Date of transaction
                </p>
                <Select
                    name="transactiondate[2]"
                    variant="underline"
                    options={days}
                    placeholder="Day"
                    isAutocomplete
                    onAutocomplete={(query) => searchDay(query)}
                    isTypeAndDropdown
                    inlineStyle={{ zIndex: "3" }}
                />
                <Select
                    name="monthName"
                    variant="underline"
                    options={monthsField}
                    placeholder="Month"
                    isAutocomplete
                    onAutocomplete={(query) => searchMonth(query)}
                    isTypeAndDropdown
                    inlineStyle={{ zIndex: "2" }}
                />
                <Select
                    name="transactiondate[0]"
                    variant="underline"
                    options={years}
                    placeholder="Year"
                    isAutocomplete
                    onAutocomplete={(query) => searchYear(query)}
                    isTypeAndDropdown
                    inlineStyle={{ zIndex: "1" }}
                />
            </div>
        </>
    )
}
export default TitleFields
