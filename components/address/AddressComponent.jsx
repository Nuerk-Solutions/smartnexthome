import React, {useContext} from 'react'
import {ThemeContext} from '../../context/ThemeContext';

export default function AddressComponent({address, selectedAddressIndex, index, addressSelected}) {
    const {theme, colorTheme} = useContext(ThemeContext)

    return (
        <p
            className={`px-5 py-1 cursor-pointer item hover:text-${theme} hover:bg-${colorTheme} ${
                index === selectedAddressIndex
                    ? `text-${theme}`
                    : `text-${colorTheme}`
            }`}
            style={{
                backgroundColor: theme === 'dark' ? '#292929' : '#e8ebee',
            }}
            onClick={addressSelected}>
            {address.cityName}
        </p>
    )
}
