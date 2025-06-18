import { JSX, useEffect, useState } from 'react';
import { addRoute, initFillingQuestAsync } from '@/store/slices/settingsSlice';
import { type FQBtnTextItem, KeyFQBtnText } from '@/types/register.typs';
import { setLoad } from '@/store/slices/settingsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toPlans } from '@/config/routes.config';
import { setFQErrors } from '@/store/slices/settingsSlice';
import { EMPTY_INPUT_ERR_MSG } from '@/constant/settings';
import { RootDispatch } from '@/store';
import { ANIME_DURATION } from '@/constant/settings';
import { useNavigate, useLocation } from 'react-router-dom';
import { fQBtnText } from '@/constant/register';
import { Slide } from 'react-awesome-reveal';
import { signUpProfileAsync, getSelfProfile } from '@/store/slices/profileSlice';
import { type FQErrorsItem, EAnimeDirection } from '@/types/settings.type';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import MyLoader from '@/components/UI/MyLoader';
import GeoConfirmation from './GeoConfirmation';
import FillingQuestHeader from './Header';
import FillingQuestPhotos from './Photos';
import FillingQuestInputs from './Inputs';
import FillingQuestMySex from './MySex';
import FillingQuestAge from './Age';
import FillingQuestBio from './Bio';
import FillingQuestInterests from './Interests';
import FillingQuestSelectionSex from './SelectionSex';


const FillingQuestContent = (): JSX.Element => {
    const [isFirstly, isLoad] = useSelector((state: IState) => [
        state.settings.isFirstly,
        state.settings.load
    ]);
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const fQErrors = useSelector((state: IState) => state.settings.fQErrors);
    
    const [regLoad, setRegLoad] = useState<boolean>(false);
    const [btnCtx, setBtnCtx] = useState<FQBtnTextItem>(fQBtnText[KeyFQBtnText.First]);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const initFQCtx = async (): Promise<void> => {
        dispatch(setLoad(true));

        if(!isFirstly) {
            const profRes = await dispatch(getSelfProfile()).unwrap();

            if(profRes && profRes !== 'error') {
                setBtnCtx(fQBtnText[KeyFQBtnText.Other]);
            }
        }

        await dispatch(initFillingQuestAsync());

        dispatch(setLoad(false));
    }

    useEffect(
        () => {
            const langHtml = document.getElementById('filling-quest');
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            initFQCtx();
        },
        []
    );

    const handleRoute = async (): Promise<void> => {
        const errObj: { [key: string]: FQErrorsItem } = {};

        if(!profileInfo.photos.length) {
            errObj['photErr'] = {
                value: true,
                msg: EMPTY_INPUT_ERR_MSG,
            }
        }

        if(!profileInfo.name) {
            errObj['nameErr'] = {
                value: true,
                msg: EMPTY_INPUT_ERR_MSG,
            }
        }

        if(!profileInfo.age) {
            errObj['ageErr'] = {
                value: true,
                msg: EMPTY_INPUT_ERR_MSG,
            }
        }

        if(!profileInfo.town) {
            errObj['cityErr'] = {
                value: true,
                msg: EMPTY_INPUT_ERR_MSG,
            }
        }

        if(!profileInfo.bio) {
            errObj['bioErr'] = {
                value: true,
                msg: EMPTY_INPUT_ERR_MSG,
            }

            dispatch(setFQErrors({
                ...fQErrors,
                bioErr: {
                    value: true,
                    msg: EMPTY_INPUT_ERR_MSG,
                }
            }))
        }

        const hasErrors = Object.values(errObj).some(item => item.value);
        
        if(hasErrors) {
            dispatch(setFQErrors({
                ...fQErrors,
                ...errObj,
            }))

            return;
        };

        setRegLoad(true);
        
        const response = await dispatch(signUpProfileAsync(btnCtx.mark)).unwrap();
        
        if(
            response &&
            response !== 'error' &&
            btnCtx.mark === KeyFQBtnText.First
        ) {
            dispatch(addRoute(location.pathname));
            navigate(toPlans);
        };

        setRegLoad(false);
    };

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

    return (
        <>
            <GeoConfirmation />
            <div className="filling-quest__header">
                <FillingQuestHeader mark={btnCtx.mark} />
            </div>
            <div className="filling-quest__ctx">
                <div className="widgets">
                    <Slide
                        triggerOnce
                        direction={EAnimeDirection.Left}
                        duration={ANIME_DURATION}
                    >
                        <FillingQuestPhotos />
                        <FillingQuestInputs />
                        <FillingQuestMySex />
                        <FillingQuestAge />
                        <FillingQuestBio />
                        <FillingQuestInterests />
                        <FillingQuestSelectionSex />
                    </Slide>
                </div>
                <div className="link" onClick={handleRoute}>
                    <Button
                        fullWidth
                        variant="contained"
                        loadingPosition="start"
                        loading={regLoad}
                    >
                        {regLoad ? btnCtx.loadText : btnCtx.text}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default FillingQuestContent;
