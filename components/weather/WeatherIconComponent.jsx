import React from 'react'
import {WiDayFog} from '@react-icons/all-files/wi/WiDayFog';
import {WiNightFog} from '@react-icons/all-files/wi/WiNightFog';
import {WiDayCloudyWindy} from '@react-icons/all-files/wi/WiDayCloudyWindy';
import {WiNightAltCloudyWindy} from '@react-icons/all-files/wi/WiNightAltCloudyWindy';
import {WiTornado} from '@react-icons/all-files/wi/WiTornado';
import {WiNa} from '@react-icons/all-files/wi/WiNa';
import {WiDirectionUp} from '@react-icons/all-files/wi/WiDirectionUp';
import {WiDirectionUpRight} from '@react-icons/all-files/wi/WiDirectionUpRight';
import {WiDirectionRight} from '@react-icons/all-files/wi/WiDirectionRight';
import {WiDirectionDownRight} from '@react-icons/all-files/wi/WiDirectionDownRight';
import {WiDirectionDown} from '@react-icons/all-files/wi/WiDirectionDown';
import {WiDirectionDownLeft} from '@react-icons/all-files/wi/WiDirectionDownLeft';
import {WiDirectionLeft} from '@react-icons/all-files/wi/WiDirectionLeft';
import {WiDirectionUpLeft} from '@react-icons/all-files/wi/WiDirectionUpLeft';
import {WiSunrise} from '@react-icons/all-files/wi/WiSunrise';
import {WiSunset} from '@react-icons/all-files/wi/WiSunset';

export default function WeatherIconComponent({type}) {
    const ICON_TYPES = {
        'wi-day-fog': <WiDayFog/>,
        'wi-night-fog': <WiNightFog/>,
        'wi-day-windy': <WiDayCloudyWindy/>,
        'wi-night-windy': <WiNightAltCloudyWindy/>,
        'wi-tornado': <WiTornado/>,
        'wi-na': <WiNa/>,
        up: <WiDirectionUp/>,
        'up-right': <WiDirectionUpRight/>,
        right: <WiDirectionRight/>,
        'down-right': <WiDirectionDownRight/>,
        down: <WiDirectionDown/>,
        'down-left': <WiDirectionDownLeft/>,
        left: <WiDirectionLeft/>,
        'up-left': <WiDirectionUpLeft/>,
        sunrise: <WiSunrise/>,
        sunset: <WiSunset/>
    }

    return ICON_TYPES[type] || <WiNa/>
}
