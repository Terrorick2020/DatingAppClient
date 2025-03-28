import { useEffect } from 'react';

import SliderPoster from './SliderPoster';


const SliderContent = () => {
    useEffect(
        () => {
            const sliderHtml = document.getElementById('slider');
            if ( sliderHtml ) sliderHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';
        },
        []
    )

    return (
        <>
            <div className="slider__poster">
                <SliderPoster />
            </div>
        </>
    )
}

export default SliderContent
