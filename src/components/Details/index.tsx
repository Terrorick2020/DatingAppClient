import { JSX, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toSlider } from '@/config/routes.config';
import { dellRoute } from '@/store/slices/settingsSlice';
import { initTargetUserAsync } from '@/store/slices/questionnairesSlice';
import { infoAlert } from '@/funcs/alert.funcs';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import DetailsSlider from './Slider';
import DetailsInfo from './Info';
import DetailsFixed from './Fixed';
import ComplaintDrawer from '@/components/Layouts/ComplaintDrawer';
import MyLoader from '@/components/UI/MyLoader';


const DetailsContent = (): JSX.Element => {
    const { id } = useParams();

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();

    const goBack = (): void => {
        infoAlert(
            dispatch,
            'Не удалось получить информацию о пользователе',
        );

        navigate(toSlider);
        dispatch(dellRoute());
    };

    if(id === undefined) {
        goBack();

        return (<></>);
    }

    const isLoad = useSelector((state: IState) => state.settings.load);

    const initTargetUser = async (): Promise<void> => {
        const response = await dispatch(initTargetUserAsync(id)).unwrap();

        if(!response || response === 'error') goBack();
    };

    useEffect(() => {
        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';

        initTargetUser();
    }, []);

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
