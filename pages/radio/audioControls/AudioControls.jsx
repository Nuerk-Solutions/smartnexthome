import React, {useEffect, useState} from 'react';
import style from './AudioControls.module.css';
import {BiLoader} from '@react-icons/all-files/bi/BiLoader';
import {IoPauseOutline} from '@react-icons/all-files/io5/IoPauseOutline';
import {IoPlayOutline} from '@react-icons/all-files/io5/IoPlayOutline';

export default function AudioControls({
                                          onClick,
                                          setPlaying,
                                          mp3,
                                          radioName,
                                          radioImage,
                                          title,
                                      }) {

    const [volume, setVolume] = useState(50);
    const [wasPlaying, setWasPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [audio, setAudio] = useState(null);

    // useEffect(() => {
    //     setShowVolumeSlider(!(/Android|webOS|Macintosh|MacIntel|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
    // }, []);

    useEffect(() => {
        const audio = new Audio(mp3);
        audio.addEventListener('volumechange', () => setVolume(audio.volume));
        setAudio(audio);
        setIsLoading(false);
        return () => {
            audio.pause();
        };
    }, []);

    useEffect(() => {
        if (audio != null) {
            if (!setPlaying && wasPlaying) {
                audio.pause();
                audio.src = '';
                setTimeout(function () {
                    audio.load(); // This stops the stream from downloading
                });
                setIsLoading(true);
                setWasPlaying(false);
            }
        }
    }, [setPlaying]);


    // Update mediaSession when the audio is loaded
    useEffect(() => {
        if (setPlaying && wasPlaying) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: title,
                artist: radioName,
                artwork: [
                    {src: radioImage, sizes: '512x512', type: 'image/png'},
                ],
            })
        }
    }, [setPlaying, wasPlaying, title, radioName, radioImage]);

    return (
        <div className="grid place-items-center">
            {setPlaying ?
                isLoading ?
                    (
                        <BiLoader className={style.loading_svg} size={50}/>
                    ) :
                    (
                        <button
                            type="button"
                            className="pause"
                            onClick={(event) => {
                                onClick(event);
                                audio.pause();
                                audio.src = '';
                                setTimeout(function () {
                                    audio.load(); // This stops the stream from downloading
                                });
                                setIsLoading(true);
                            }}
                        >
                            <IoPauseOutline size={50}/>
                        </button>
                    ) : (
                    <button
                        type="button"
                        className="play"
                        onClick={(event) => {
                            onClick(event);
                            audio.src = mp3;
                            audio.load();
                            audio.play().then(() => {
                                setIsLoading(false);
                                setWasPlaying(true);

                                navigator.mediaSession.setActionHandler('play', () => {
                                    audio.src = mp3;
                                    audio.load();
                                    audio.play().then(() => {
                                        setIsLoading(false);
                                        setWasPlaying(true);
                                    });
                                });
                                navigator.mediaSession.setActionHandler('pause', () => {
                                    audio.pause();
                                    audio.src = '';
                                    setTimeout(function () {
                                        audio.load(); // This stops the stream from downloading
                                    });
                                    setIsLoading(true);
                                    onClick(event, true);
                                });
                            });
                        }}
                    >
                        <IoPlayOutline size={50}/>
                    </button>
                )}
        </div>
    );
}
