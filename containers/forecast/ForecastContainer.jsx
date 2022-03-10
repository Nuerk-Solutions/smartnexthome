import React, {Fragment, useEffect, useState} from 'react'
import {isEmpty, isUndefined} from 'lodash-es'
import Carousel from 'nuka-carousel'
import CarouselSettings from '../../utils/CarouselSettings'
import ErrorBoundaryContainer from '../error-boundary/ErrorBoundaryContainer'
import {FormatTime} from '../../utils/TimeUtils'
import moment from 'moment-timezone';
import TimeframeComponent from '../../components/weather/TimeframeComponent';
import ErrorComponent from '../../components/error/ErrorComponent';
import DayComponent from '../../components/weather/DayComponent';
import LoaderComponent from '../../components/loader/LoaderComponent';

export default function ForecastContainer({cityName, weatherCurrent, weatherForecast}) {
    const [selectedDay, setSelectedDay] = useState('')
    const [selectedDayIndex, setSelectedDayIndex] = useState(0)
    const {dt, timezone} = weatherCurrent
    // set the selectedDay to the current day by fetching current city date from weatherCurrent timestamp
    const updateSelectedDay = async () => {
        // show forecast elements when formattedDateTime is not an empty string & an error message starting with Failed
        if (!isUndefined(weatherCurrent.dt)) {
            const today = FormatTime(dt, timezone, 'MM/DD/YYYY')
            // check if today key exist in days
            if (!isEmpty(weatherForecast) && !isUndefined(weatherForecast)) {
                setSelectedDay(weatherForecast.days[today] ? today : '')
                selectedDayIndexHandler(weatherForecast.days[today] ? today : '')
            }
        }
    }

    // find the index of selectedDay in days object
    const selectedDayIndexHandler = selectedDay => {
        const index = Object.keys(weatherForecast.days).indexOf(selectedDay)
        setSelectedDayIndex(index !== -1 ? index : 0)
    }

    /**
     * day is a date '02/28/2020'
     * @param {String} day
     */
    const daySelectHandler = day => {
        setSelectedDay(day)
        selectedDayIndexHandler(day)
    }

    useEffect(() => {
        updateSelectedDay()
        // eslint-disable-next-line
    }, [weatherForecast])

    return (
        <ErrorBoundaryContainer>
            <Fragment>
                {!isEmpty(weatherForecast.days) && !isEmpty(selectedDay) ? (
                    <Fragment>
                        {/*mobile*/}
                        <div className="sm:hidden pb-3">
                            {weatherForecast.timeFrames[selectedDay] ? (
                                <Carousel {...CarouselSettings('time')}>
                                    {weatherForecast.timeFrames[selectedDay].map(
                                        (Timeframe, index) => {
                                            return (
                                                <TimeframeComponent Timeframe={Timeframe} key={index}/>
                                            )
                                        }
                                    )}
                                </Carousel>
                            ) : (
                                <ErrorComponent
                                    errorMessage={`Keine stündliche Vorhersage verfügbar für ${moment(selectedDay).format('DD.MM.YYYY')}`}
                                />
                            )}
                        </div>

                        {/* tablet and above devices */}
                        <div className="hidden sm:flex sm:pb-3 sm:mb-4">
                            {weatherForecast.timeFrames[selectedDay] ? (
                                <Carousel {...CarouselSettings('time', 'tablet')}>
                                    {weatherForecast.timeFrames[selectedDay].map(
                                        (Timeframe, index) => {
                                            return (
                                                <TimeframeComponent Timeframe={Timeframe} key={index}/>
                                            )
                                        }
                                    )}
                                </Carousel>
                            ) : (
                                <ErrorComponent
                                    errorMessage={`Keine stündliche Vorhersage verfügbar für ${moment(selectedDay).format('DD.MM.YYYY')}`}
                                />
                            )}
                        </div>
                        <div
                            className={`flex flex-col mt-4 sm:mt-0 sm:flex-row w-full rounded`}>
                            {Object.keys(weatherForecast.days).map((day, index) => {
                                // day is key in weatherForecast.days -> '02/28/2020'
                                // index is the position of key -> 0
                                return (
                                    <DayComponent
                                        day={weatherForecast.days[day]}
                                        key={index}
                                        index={index}
                                        selectedIndex={selectedDayIndex}
                                        selectedDay={() => daySelectHandler(day)}
                                    />
                                )
                            })}
                        </div>
                    </Fragment>
                ) : (
                    <div className="mb-3">
                        {isEmpty(weatherForecast.days) ? (
                            <ErrorComponent
                                errorMessage={'Für diese Stadt sind keine Vorhersagedaten verfügbar!'}
                                showCloseBtn={false}
                            />
                        ) : (
                            <LoaderComponent
                                loaderText={`Wettervorhersage für ${cityName} wird abgerufen.`}
                            />
                        )}
                    </div>
                )}
            </Fragment>
        </ErrorBoundaryContainer>
    )
}
