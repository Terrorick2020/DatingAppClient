import { JSX, useCallback, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import type { IState } from '@/types/store.types';

import DetailsSlide from './Slide'


const selectQuest = (state: IState) => state.questionnaires;

const selectPhotos = createSelector(
    [selectQuest],
    (questionnaires) => questionnaires.targetUser?.photos ?? []
);

const DetailsSlider = (): JSX.Element => {
    const photos = useSelector(selectPhotos);

    const [index, setIndex] = useState<number>(0);
    const [fade, setFade] = useState<boolean>(true);

    const changeSlide = useCallback((newIndex: number): void => {
        setFade(false);
        setTimeout(() => {
            setIndex(newIndex)
            setFade(true)
        }, 200);
    }, []);

    const handlers = useSwipeable({
        onSwipedLeft: () => toRightScroll(),
        onSwipedRight: () => toLeftScroll(),
        trackMouse: true,
    });

    const toLeftScroll = useCallback((): void => {
        changeSlide((index - 1 + photos.length) % photos.length);
    }, [index, photos.length, changeSlide]);

    const toRightScroll = useCallback((): void => {
        changeSlide((index + 1) % photos.length);
    }, [index, photos.length, changeSlide]);

    if(!photos.length) return (<></>)

    return (
        <div {...handlers} className="container">
            <div
                className="slide"
                style={{
                    backgroundImage: `url(${photos[index]})`,
                    opacity: fade ? 1 : 0,
                }}
            >
                <DetailsSlide
                    toLeftScroll={toLeftScroll}
                    toRightScroll={toRightScroll}
                    len={photos.length}
                    index={index}
                />
            </div>
        </div>
    )
}

export default DetailsSlider;
