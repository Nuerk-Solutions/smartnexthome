import React, {useContext} from 'react'
import style from './LoaderComponent.module.scss'
import {ThemeContext} from '../../context/ThemeContext';

export default function LoaderComponent({loaderText}) {
    const {theme} = useContext(ThemeContext)
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className={style.spinner}>
                <div className={style.double_bounce1}></div>
                <div className={style.double_bounce2}></div>
            </div>
            {loaderText && (
                <div
                    className={`mx-auto text-center text-sm font-light text-${
                        theme === 'light' ? 'dark' : 'light'
                    }`}>
                    {loaderText}
                    <span className={`text-2xl ${style.text_fade}`}>...</span>
                </div>
            )}
        </div>
    )
}
