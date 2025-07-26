import {
    addRoute,
    initFillingQuestAsync,
    setLoad,
    setFQErrors,
    resetRoutes,
} from '@/store/slices/settingsSlice';

import {
    signUpProfileAsync,
    signUpPsychAsync,
    setInfo,
} from '@/store/slices/profileSlice';

import { JSX, useEffect, useRef, useState, } from 'react';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { toPlans, toChats } from '@/config/routes.config';
import { EMPTY_INPUT_ERR_MSG, ANIME_DURATION } from '@/constant/settings';
import { RootDispatch } from '@/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { fQBtnText } from '@/constant/register';
import { Slide } from 'react-awesome-reveal';
import { type FQBtnTextItem, type ValidationField, KeyFQBtnText } from '@/types/register.typs';
import { type FQErrorsItem, type FQErrorKeys, EAnimeDirection } from '@/types/settings.type';
import { type IState, EProfileRoles } from '@/types/store.types';

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

const selectRegisterFQ = createSelector(
    [selectSettings, selectProfile],
    (settings, profile) => ({
      isFirstly: settings.isFirstly,
      isLoad: settings.load,
      fQErrors: settings.fQErrors,
      profileInfo: profile.info,
    })
);

const FillingQuestContent = (): JSX.Element => {
    const { isFirstly, isLoad, fQErrors, profileInfo } = useSelector(selectRegisterFQ);
    
    const [regLoad, setRegLoad] = useState<boolean>(false);
    const [btnCtx, setBtnCtx] = useState<FQBtnTextItem>(fQBtnText[KeyFQBtnText.First]);
    const [isDis, setIsDis] = useState<boolean>(true);

    const infoCache = useRef<string>('');

    const isPsych = profileInfo.role === EProfileRoles.Psych;

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

        !isPsych && initFQCtx();

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
        setRegLoad(true);

        const errObj: Partial<Record<FQErrorKeys, FQErrorsItem>> = {};

        const keys: ValidationField[] = [
            {
                value: 'photos',
                key: 'photErr'
            },
            {
                value: 'name',
                key: 'nameErr'
            },
            {
                value: 'bio',
                key: 'bioErr'
            },
        ];

        const dopKeys: ValidationField[] = [
            {
                value: 'age',
                key: 'ageErr'
            },
            {
                value: 'town',
                key: 'cityErr'
            },
        ];

        if(!isPsych) keys.push( ...dopKeys );

        keys.forEach(item => {
            const value = profileInfo[item.value];

            if (!value || (Array.isArray(value) && value.length === 0)) {
                errObj[item.key] = {
                    value: true,
                    msg: EMPTY_INPUT_ERR_MSG,
                }
            }
        });

        const hasErrors = Object.values(errObj).some(item => item.value);
        
        if(hasErrors) {
            dispatch(setFQErrors({
                ...fQErrors,
                ...errObj,
            }))

            setRegLoad(false);

            return;
        };
        
        const response = await dispatch(
            isPsych
            ? signUpPsychAsync(btnCtx.mark)
            : signUpProfileAsync(btnCtx.mark)
        ).unwrap();
        
        if( response && response !== 'error') {
            infoCache.current = JSON.stringify(profileInfo);
            setIsDis(true);

            if( btnCtx.mark === KeyFQBtnText.First ) {

                if(!isPsych) {
                    dispatch(addRoute(location.pathname));
                    navigate(toPlans);
                } else {
                    dispatch(resetRoutes());
                    navigate(toChats);
                }
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
            { profileInfo.role !== EProfileRoles.Psych && <GeoConfirmation /> }
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
                        { !isPsych && <FillingQuestMySex /> }
                        { !isPsych && <FillingQuestAge /> }
                        <FillingQuestBio />
                        { !isPsych && <FillingQuestInterests /> }
                        { !isPsych && <FillingQuestSelectionSex /> }
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
