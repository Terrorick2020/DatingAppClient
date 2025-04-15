import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch } from '@/store';
import { initSliderListAsync } from '@/store/slices/questionnairesSlice';
import type { IState } from '@/types/store.types';

import SliderPoster from './SliderPoster';
import MyLoader from '@/components/UI/MyLoader';


const SliderContent = () => {
    const isLoad = useSelector((state: IState) => state.settings.load);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            const sliderHtml = document.getElementById('slider');
            if ( sliderHtml ) sliderHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            dispatch(initSliderListAsync());
        },
        []
    )

    return (
        <>
            <div className="slider__poster">
                {
                    isLoad
                        ?
                        <div className='poster__loader'>
                            <MyLoader />
                        </div>
                        :
                        <SliderPoster />
                }
            </div>
        </>
    )
}

export default SliderContent
