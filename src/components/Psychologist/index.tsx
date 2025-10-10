import { JSX, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { URL_MARK } from '@/config/env.config';
import { createSelector } from 'reselect';
import { getPsycByIdhAsync } from '@/store/slices/psychSlice';
import { infoAlert, successAlert, warningAlert } from '@/funcs/alert.funcs';
import { toNotFoud } from '@/config/routes.config';
import { selectSelfPsychAsync } from '@/store/slices/profileSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import MyLoader from '@/components/UI/MyLoader';
import Button from '@mui/material/Button';
import PsychologistCtx from './Ctx';


const selectSettings = (state: IState) => state.settings;
const selectProfile = (state: IState) => state.profile;

const selectPsychContent  = createSelector(
    [selectSettings, selectProfile],
    (settings, profile) => ({
      isLoad: settings.load,
      selPsych: profile.selPsych
    })
);

const btnText = [
    [ 'Выбрать специалиста', 'Загрузка...' ],
    [ 'Специалист уже выбран Вами', '' ]
];

const PsychologistContent = (): JSX.Element => {
    const { isLoad, selPsych } = useSelector(selectPsychContent);

    const [isSelLoad, setIsSelLoad] = useState<boolean>(false);

    const params = useParams();
    const id = params[URL_MARK];

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();

    const goBack = async (): Promise<void> => {
        infoAlert(dispatch, 'Не удалось получить информацию о специолист');
        navigate(toNotFoud);
    };

    if(!id) {
        goBack();

        return (<></>);
    };

    const initPsych = async (): Promise<void> => {
        const response = await dispatch(getPsycByIdhAsync(id)).unwrap();

        if(!response || response === 'error') goBack();
    };

    useEffect(() => {
        const psychHtml = document.getElementById('target-psych');
        if ( psychHtml ) psychHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';

        initPsych();
    }, []);

    const selectSelfPsych = async (): Promise<void> => {
        setIsSelLoad(true);

        const response = await dispatch(selectSelfPsychAsync(id)).unwrap();

        if(!response || response === 'error') {
            warningAlert(
                dispatch,
                'Не удалось прикрепить выбранного специолиста к Вам! Попробуйте повторить запрос позже',
            );
        } else {
            successAlert(
                dispatch,
                'Специалист успешно прикреплён к Вам! Перейдите в раздел чатов, чтобы начать общение с ним',
            );
        };

        setIsSelLoad(false);
    };

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    );

    return (
        <>
            <div className="target-psych__ctx">
                <PsychologistCtx />
            </div>
            <div className="target-psych__btn">
                <Button
                    fullWidth
                    variant="contained"
                    loadingPosition="start"
                    loading={isSelLoad}
                    disabled={isSelLoad || id === selPsych}
                    onClick={selectSelfPsych}
                >
                    { btnText[+(id === selPsych)][+isSelLoad] }
                </Button>
            </div>       
        </>
    )
}

export default PsychologistContent;
