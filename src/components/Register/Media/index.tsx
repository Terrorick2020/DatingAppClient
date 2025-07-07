import { useState, useRef, SyntheticEvent, JSX, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatTime } from '@/funcs/general.funcs';
import type { MediaProgressState } from '@/types/register.typs';
import type { IState } from '@/types/store.types';

import ReactPlayer from 'react-player';
import MediaContentBg from './Background';
import Slider from '@mui/material/Slider';


const MediaContent = (): JSX.Element => {
    const mediaLink = useSelector((state: IState) => state.settings.mediaLink);

    const [_, setProgress] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isFirstly, setIsFirstly] = useState<boolean>(true);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [showThumb, setShowThumb] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const playerRef = useRef<ReactPlayer>(null);
    const isBuffer = useRef<boolean>(false);
    const inactivityTimeout = useRef<NodeJS.Timeout | null>(null);
    const mountTimeRef  = useRef<number | null>(null);

    const handleReady = (): void => {
        setIsLoading(false);

        if(!mountTimeRef.current) {
            setIsPlaying(true);
            setIsFirstly(false);

            return;
        };

        const now = Date.now();
        const elapsed = now - mountTimeRef.current;
        const animeTime = 1200;
        
        if(elapsed < animeTime) {
            setTimeout(() => {
                setIsPlaying(true);
                setIsFirstly(false);
            }, animeTime - elapsed);
        } else {
            setIsPlaying(true);
            setIsFirstly(false);
        }
    };

    const handleBuffer = (): void => {
        isBuffer.current = true;
        setIsLoading(true);
        setIsPlaying(false);
        console.log( 'handleBuffer' )
    };

    const handleWaiting = (): void => {
        console.log( 'handleWaiting' )
    };

    const handleBufferEnd = (): void => {
        isBuffer.current = false;
        setIsLoading(false);
        setIsPlaying(true);
        console.log( 'handleBufferEnd' )
    };

    const handleError = (): void => {
        setIsLoading(false);
        setIsPlaying(false);
        setIsError(true);
    };

    const handleProgress = (state: MediaProgressState): void => {
        setProgress(state.played * 100);
        setCurrentTime(state.playedSeconds);
    };

    const handleDuration = (duration: number): void => setDuration(duration);

    const handleChangeProgress = (_event: Event, value: number | number[]): void => {
        const isNumber = typeof value === 'number';
        setCurrentTime(isNumber ? value : value[0]);
    };

    const handleSeek = (_event: SyntheticEvent | Event, value: number | number[]): void => {
        const time = typeof value === 'number' ? value : value[0];
        if (playerRef.current) {
            playerRef.current.seekTo(time, 'seconds');
            setCurrentTime(time);
        };

        setIsPlaying(true);
    };

    const handlePlaying = (): void => setIsPlaying(!isPlaying);

    const handleSeekBy = (seconds: number): void => {
        if (playerRef.current) {
            const newTime = currentTime + seconds;
            const clampedTime = Math.min(Math.max(newTime, 0), duration);
            playerRef.current.seekTo(clampedTime, 'seconds');
            setCurrentTime(clampedTime);
        };

        setIsPlaying(true);
    };

    const handleEnd = (): void => {
        if (playerRef.current) {
            playerRef.current.seekTo(0, 'seconds');
        };

        setIsPlaying(false);
    };

    const handleShowThumb = (): void => {
        setShowThumb(true);

        if (inactivityTimeout.current) {
            clearTimeout(inactivityTimeout.current);
        };

        inactivityTimeout.current = setTimeout(() => {
            setShowThumb(false);
        }, 2000);
    };

    useEffect(() => {
        mountTimeRef.current = Date.now();

        if(!mediaLink) {
            setIsError(true);
            setIsLoading(false);
        }

        return () => {
            if (mountTimeRef.current) clearTimeout(mountTimeRef.current);
        };
    }, []);

    return(
        <>
            <main className="video">
                <div className="player-box">
                    <div className="player">
                        <ReactPlayer
                            className="player__ctx"
                            url={mediaLink}
                            width="100%"
                            height="100%"
                            ref={playerRef}
                            controls={false}
                            playing={isPlaying}
                            onReady={handleReady}
                            onError={handleError}
                            onBuffer={handleBuffer}
                            onBufferEnd={handleBufferEnd}
                            onWaiting={handleWaiting}
                            onProgress={handleProgress}
                            onDuration={handleDuration}
                            onEnded={handleEnd}
                        />
                        <MediaContentBg
                            isFirstly={isFirstly}
                            isPlaying={isPlaying}
                            isLoading={isLoading}
                            isError={isError}
                            handlePlaying={handlePlaying}
                            handleSeekBy={handleSeekBy}
                        />
                    </div>
                </div>
            </main>
            <footer className="progress">
                <Slider
                    className={`media ${showThumb ? 'thumb-show' : ''}`}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    value={currentTime}
                    min={0}
                    max={duration}
                    step={0.1}
                    onChange={handleChangeProgress}
                    onChangeCommitted={handleSeek}
                    valueLabelFormat={(value) => formatTime(value)}
                    onMouseDown={handleShowThumb}
                    onTouchStart={handleShowThumb}
                    onMouseMove={handleShowThumb}
                    onTouchMove={handleShowThumb}
                />
                <div className="progress__time">
                    <span className="current">{formatTime(currentTime)}</span>
                    <span className="all">{formatTime(duration)}</span>
                </div>
            </footer>
        </>
    )
}

export default MediaContent;
