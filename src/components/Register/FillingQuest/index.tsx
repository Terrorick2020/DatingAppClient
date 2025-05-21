import { JSX, useEffect, useState } from 'react';
import { addRoute, initInterestsVariantsAsync } from '@/store/slices/settingsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setFQErrors } from '@/store/slices/settingsSlice';
import { EMPTY_INPUT_ERR_MSG } from '@/constant/settings';
import { RootDispatch } from '@/store';
import { ANIME_DURATION } from '@/constant/settings';
import { useNavigate, useLocation } from 'react-router-dom';
import { Slide } from 'react-awesome-reveal';
import { appRoutes } from '@/config/routes.config';
import { signUpProfileAsync } from '@/store/slices/profileSlice';
import { EAnimeDirection } from '@/types/settings.type';
import { type IState } from '@/types/store.types';

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
    const isLoad = useSelector((state: IState) => state.settings.load);
    const profileInfo = useSelector((state: IState) => state.profile.info);
    const fQErrors = useSelector((state: IState) => state.settings.fQErrors);
    
    const [regLoad, setRegLoad] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(
        () => {
            const langHtml = document.getElementById('filling-quest');
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            dispatch(initInterestsVariantsAsync());
        },
        []
    )

    const handleRoute = async (): Promise<void> => {
        const ePGlobRoute = appRoutes.eveningPlans.global;
        const ePPlansRoute = appRoutes.eveningPlans.inner.plans;
        const toEPPlans = `${ePGlobRoute}/${ePPlansRoute}`;

        if(!profileInfo.photos.length) {
            dispatch(setFQErrors({
                ...fQErrors,
                photErr: {
                    value: true,
                    msg: EMPTY_INPUT_ERR_MSG,
                }
            }))
        }

        if(!profileInfo.name) {
            dispatch(setFQErrors({
                ...fQErrors,
                nameErr: {
                    value: true,
                    msg: EMPTY_INPUT_ERR_MSG,
                }
            }))
        }

        if(!profileInfo.age) {
            dispatch(setFQErrors({
                ...fQErrors,
                ageErr: {
                    value: true,
                    msg: EMPTY_INPUT_ERR_MSG,
                }
            }))
        }

        if(!profileInfo.city) {
            dispatch(setFQErrors({
                ...fQErrors,
                cityErr: {
                    value: true,
                    msg: EMPTY_INPUT_ERR_MSG,
                }
            }))
        }

        if(!profileInfo.bio) {
            dispatch(setFQErrors({
                ...fQErrors,
                cityErr: {
                    value: true,
                    msg: EMPTY_INPUT_ERR_MSG,
                }
            }))
        }

        const hasErrors = Object.values(fQErrors).some(item => item.value);
        
        if(hasErrors) return;

        setRegLoad(true);
        await dispatch(signUpProfileAsync());
        setRegLoad(false);
        dispatch(addRoute(location.pathname));
        navigate(toEPPlans);
    }

    if(isLoad) return (
        <div className="loader">
            <MyLoader />
        </div>
    )

    return (
        <>
            <GeoConfirmation />
            <div className="filling-quest__header">
                <FillingQuestHeader />
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
                        {regLoad ? 'Регистрация...' : 'Продолжить'}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default FillingQuestContent;
