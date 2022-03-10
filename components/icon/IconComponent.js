import React from 'react'
import {FaSun} from '@react-icons/all-files/fa/FaSun';
import {FaMoon} from '@react-icons/all-files/fa/FaMoon';

export default function IconComponent({iconType}) {
    return (
        <div>
            {iconType === 'light' ? (
                <p className="text-toggle">
                    <FaSun/>
                </p>
            ) : (
                <p className="text-toggle">
                    <FaMoon/>
                </p>
            )}
        </div>
    )
}
