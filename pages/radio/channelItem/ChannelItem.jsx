import React, {useContext, useEffect, useState} from 'react';
import AudioControls from '../audioControls/AudioControls';
// import style from './ChannelItem.module.css';
import Backdrop from '../backdrop/Backdrop';
import axois from 'axios';
import Ticker from 'react-ticker';
import {ThemeContext} from '../../../context/ThemeContext';

export default function ChannelItem({
                                        id,
                                        radioName,
                                        radioImage,
                                        color,
                                        mp3,
                                        currentlyPlay,
                                        onClick,
                                        style
                                    }) {

    const {theme, colorTheme} = useContext(ThemeContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [seconds, setSeconds] = useState(-1);
    const [publicTitle, publicTitleSet] = useState('Loading...');
    const [fontColor, setFontColor] = useState('text-light');
    let refreshDelay = 31 * 10; //30 seconds


    useEffect(() => {
        setFontColor('text-' + getContrastYIQ(color));
    }, []);

    const GetTitleFromAPI = () => {
        const [title, setTitle] = useState('Loading...');

        function fetchData() {
            axois.get('/api/radio/' + id).then(res => {
                setTitle(res.data);
                publicTitleSet(res.data);
            });
        }


        useEffect(() => {
            fetchData();
        }, []);

        useEffect(() => {
            const timer = seconds <= refreshDelay && setInterval(() => setSeconds(seconds + 1), 100); // 1000ms = 1sec
            if (seconds > refreshDelay) {
                setSeconds(0);
                fetchData();
            }
            return () => clearInterval(timer);
        }, [seconds]);

        return <div>{title}</div>
    }


    const getContrastYIQ = (hexcolor) => {
        if (!hexcolor) return 'dark';
        const r = parseInt(hexcolor.substring(1, 2), 16);
        const g = parseInt(hexcolor.substring(3, 2), 16);
        const b = parseInt(hexcolor.substring(5, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'dark' : 'light';
    };

    return (
        <div
            className={`${fontColor} relative z-0 max-h-96 w-full md:max-w-sm px-6 pt-5 pb-5 border-0 shadow-lg rounded-2xl mt-5 mb-5 cursor-pointer ` + style}
            style={{
                background: (isPlaying ? color : `linear-gradient(180deg, ${color}, #000000)`),
            }}

            onClick={(e) => {
                if (e.target.type === 'range') return;
                setIsPlaying(!isPlaying);
                onClick(e);
            }}>

            {/*Image*/}
            <div className={'grid place-items-center'}>
                <div className="w-40 h-40 bg-gray-200 rounded-2xl shadow-lg">
                    <img className={'rounded-2xl shadow-lg'} id={`img-${radioImage}`} src={radioImage} alt={'No Img'}/>
                </div>
            </div>

            {/*Name and Title*/}
            <div className={'grid place-items-center mt-5'}>
                <div className={'mb-2'}>{radioName}</div>
            </div>
            <div className={'whitespace-nowrap'}>
                <Ticker speed={2} mode={'await'}>
                    {() => <GetTitleFromAPI/>}
                </Ticker>
            </div>

            {/*Audio Controls*/}
            <AudioControls isPlaying={currentlyPlay} onPlayPauseClick={setIsPlaying} radioName={radioName}
                           radioImage={radioImage} title={publicTitle} mp3={mp3}/>

            {/*Backdrop*/}
            <Backdrop activeColor={color} isPlaying={currentlyPlay}/>
        </div>
    );
}
