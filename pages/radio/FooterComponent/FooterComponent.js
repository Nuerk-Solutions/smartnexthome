import React, {useContext, useEffect, useState} from 'react'
import {ThemeContext} from '../../../components/context/ThemeContext';

export default function FooterComponent() {
    const {theme, colorTheme} = useContext(ThemeContext)
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);

    }, [date]);

    return (
        <div
            className={`text-${colorTheme} pb-3`}
            style={{
                backgroundColor: theme === 'dark' ? '#292929' : '#e8ebee',
            }}>
            <div
                className={`flex flex-col text-center sm:flex sm:flex-row justify-around pt-5 text-${colorTheme} text-sm`}>
                <p className="flex flex-no-wrap justify-center items-center my-2 sm:my-0 w-full sm:w-1/2">
                    {date.toLocaleTimeString()}
                </p>
            </div>
            <p className="mx-auto text-center text-sm">
                {date.toLocaleDateString()}
            </p>
        </div>
    )
}
