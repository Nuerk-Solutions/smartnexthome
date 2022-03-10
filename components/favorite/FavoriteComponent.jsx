import React, {useContext} from 'react'
import {ThemeContext} from '../../context/ThemeContext';

export default function FavoriteComponent({favorite, favoriteSelected, index, selectedIndex}) {
    const {theme, colorTheme} = useContext(ThemeContext)
    return (
        <div
            className={`h-16 text-${colorTheme} hover:bg-${colorTheme} hover:text-${theme} border ${
                index === selectedIndex
                    ? 'sm:border-teal-600'
                    : `sm:border-${colorTheme}`
            }
        } pt-5 lg:pt-1/2 font-semibold rounded-2xl cursor-pointer text-center justify-center`}
            style={{
                backgroundColor: theme === 'dark' ? '#292929' : '#e8ebee',
            }}
            onClick={favoriteSelected}>
            {favorite.address.cityName.split(', ')[0]}
        </div>
    )
}

