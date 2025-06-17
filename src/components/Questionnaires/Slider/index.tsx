import { JSX, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch } from '@/store';
import { initialArgs } from '@/constant/quest';
import { initSliderListAsync } from '@/store/slices/questionnairesSlice';
import type { IState } from '@/types/store.types';

import SliderPoster from './SliderPoster';
import MyLoader from '@/components/UI/MyLoader';


const SliderContent = (): JSX.Element => {
    const isLoad = useSelector((state: IState) => state.settings.load);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            const sliderHtml = document.getElementById('slider');
            if ( sliderHtml ) sliderHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            dispatch(initSliderListAsync(initialArgs));
        },
        []
    )

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

    return (
        <div className="slider__poster">
            <SliderPoster />
        </div>
    )
}

export default SliderContent
