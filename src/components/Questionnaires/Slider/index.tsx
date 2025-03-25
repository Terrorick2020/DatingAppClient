import { useEffect } from 'react';

import SliderNav from './Nav';
import SliderPoster from './SliderPoster';


const SliderContent = () => {
    useEffect(
        () => {
            const langHtml = document.getElementById('slider');
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';
        },
        []
    )

    return (
        <>
            <nav className="slider__nav">
                <SliderNav />
            </nav>
            <div className="slider__poster">
                <SliderPoster />
            </div>
        </>
    )
}

export default SliderContent