import React, {Fragment, Suspense, useContext, useEffect, useState} from 'react';
import ChannelItem from './channelItem/ChannelItem';
import axois from 'axios';
import {ThemeContext} from '../../context/ThemeContext';
import LoaderComponent from '../../components/loader/LoaderComponent';
import ErrorComponent from '../../components/error/ErrorComponent';
import HeaderComponent from '../../components/header/HeaderComponent';
import FooterComponent from '../../components/footer/FooterComponent';

export default function Radio() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [json, setJson] = useState([]);
    const [channelIndexPlaying, setChannelIndexPlaying] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        axois.get('/api/radio/list').then(
            (result) => {
                setJson(result.data);
                setIsLoaded(true);
            },
            (error) => {
                setError(error);
                setIsLoaded(true);
            }
        );
    }, []);

    if (error) {
        return (
            <div className="flex justify-center">
                <div className="w-5/6">
                    <ErrorComponent
                        errorMessage={error.message}
                        showCloseBtn={true}
                        closeError={() => {
                            setError(null);
                        }}
                    />
                </div>
            </div>
        );
    } else if (!isLoaded) {
        return (
            <LoaderComponent loaderText={`Abrufen der Radiosender 😎`}/>
        );
    } else
        return (
            <Fragment>
                <div className={`bg-${theme} tracking-wider border-box`}>
                    <div>
                        {/*{!params.get("key") && <HeaderComponent/>}*/}
                        <HeaderComponent/>
                    </div>
                </div>
                <div>
                    <Suspense
                        fallback={
                            <LoaderComponent loaderText={'Radio-UI wird geladen'}/>
                        }>
                        <div className={'flex flex-row flex-wrap gap-3 mx-2.5'}>
                            {
                                json.map((item, index) => {
                                    return (
                                        <ChannelItem
                                            key={index}
                                            id={item.id}
                                            radioName={item.name}
                                            radioImage={item.image}
                                            color={item.color}
                                            mp3={item.mp3}
                                            currentlyPlay={channelIndexPlaying === index && channelIndexPlaying !== -1}
                                            style={`${channelIndexPlaying !== -1 && channelIndexPlaying !== index ? 'opacity-50' : ''}`}
                                            onClick={() => {
                                                if (channelIndexPlaying === index) {
                                                    setChannelIndexPlaying(-1)
                                                    return;
                                                }
                                                setChannelIndexPlaying(index);
                                            }}
                                        />
                                    );
                                })
                            }
                        </div>
                    </Suspense>
                </div>

                <div>
                    <FooterComponent/>
                </div>
            </Fragment>
        );
}
