import React, {Fragment} from 'react'
import ErrorBoundaryContainer from '../error-boundary/ErrorBoundaryContainer'
import InfoComponent from '../../components/weather/InfoComponent';
import InfoDetailComponent from '../../components/weather/InfoDetailComponent';
import LoaderComponent from '../../components/loader/LoaderComponent';

export default function CurrentWeatherContainer({weatherCurrent, address, latlong}) {
    return (
        <ErrorBoundaryContainer>
            <Fragment>
                {address && weatherCurrent ? (
                    <div>
                        <InfoComponent
                            address={address}
                            latlong={latlong}
                            weatherCurrent={weatherCurrent}
                        />
                        <InfoDetailComponent weatherCurrent={weatherCurrent}/>
                    </div>
                ) : (
                    <LoaderComponent/>
                )}
            </Fragment>
        </ErrorBoundaryContainer>
    )
}
