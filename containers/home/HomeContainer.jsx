import React, {Fragment} from 'react'
import AutoCompleteContainer from '../autocomplete/AutoCompleteContainer'
import {AddressContextProvider} from '../../context/AddressContext'
import {WeatherUnitContextProvider} from '../../context/WeatherUnitContext'
import ErrorBoundaryContainer from '../error-boundary/ErrorBoundaryContainer'
import LoaderComponent from '../../components/loader/LoaderComponent';
import dynamic from 'next/dynamic';

// const WeatherContainer = lazy(() => import('../weather/WeatherContainer'))
// const FavoritesContainer = lazy(() => import('../favorites/FavoritesContainer'))

const WeatherContainers = dynamic(() =>
        import('../weather/WeatherContainer')
    // import('../favorites/FavoritesContainer')
    , {
        loading: () => <LoaderComponent loaderText={'Wettervorhersage-UI wird geladen'}/>,
        ssr: false
    })

export default function HomeContainer() {
    return (
        <Fragment>
            <WeatherUnitContextProvider>
                <AddressContextProvider>
                    <AutoCompleteContainer/>
                    <ErrorBoundaryContainer>
                        <WeatherContainers/>
                        {/*<Suspense*/}
                        {/*    fallback={*/}
                        {/*        <LoaderComponent loaderText={'Wettervorhersage-UI wird geladen'}/>*/}
                        {/*    }>*/}
                        {/*    <WeatherContainer/>*/}
                        {/*    <FavoritesContainer/>*/}
                        {/*</Suspense>*/}
                    </ErrorBoundaryContainer>
                </AddressContextProvider>
            </WeatherUnitContextProvider>
        </Fragment>
    )
}
