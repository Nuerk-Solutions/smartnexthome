import React, {Component} from 'react'
import {WeatherUnitContext} from './WeatherUnitContext'
import axios from 'axios'
import fetchIPAddress from './../utils/FetchIPAddress'
import isValid from '../utils/ValidityChecker'
import {isNil} from 'lodash-es'

// const token = process.env.REACT_APP_IPINFO_TOKEN
const AddressContext = React.createContext(null)

class AddressContextProvider extends Component {
    // get weather unit
    static contextType = WeatherUnitContext

    updateState = (state) => {
        this.setState({...state})
    }

    updateFavorites = (state) => {
        this.setState({...state})
    }
    state = {
        showLoader: true,
        address: {
            cityName: '',
            cityId: '',
        },
        latlong: null,
        favorites: [],
        updateState: this.updateState,
        updateFavorites: this.updateFavorites,
    }

    formatCoords = (latitude, longitude) => {
        // return `${latitude},${longitude}`
        return `${longitude},${latitude}`
    }

    /**
     * update address using reverse geocoding of Algolia PLaces to obtain city, state, country, cityID
     */
    updateAddress = async (latlong) => {
        let hit = {}
        try {
            const {features} = (
                // await axios.get(`https://weather-react-api-dev.now.sh/address/coords/${latlong}`)
                await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${latlong}.json?access_token=pk.eyJ1IjoiZGVyZWNoMWUiLCJhIjoiY2t0NjA1MWEyMGRzZjJwanB1NzkxdnhoMiJ9.XCZgdSBLLFhVMn2ZEH7rDQ&language=de`)
            ).data
            hit = features[0]

            if (isValid(hit)) {
                // const city = hit.city ? hit.city[0] : ''
                // const state = hit.administrative ? hit.administrative[0] : ''
                // const country = hit.country ? hit.country : ''
                // const cityName = `${validName(city)}${validName(state)}${validName(
                //   country,
                //   false
                // )}`
                const cityName = hit.place_name_de;
                const cityId = hit.id ? hit.id : ''
                this.updateState({
                    showLoader: false,
                    address: {
                        cityName,
                        cityId,
                    },
                    latlong,
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * get ip and city info using ip-api
     * update the address
     */
    getIPAddress = async () => {
        try {
            const data = await fetchIPAddress()
            if (isValid(data)) {
                const {
                    lat,
                    lon,
                    city,
                    regionName,
                    country,
                } = data
                const cityName = `${city}, ${regionName}, ${country}`

                // check whether latitude and longitude are strings which are NaN as well as if value is null or undefined
                const Latitude =
                    isNil(lat) || isNaN(Number(lat)) ? '00' : lat
                const Longitude =
                    isNil(lon) || isNaN(Number(lon)) ? '00' : lon
                this.updateState({
                    showLoader: false,
                    address: {
                        cityName,
                    },
                    latlong: this.formatCoords(Latitude, Longitude),
                })
            } else {
                this.updateState({showLoader: false})
            }
        } catch (error) {
            console.error(error);
        }
    }

    getAddress = async () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latlong = this.formatCoords(
                        position.coords.latitude,
                        position.coords.longitude
                    )
                    await this.updateAddress(latlong)
                },
                (error) => {
                    console.error(error)
                    this.getIPAddress()
                }
            )
        } else {
            await this.getIPAddress()
        }
    }

    getFavorites = () => {
        if (localStorage.getItem('favorites')) {
            this.setState({
                favorites: [...JSON.parse(localStorage.getItem('favorites'))],
            })
        }
    }

    componentDidMount() {
        this.getAddress()
        // update favorites for the initial application load
        this.getFavorites()
    }

    render() {
        return (
            <AddressContext.Provider value={this.state}>
                {this.props.children}
            </AddressContext.Provider>
        )
    }
}

export {AddressContext, AddressContextProvider}
