import { JSX, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initTargetUserAsync } from '@/store/slices/questionnairesSlice';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import DetailsSlider from './Slider';
import DetailsInfo from './Info';
import DetailsFixed from './Fixed';
import ComplaintDrawer from '@/components/Layouts/ComplaintDrawer';
import MyLoader from '@/components/UI/MyLoader';


const DetailsContent = (): JSX.Element => {
    const { id } = useParams();

    if(id === undefined) return (<></>);

    const isLoad = useSelector((state: IState) => state.settings.load);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            dispatch(initTargetUserAsync(id));
        },
        []
    )

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

    return (
        <>
            <div className="details__slider">
                <DetailsSlider />
            </div>
            <div className="details__info">
                <DetailsInfo />
            </div>
            <div className="details__fixed">
                <DetailsFixed id={id} />
            </div>
            <ComplaintDrawer id={id} />
        </>
    )
}

export default DetailsContent;
