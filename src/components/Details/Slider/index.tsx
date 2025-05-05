import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useSelector } from 'react-redux';
import type { IState } from '@/types/store.types';

import DetailsSlide from './Slide'


const DetailsSlider = () => {
    const photos = useSelector((state: IState) => state.questionnaires.targetUser?.photos);

    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const changeSlide = (newIndex: number) => {
        setFade(false)
        setTimeout(() => {
            setIndex(newIndex)
            setFade(true)
        }, 200)
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => toRightScroll(),
        onSwipedRight: () => toLeftScroll(),
        trackMouse: true,
    })

    if(typeof photos === 'undefined') return null;

    const toLeftScroll = () => changeSlide((index - 1 + photos.length) % photos.length);
    const toRightScroll = () => changeSlide((index + 1) % photos.length);

    return (
        <>
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
        </>
    )
}

export default DetailsSlider;
