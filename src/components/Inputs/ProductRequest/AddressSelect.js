import React, { useState, useEffect } from 'react'
import { useField } from 'formik'
import styles from './ProductRequest.module.scss'


export function AddressSelect({
  isActive,
  isError,
  onAddNew,
  setActiveSelect,
  variants,
  addressLabel="Delivery Address",
}) {
  const addresses = variants.filter(i => i.id)

  const [field, , helpers] = useField("address_id")
  const [isOpened, setIsOpened] = useState(false)
  const [value, setValue] = useState()

  useEffect(() => {
    if (addresses.length)
      setAddress(addresses[0])
  }, [variants])
  useEffect(() => { setIsOpened(isActive === field.name) }, [isActive, 'address_id'])

  return (
    <div
      className={`${styles.ProductRequest} ${isActive === field.name ? styles.active : ''}`}
      onClick={onClick}
    >
      <label>
        {addressLabel}
        <input value={value} placeholder={"Insert new address"} readOnly={true} />
        <input {...field} hidden={true} />

        <div className={styles.dropdown}>
          {isOpened && (
            <ul className={styles.variants}>
              {addresses.map(address => (
                  <li
                    key={address.id}
                    className={styles.variant}
                    onClick={event => onSelect(event, address)}
                  >
                    {getAddressLabel(address)}
                  </li>
                ),
              )}
              <li className={styles.variant} onClick={addNewAddress}>Add New +</li>
            </ul>
          )}
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='8'
          height='14'
          className={`${styles.arrow} ${isOpened ? styles.opened : ''}`}
        >
          <path
            fill='var(--white)'
            fillRule='evenodd'
            d='M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z'
          />
        </svg>
      </label>
      {isError?.touched && isError?.text && <span className={styles.errorText}>{isError?.text}</span>}
    </div>
  )
  function onClick() {
    setActiveSelect(field.name)
    setIsOpened(!isOpened)
  }

  function onSelect(event, address) {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    setIsOpened(false)

    setAddress(address)
  }

  function addNewAddress(event) {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    setIsOpened(false)

    onAddNew()
  }

  function setAddress(address) {
    helpers.setValue(address.id)
    setValue(getAddressLabel(variants.find(i => i.id === address.id)))
  }
}

function getAddressLabel(address) {
  return address && address.city ? `${address.address}, ${address.city.city}` : ''
}
