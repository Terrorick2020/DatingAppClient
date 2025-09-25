import { JSX, useState, useRef, useEffect, WheelEvent } from 'react';
import { useSwipeable, SwipeEventData } from 'react-swipeable';
import { CARUSEL_ANIME_MS } from '@/constant/quest';
import { FQ_MEDIA_LINK } from '@/config/env.config';

import ShortsCtxCaruselItem from './Item';
import IconButton from '@mui/joy/IconButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const data = [
    'Slide 1',
    'Slide 2',
    'Slide 3',
    'Slide 4',
    'Slide 5',
    'Slide 6',
    'Slide 7',
    'Slide 8',
    'Slide 9',
    'Slide 10',
    'Slide 11',
    'Slide 12',
];

const ShortsCtxCarusel = (): JSX.Element => {
    const [isSwiped, setIsSwiped] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);

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
        setIsSwiped(true);
        setOffset(0);

        setTimeout(() => {
            setIsSwiped(false);
        }, CARUSEL_ANIME_MS + 5);

        if(
            isSwiped     ||
            newIndex < 0 ||
            newIndex >= data.length
        ) return;
        
        setIndex(newIndex);
    };

    const changeOffset = (deltaY: number): void => {
        if(isSwiped) {
            setOffset(0);
            return;
        };

        let newOffset: number;

        if(index === 0 && deltaY > 0) {
            newOffset = Math.min(deltaY, deltaSwipeY.current);
        } else if (index === data.length - 1 && deltaY < 0) {
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
            } else if (index === data.length - 1 && event.deltaY > 0) {
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
        const slideHTML = document.getElementById('shorts-carusel-slide');

        if(!slideHTML) return;

        deltaSwipeY.current = slideHTML.clientHeight / 4;
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
                            data.map((_, indx) => (
                                <div
                                    className="shorts-carusel-slide"
                                    id="shorts-carusel-slide"
                                    key={`shorts-carusel-slide-${ indx }`}
                                >
                                    <ShortsCtxCaruselItem
                                        indx={index}
                                        selfIndx={indx}
                                        item={{
                                            previewUrl: 'https://image.winudf.com/v2/image/bW9iaS5hbmRyb2FwcC5wcm9zcGVyaXR5YXBwcy5jNTExMV9zY3JlZW5fN18xNTI0MDQxMDUwXzAyMQ/screen-7.jpg?fakeurl=1&type=.jpg',
                                            videoUrl: FQ_MEDIA_LINK,
                                        }}
                                    />
                                </div>
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
                    disabled={isSwiped || index >= data.length - 1}
                    onClick={() => changeSlide(index + 1)}
                >
                    <ArrowDownwardIcon />
                </IconButton>
            </div>
        </>
    );
};

export default ShortsCtxCarusel;
