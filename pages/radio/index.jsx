import React, {Suspense, useContext, useEffect, useState} from 'react';
import axois from 'axios';
import {ThemeContext} from '../../context/ThemeContext';
import LoaderComponent from '../../components/loader/LoaderComponent';
import ErrorComponent from '../../components/error/ErrorComponent';
import HeaderComponent from '../../components/header/HeaderComponent';
import FooterComponent from '../../components/footer/FooterComponent';
import dynamic from 'next/dynamic';

const ChannelItem = dynamic(() => import('./channelItem/ChannelItem'), {ssr: false});

export default function Radio() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [json, setJson] = useState([]);
    const [selectedRadioIndex, setSelectedRadioIndex] = useState(-1);
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
            <div className={'w-full min-h-screen grid relative'}>
                {/*<div className={`bg-${theme}`}>*/}
                <div>
                    {/*{!params.get("key") && <HeaderComponent/>}*/}
                    <HeaderComponent/>
                </div>
                {/*</div>*/}
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
                                            index={index}
                                            id={item.id}
                                            radioName={item.name}
                                            radioImage={item.image}
                                            color={item.color}
                                            mp3={item.mp3}
                                            style={`${selectedRadioIndex !== -1 && selectedRadioIndex !== index ? 'opacity-50' : ''}`}
                                            selected={selectedRadioIndex === index}
                                            onClick={(event, force) => {
                                                // console.log(selectedRadioIndex, index)
                                                console.log(force);
                                                if (selectedRadioIndex === index || force) {
                                                    setSelectedRadioIndex(-1);
                                                    return;
                                                }
                                                setSelectedRadioIndex(index);
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
            </div>
        );
}
