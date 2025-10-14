import { type JSX, useState, useRef, useEffect, WheelEvent } from 'react';
import { useSwipeable, SwipeEventData } from 'react-swipeable';
import { useSelector } from 'react-redux';
import { EShortsCaruselKey } from '@/types/quest.types';
import type { IState } from '@/types/store.types';

import ShortsCtxCaruselItem from './Item';
import IconButton from '@mui/joy/IconButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const CARUSEL_ANIME_MS: number = 500;

const ShortsCtxCarusel = (): JSX.Element => {
    const shortsList = useSelector((state: IState) => state.videos.shortsList);

    const [isSwiped, setIsSwiped] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [keyCode, setKeyCode] = useState<EShortsCaruselKey | null>(null);

    const deltaSwipeY = useRef<number>(100);
    const deltaWheelY = useRef<number>(2);
    const isWheeled = useRef<boolean>(false);

    const animeVoidWheel = (newOffset: number): void => {
        setIsSwiped(true);
        setOffset(newOffset);

        setTimeout(() => {
            setOffset(0);
            
            setTimeout(() => {
                setIsSwiped(false);
            }, CARUSEL_ANIME_MS + 5);

        }, CARUSEL_ANIME_MS + 5);
    };

    const changeSlide = (newIndex: number): void => {
        setOffset(0);

        if(
            isSwiped     ||
            newIndex < 0 ||
            newIndex >= shortsList.videos.length
        ) return;

        setIsSwiped(true);
        setIndex(newIndex);
        
        setTimeout(() => {
            setIsSwiped(false);
        }, CARUSEL_ANIME_MS + 5);
    };

    const changeOffset = (deltaY: number): void => {
        if(isSwiped) {
            setOffset(0);
            return;
        };

        let newOffset: number;

        if(index === 0 && deltaY > 0) {
            newOffset = Math.min(deltaY, deltaSwipeY.current);
        } else if (index === shortsList.videos.length - 1 && deltaY < 0) {
            newOffset = Math.max(deltaY, -deltaSwipeY.current);
        } else {
            newOffset = deltaY;
        };
        
        setOffset(newOffset);
    };

    const handleWheel = (event: WheelEvent): void => {
        if(!isSwiped && !isWheeled.current) {
            if(index === 0 && event.deltaY < 0) {
                animeVoidWheel(deltaSwipeY.current);
            } else if (index === shortsList.videos.length - 1 && event.deltaY > 0) {
                animeVoidWheel(-deltaSwipeY.current);
            } else {

                if(Math.abs(event.deltaY) < deltaWheelY.current) return;

                changeSlide(index + Math.sign(event.deltaY));
            };
            
            isWheeled.current = true;

            setTimeout(() => {
                isWheeled.current = false;
            }, CARUSEL_ANIME_MS * 3);
        };
    };

    const handlers = useSwipeable({
        onSwipedUp: (eventData: SwipeEventData) => {
            let newIndex: number;

            newIndex = eventData.absY < deltaSwipeY.current
                ? index
                : index + 1;

            changeSlide(newIndex);
        },
        onSwipedDown: (eventData: SwipeEventData) => {
            let newIndex: number;

            newIndex = eventData.absY < deltaSwipeY.current
                ? index
                : index - 1;

            changeSlide(newIndex);
        },
        onSwipedLeft: (eventData: SwipeEventData) => {
            let newIndex: number;

            newIndex = eventData.absY < deltaSwipeY.current
                ? index
                : index - 1 * Math.sign(eventData.deltaY);

            changeSlide(newIndex);
        },
        onSwipedRight: (eventData: SwipeEventData) => {
            let newIndex: number;

            newIndex = eventData.absY < deltaSwipeY.current
                ? index
                : index - 1 * Math.sign(eventData.deltaY);

            changeSlide(newIndex);
        },
        onSwiping: (eventData: SwipeEventData) => {
            changeOffset(eventData.deltaY);
        },
        trackMouse: true,
        trackTouch: true,
        delta: 10,
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if((Object.values(EShortsCaruselKey) as string[]).includes(e.code)) {
                setKeyCode(e.code as EShortsCaruselKey);
            };

            if(isSwiped) return;

            let goSwipe: boolean = false;

            if (e.key === "ArrowUp") {
                if(index === 0) return;
                setIndex(prev => prev - 1);
                goSwipe = true;
            };

            if (e.key === "ArrowDown") {
                if(index >= shortsList.videos.length - 1) return;
                setIndex(prev => prev + 1);
                goSwipe = true;
            };

            if(goSwipe) {
                setIsSwiped(true);

                setTimeout(() => {
                    setIsSwiped(false);
                }, CARUSEL_ANIME_MS + 5);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [index, isSwiped]);

    useEffect(() => {
        const slideHTML = document.getElementById('shorts-carusel-slide');

        if(slideHTML) deltaSwipeY.current = slideHTML.clientHeight / 4;
    }, []);

    return (
        <>
            <div
                {...handlers}
                className="shorts-carusel"
                onWheel={handleWheel}
            >
                <div className="shorts-carusel__box">
                    <div
                        className="shorts-carusel-poster"
                        style={{
                            transform: `translateY(
                                calc(${ index } * (
                                        -100% + var(--shorts-shadow-h) * 2
                                    ) + ${offset}px
                                )
                            )`,
                            transition: isSwiped ? `transform ${CARUSEL_ANIME_MS}ms  ease` : 'none',
                        }}
                    >
                        {
                            shortsList.videos.map((item, indx) => (
                                <ShortsCtxCaruselItem
                                    key={`shorts-carusel-slide-${indx}`}
                                    indx={index}
                                    selfIndx={indx}
                                    item={item}
                                    keyCode={keyCode}
                                    setKeyKode={setKeyCode}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="shorts-desctop-btns">
                <IconButton
                    disabled={isSwiped || index <= 0}
                    onClick={() => changeSlide(index - 1)}
                >
                    <ArrowUpwardIcon />
                </IconButton>
                <IconButton
                    disabled={isSwiped || index >= shortsList.videos.length - 1}
                    onClick={() => changeSlide(index + 1)}
                >
                    <ArrowDownwardIcon />
                </IconButton>
            </div>
        </>
    );
};

export default ShortsCtxCarusel;
