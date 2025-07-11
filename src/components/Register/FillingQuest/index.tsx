import {
    addRoute,
    initFillingQuestAsync,
    setLoad,
    setFQErrors,
} from '@/store/slices/settingsSlice';

import { JSX, useEffect, useRef, useState } from 'react';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { toPlans } from '@/config/routes.config';
import { EMPTY_INPUT_ERR_MSG, ANIME_DURATION } from '@/constant/settings';
import { RootDispatch } from '@/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { fQBtnText } from '@/constant/register';
import { Slide } from 'react-awesome-reveal';
import { signUpProfileAsync, setInfo } from '@/store/slices/profileSlice';
import { type FQBtnTextItem, KeyFQBtnText } from '@/types/register.typs';
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


const selectSettings = (state: IState) => state.settings;
const selectProfile = (state: IState) => state.profile;

const selectComplListState = createSelector(
    [selectSettings, selectProfile],
    (settings, profile) => ({
      isFirstly: settings.isFirstly,
      isLoad: settings.load,
      fQErrors: settings.fQErrors,
      profileInfo: profile.info,
    })
);

const FillingQuestContent = (): JSX.Element => {
    const { isFirstly, isLoad, fQErrors, profileInfo } = useSelector(selectComplListState);
    
    const [regLoad, setRegLoad] = useState<boolean>(false);
    const [btnCtx, setBtnCtx] = useState<FQBtnTextItem>(fQBtnText[KeyFQBtnText.First]);
    const [isDis, setIsDis] = useState<boolean>(true);

    const infoCache = useRef<string>('');

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const initFQCtx = async (): Promise<void> => {
        dispatch(setLoad(true));

        await dispatch(initFillingQuestAsync());

        dispatch(setLoad(false));
    };

    useEffect(() => {
        const langHtml = document.getElementById('filling-quest');
        if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

        const logoHeader = document.getElementById('logo-header');
        if( logoHeader ) logoHeader.style.display = 'flex';

        initFQCtx();

        infoCache.current = JSON.stringify(profileInfo);

        return () => {
            dispatch(setInfo(JSON.parse(infoCache.current)));
        }
    }, [] );

    useEffect(() => {
        if(isFirstly) return;

        setBtnCtx(fQBtnText[KeyFQBtnText.Other]);
    }, [isFirstly]);

    useEffect(() => {
        setIsDis(infoCache.current === JSON.stringify(profileInfo));
    }, [profileInfo]);

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
        
        if( response && response !== 'error') {
            infoCache.current = JSON.stringify(profileInfo);
            setIsDis(true);

            if( btnCtx.mark === KeyFQBtnText.First ) {
                dispatch(addRoute(location.pathname));
                navigate(toPlans);
            };
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
                <div className="link">
                    <Button
                        fullWidth
                        variant="contained"
                        loadingPosition="start"
                        loading={regLoad}
                        disabled={isDis}
                        onClick={handleRoute}
                    >
                        {regLoad ? btnCtx.loadText : btnCtx.text}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default FillingQuestContent;
