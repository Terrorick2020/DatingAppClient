import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

import DetailsSlide from './Slide'

import PngLeady from '@/assets/img/leady.png'
import PngWoman from '@/assets/img/woman.png'


const items = [
    { img: PngWoman, name: "Виктория, 20", location: "Санкт-Петербург" },
    { img: PngLeady, name: "Александра, 22", location: "Москва" },
    { img: PngWoman, name: "Екатерина, 25", location: "Казань" },
]

const DetailsSlider = () => {
    const [index, setIndex] = useState(0)
    const [fade, setFade] = useState(true)

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

    const toLeftScroll = () => changeSlide((index - 1 + items.length) % items.length);
    const toRightScroll = () => changeSlide((index + 1) % items.length);

    return (
        <>
            <div {...handlers} className="container">
                <div
                    className="slide"
                    style={{
                        backgroundImage: `url(${items[index].img})`,
                        opacity: fade ? 1 : 0,
                    }}
                >
                    <DetailsSlide
                        toLeftScroll={toLeftScroll}
                        toRightScroll={toRightScroll}
                        len={items.length}
                        index={index}
                        content={null}
                    />
                </div>
            </div>
        </>
    )
}

export default DetailsSlider;
