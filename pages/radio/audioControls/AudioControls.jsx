import React, {useEffect, useRef, useState} from 'react';
import style from './AudioControls.module.css';
import {BiLoader} from '@react-icons/all-files/bi/BiLoader';
import {IoPauseOutline} from '@react-icons/all-files/io5/IoPauseOutline';
import {IoPlayOutline} from '@react-icons/all-files/io5/IoPlayOutline';

export default function AudioControls({
                                          isPlaying,
                                          onPlayPauseClick,
                                          mp3,
                                          radioName,
                                          radioImage,
                                          title,
                                      }) {

    const [volume, setVolume] = useState(50);
    const [isLoading, setIsLoading] = useState(true);
    const [showVolumeSlider, setShowVolumeSlider] = useState(true);
    const audio = useRef(null);

    useEffect(() => {
        setShowVolumeSlider(!(/Android|webOS|Macintosh|MacIntel|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
    }, []);

    useEffect(() => {
        if (!isPlaying && audio.current != null) {
            audio.current.pause();
            setIsLoading(true);
        }
    }, [isPlaying]);

    // Update mediaSession when the audio is loaded
    useEffect(() => {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: title,
            artist: radioName,
            artwork: [
                {src: radioImage, sizes: '512x512', type: 'image/png'},
            ],
        })
    }, [title, onPlayPauseClick]);

    return (
        <div className="grid place-items-center">
            {isPlaying ?
                isLoading ?
                    (
                        <BiLoader className={style.loading_svg} size={50}/>
                    ) : (
                        <button
                            type="button"
                            className="pause"
                            onClick={() => {
                                onPlayPauseClick(false)
                            }}
                            aria-label="Pause"
                        >
                            <IoPauseOutline size={50}/>
                        </button>
                    ) : (
                    <button
                        type="button"
                        className="play"
                        onClick={() => {
                            onPlayPauseClick(true)
                            audio.current = new Audio(mp3);
                            audio.current.volume = volume / 100;
                            audio.current.play().then(() => {
                                ;
                                // mediaSession.setActionHandler('play', () => {
                                //     setIsPlaying(true);
                                //     onClick();
                                // });
                                // mediaSession.setActionHandler('pause', () => {
                                //     setIsPlaying(false);
                                //     onClick();
                                // });
                                setIsLoading(false);
                            });
                        }}
                        aria-label="Play"
                    >
                        <IoPlayOutline size={50}/>
                    </button>
                )}
            {
                showVolumeSlider &&
                <input
                    type="range"
                    value={volume}
                    step="1"
                    min="0"
                    max={100}
                    className={`mt-5`}
                    onChange={(e) => {
                        setVolume(Number(e.target.value))
                        audio.current.volume = Number(e.target.value) / 100;
                    }}
                />

            }
        </div>
    );
}
